import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import {
    mockedAdm,
    mockedAdmLogin,
    mockedUser,
    mockedUserLogin
} from "../../mocks"
import { ResponseLogin } from "../../../interfaces/users"

let loginAdm: ResponseLogin
let loginUser: ResponseLogin
let loginWriter: ResponseLogin

let changeName = {
    name: "teste"
}
let changeIsAdm = {
    isAdm: true
}

describe("", () => {
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
    })

    test("GET /users - without authorization", async () => {
        loginUser = await request(app).post("/login").send(mockedUserLogin)

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${loginUser.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id - must be able to change user", async () => {
        const response = await request(app)
            .patch(`/users/${loginUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send(changeName)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("isWriter")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual(changeName.name)
        expect(response.body.email).toEqual(mockedUser.email)
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.isWriter).toEqual(false)

        expect(response.status).toBe(200)
    })

    test("PATCH /users/:id - must be able to change user", async () => {
        const response = await request(app)
            .patch(`/users/${loginUser.body.id}`)
            .set("Authorization", `Bearer ${loginUser.body.token}`)
            .send(changeIsAdm)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})
