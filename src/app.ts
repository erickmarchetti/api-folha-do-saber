import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import appRoutes from "./routes/index.routes"

const app = express()
app.use(express.json())
appRoutes(app)

app.use(errorMiddleware)

export default app