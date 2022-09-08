import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedUser, mockedUserLogin } from "../../mocks"

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

        await request(app).post("/users").send(mockedUser)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /login - user must be able to login", async () => {
        const response = await request(app).post("/login").send(mockedUserLogin)

        expect(response.body).toHaveProperty("token")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(200)
    })

    test("POST /login - must not log in if the email or password is wrong", async () => {
        const response = await request(app).post("/login").send({
            email: "erick@mail.com",
            password: "4321"
        })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })
})
