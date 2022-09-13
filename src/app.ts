import "reflect-metadata"
import "express-async-errors"
import express, { Request, Response } from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import appRoutes from "./routes/index.routes"

const app = express()
app.use(express.json())
appRoutes(app)

app.use("/", (req: Request, res: Response) => {
    return res.send(
        "To access the documentation of our api click <a href='https://github.com/Folha-do-Saber/api-folha-do-saber/blob/developer/README.md' target='_blank'>HERE</a>"
    )
})

app.use(errorMiddleware)

export default app
