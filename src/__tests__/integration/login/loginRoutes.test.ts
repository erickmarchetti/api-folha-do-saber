import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"

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

    test("", async () => {})
})
