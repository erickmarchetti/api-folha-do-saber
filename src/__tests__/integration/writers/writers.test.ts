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

let adminLoginResponse: ResponseLogin
let userLoginResponse: ResponseLogin

describe("Tests Writers Routes", () => {
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
        await request(app).post("/users").send(mockedUser)
        adminLoginResponse = await request(app)
            .post("/login")
            .send(mockedAdmLogin)
        userLoginResponse = await request(app)
            .post("/login")
            .send(mockedUserLogin)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /writer - Admin must be able to create a Writer", async () => {
        mockedWriter.userId = userLoginResponse.body.id
        const response = await request(app)
            .post("/writer")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedWriter)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("profileImage")
        expect(response.body).toHaveProperty("bio")
        expect(response.body).toHaveProperty("user")
        expect(response.body.user.isWriter).toBe(true)
        expect(response.status).toBe(201)
    })

    test("POST /writer - Must not be able to create a writer that already exists", async () => {
        mockedWriter.userId = userLoginResponse.body.id
        const response = await request(app)
            .post("/writer")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedWriter)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /writer - Must not be able to create writer without valid token", async () => {
        const response = await request(app)
            .post("/writer")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /writer - Admin must be able list all writers", async () => {
        const response = await request(app)
            .get("/writer")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("map")
        expect(response.status).toBe(200)
    })

    test("GET /writer - Must be not able list all writers if not admin", async () => {
        const response = await request(app)
            .get("/writer")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})
