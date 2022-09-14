import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import {
    mockedAdm,
    mockedAdmLogin,
    mockedUser,
    mockedUserLogin,
    mockedWriter
} from "../../mocks"
import { ResponseLogin } from "../../../interfaces/users"

let loginAdm: ResponseLogin
let loginUser: ResponseLogin
let loginWriter: ResponseLogin

describe("Tests Users routes", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((resp) => {
                connection = resp
            })
            .catch((error) => {
                console.error("Error during Data Source initializatio", error)
            })

        await request(app).post("/users").send(mockedAdm)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /users - Must be able to create a user", async () => {
        const response = await request(app).post("/users").send(mockedUser)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("isWriter")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual(mockedUser.name)
        expect(response.body.email).toEqual(mockedUser.email)
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.isWriter).toEqual(false)
        expect(response.status).toBe(201)
    })

    test("POST /users - Must not create user with the same email", async () => {
        const response = await request(app).post("/users").send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /users - must list users", async () => {
        loginAdm = await request(app).post("/login").send(mockedAdmLogin)

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        expect(response.body).toHaveLength(2)
        expect(response.body[0]).not.toHaveProperty("password")
        expect(response.status).toBe(200)
    })

    test("GET /users - should return with the writer's token", async () => {
        const newUser = await request(app).post("/users").send({
            name: "newUser",
            email: "newUser@gmail.com",
            password: "1234Aa!"
        })
        mockedWriter.userId = newUser.body.id
        await request(app)
            .post("/writers")
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send(mockedWriter)
        loginWriter = await request(app)
            .post("/login")
            .send({ email: "newUser@gmail.com", password: "1234Aa!" })

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${loginWriter.body.token}`)

        expect(response.body).toHaveLength(3)
        expect(response.body[0]).not.toHaveProperty("password")
        expect(response.status).toBe(200)
    })

    test("GET /users - should not list without admin token", async () => {
        loginUser = await request(app).post("/login").send(mockedUserLogin)

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${loginUser.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /users - without token", async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - must be able to change user", async () => {
        const response = await request(app)
            .patch(`/users/${loginUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send({ name: "another name" })

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("isWriter")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("another name")
        expect(response.body.email).toEqual(mockedUser.email)
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.isWriter).toEqual(false)

        expect(response.status).toBe(200)
    })

    test("PATCH /users/:id - should be able to create another admin", async () => {
        const targetUser = await request(app).post("/users").send({
            name: "targetUser",
            email: "targetUser@gmail.com",
            password: "1234Aa!"
        })

        const response = await request(app)
            .patch(`/users/${targetUser.body.id}`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send({ isAdm: true })

        expect(response.body.isAdm).toEqual(true)
        expect(response.body.isWriter).toEqual(false)

        expect(response.status).toBe(200)
    })

    test("PATCH /users/:id - must be able to re-enable a writer", async () => {
        const futureWriter = await request(app).post("/users").send({
            name: "targetWriter",
            email: "targetWriter@gmail.com",
            password: "1234Aa!"
        })

        await request(app)
            .post("/writers")
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send({
                bio: "uma bio",
                profileImage: "uma url",
                userId: futureWriter.body.id
            })

        const disableWriter = await request(app)
            .patch(`/users/${futureWriter.body.id}`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send({ isWriter: false })

        const response = await request(app)
            .patch(`/users/${futureWriter.body.id}`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send({ isWriter: true })

        expect(disableWriter.body.isWriter).toEqual(false)
        expect(response.body.isWriter).toEqual(true)
        expect(response.status).toBe(200)
    })

    test("PATCH /users/:id - without token", async () => {
        const response = await request(app).patch(`/users/${loginUser.body.id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - should not be able to create an admin without authorization", async () => {
        const response = await request(app)
            .patch(`/users/${loginUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send({ isAdm: true })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - id does not exist", async () => {
        const response = await request(app)
            .patch(`/users/3c38b344-2fd9-11ed-a261-0242ac120002`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send({ name: "name" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("PATCH /users/:id - cannot change another user without authorization", async () => {
        const targetUser = await request(app).post("/users").send({
            name: "targetUser2",
            email: "targetUser2@gmail.com",
            password: "1234Aa!"
        })

        const response = await request(app)
            .patch(`/users/${targetUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send({ name: "name" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - must not be able to create a fake writer", async () => {
        const targetUser = await request(app).post("/users").send({
            name: "targetUser3",
            email: "targetUser3@gmail.com",
            password: "1234Aa!"
        })

        const response = await request(app)
            .patch(`/users/${targetUser.body.id}`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)
            .send({ isWriter: true })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - user should not be able to change isWriter", async () => {
        const response = await request(app)
            .patch(`/users/${loginUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send({ isWriter: false })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /users/:id - must be able to delete a user", async () => {
        await request(app).post("/users").send({
            name: "deleted user",
            email: "deletedUser@gmail.com",
            password: "1234Aa!"
        })

        const loginDeletedUser = await request(app).post("/login").send({
            email: "deletedUser@gmail.com",
            password: "1234Aa!"
        })

        const listUsers = await request(app)
            .get(`/users`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        const response = await request(app)
            .delete(`/users/${loginDeletedUser.body.id}`)
            .set("Authorization", `Bearer ${loginDeletedUser.body.token}`)

        const listUsersTwo = await request(app)
            .get(`/users`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        expect(listUsers.body).toHaveLength(8)
        expect(response.status).toBe(204)
        expect(listUsersTwo.body).toHaveLength(7)
    })

    test("DELETE /users/:id - must be able to delete a user being an admin", async () => {
        await request(app).post("/users").send({
            name: "deleted user",
            email: "deletedUser@gmail.com",
            password: "1234Aa!"
        })

        const loginDeletedUser = await request(app).post("/login").send({
            email: "deletedUser@gmail.com",
            password: "1234Aa!"
        })

        const listUsers = await request(app)
            .get(`/users`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        const response = await request(app)
            .delete(`/users/${loginDeletedUser.body.id}`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        const listUsersTwo = await request(app)
            .get(`/users`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        expect(listUsers.body).toHaveLength(8)
        expect(response.status).toBe(204)
        expect(listUsersTwo.body).toHaveLength(7)
    })

    test("DELETE /users/:id - cannot delete another user without authorization", async () => {
        const deletedUser = await request(app).post("/users").send({
            name: "deleted user",
            email: "deletedUser@gmail.com",
            password: "1234Aa!"
        })

        const response = await request(app)
            .delete(`/users/${deletedUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /users/:id - without token", async () => {
        const response = await request(app).delete(
            `/users/${loginUser.body.id}`
        )

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /users/:id - id does not exist", async () => {
        const response = await request(app)
            .delete(`/users/0af9d870-30a2-11ed-a261-0242ac120002`)
            .set("Authorization", `Bearer ${loginAdm.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })
})
