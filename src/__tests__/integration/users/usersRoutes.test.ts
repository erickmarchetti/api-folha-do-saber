import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedUser } from "../../mocks"

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
})
