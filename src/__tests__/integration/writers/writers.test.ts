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
import { IWriter, ResponseLogin } from "../../../interfaces/users"

let adminLoginResponse: ResponseLogin
let userWriterLoginResp: ResponseLogin
let userLoginResponse: ResponseLogin
let mockedWriterResponse: IWriter

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
        await request(app).post("/users").send({
            email: "tonho@gmail.com",
            name: "Tonho",
            password: "1234"
        })
        adminLoginResponse = await request(app)
            .post("/login")
            .send(mockedAdmLogin)
        userWriterLoginResp = await request(app)
            .post("/login")
            .send(mockedUserLogin)
        userLoginResponse = await request(app).post("/login").send({
            email: "tonho@gmail.com",
            password: "1234"
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /writer - Admin must be able to create a Writer", async () => {
        mockedWriter.userId = userWriterLoginResp.body.id
        const response = await request(app)
            .post("/writer")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedWriter)

        mockedWriterResponse = response.body

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("profileImage")
        expect(response.body).toHaveProperty("bio")
        expect(response.body).toHaveProperty("user")
        expect(response.body.user.isWriter).toBe(true)
        expect(response.status).toBe(201)
    })

    test("POST /writer - Must not be able to create a writer that already exists", async () => {
        mockedWriter.userId = userWriterLoginResp.body.id
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
            .set("Authorization", `Bearer ${userWriterLoginResp.body.token}`)

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
            .set("Authorization", `Bearer ${userWriterLoginResp.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /writer/:id - Admin must be able to change writer data", async () => {
        const response = await request(app)
            .patch(`/writer/${mockedWriterResponse.id}`)
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send({ bio: "Amo escrever testes - Admin" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
    })

    test("PATCH /writer/:id - Writer himself must be able to change data", async () => {
        const response = await request(app)
            .patch(`/writer/${mockedWriterResponse.id}`)
            .set("Authorization", `Bearer ${userWriterLoginResp.body.token}`)
            .send({ bio: "Amo escrever testes - Escritor" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
    })

    test("PATCH /writer/:id - Must not be able to change writer data without a valid token", async () => {
        const response = await request(app)
            .patch(`/writer/${mockedWriterResponse.id}`)
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send({ bio: "Amo escrever testes - Usuário" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /writer/:id - Must not be able to change writer data without a token", async () => {
        const response = await request(app)
            .patch(`/writer/${mockedWriterResponse.id}`)
            .send({ bio: "Amo escrever testes - Usuário" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /writer/:id - Must not be able to change writer data without a valid id", async () => {
        const response = await request(app)
            .patch(`/writer/25698547-5cds-423b-8a8d-5c23b35846kp`)
            .set("Authorization", `Bearer ${userWriterLoginResp.body.token}`)
            .send({ bio: "Amo escrever testes - id invalido" })

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })
})
