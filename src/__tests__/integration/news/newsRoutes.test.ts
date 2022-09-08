import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedAdmLogin } from "../../mocks"

const mockedUser = {}
const mockedWriter = {}
const mockedAdmin = {}
const mockedUserLogin = {}
const mockedWriterLogin = {}
const mockedNews = {}

describe("Tests news routes", () => {
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
        await request(app).post("/users").send(mockedWriter)
        await request(app).post("/users").send(mockedAdmin)

        const adminLoginResponse = await request(app)
            .post("/login")
            .send(mockedAdmLogin)

        const writerLoginResponse = await request(app)
            .post("/login")
            .send(mockedWriterLogin)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /news  -  Admin must be able to create a new", async () => {
        const adminLoginResponse = await request(app)
            .post("/login")
            .send(mockedAdmLogin)

        const response = await request(app)
            .post("/news")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedNews)

        expect(response.body).toHaveProperty("writer")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("subtitle")
        expect(response.body).toHaveProperty("body")
        expect(response.body).toHaveProperty("urlImage")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.status).toBe(201)
    })

    test("POST /news  -  Writer must be able to create a new", async () => {
        const writerLoginResponse = await request(app)
            .post("/login")
            .send(mockedWriterLogin)
        const response = await request(app)
            .post("/news")
            .set("Authorization", `Bearer ${writerLoginResponse.body.token}`)
            .send(mockedNews)

        expect(response.body).toHaveProperty("writer")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("subtitle")
        expect(response.body).toHaveProperty("body")
        expect(response.body).toHaveProperty("urlImage")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.status).toBe(201)
    })

    test("POST /news -  Must not be able to create a new without valid token", async () => {
        const userLoginResponse = await request(app)
            .post("/login")
            .send(mockedUserLogin)
        const response = await request(app)
            .post("/news")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(mockedNews)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /news  -  Must be able to return all news", async () => {
        const response = await request(app).get("/news")
        expect(response.body).toHaveProperty("map") //verificar jeito melhor
        expect(response.status).toBe(200)
    })

    test("GET - /news:id  -  Must be able to return new by id", async () => {
        const news = await request(app).get("/news")
        const response = await request(app).get(`/news/${news.body[0].id}`)

        expect(response.body).toHaveProperty("writer")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("subtitle")
        expect(response.body).toHaveProperty("body")
        expect(response.body).toHaveProperty("urlImage")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.status).toBe(200)
    })

    test("GET /news:id - Must not be able to list new without a valid id", async () => {
        const response = await request(app).get(
            "/news/25698547-5cds-423b-8a8d-5c23b35846kp"
        )

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /news/:categoryId/categories - Must be able list all news of selected category", async () => {
        const news = await request(app).get("/news")
        const response = await request(app).get(
            `/news/${news.body[0].category.id}/categories`
        )

        expect(response.body).toHaveProperty("map") //verificar jeito melhor
        expect(response.status).toBe(200)
    })

    test("GET /news/:categoryId/categories - Must not be able list all news without valid category", async () => {
        const response = await request(app).get(
            `/news/25698547-5cds-423b-8a8d-5c23b35846kp/categories`
        )

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /news/:writerId/writers - Must be able list all news of selected writer", async () => {
        const news = await request(app).get("/news")
        const response = await request(app).get(
            `/news/${news.body[0].writer.id}/writers`
        )

        expect(response.body).toHaveProperty("map") //verificar jeito melhor
        expect(response.status).toBe(200)
    })

    test("GET /news/:writerId/writers - Must not be able list all news without valid writer", async () => {
        const response = await request(app).get(
            `/news/25698547-5cds-423b-8a8d-5c23b35846kp/writers`
        )

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
})
