import { Express } from "express"
import userRouter from "./user.routes"
import writerRouter from "./writer.routes"

const appRoutes = (app: Express) => {
    app.use("/users", userRouter)
    app.use("/writer", writerRouter)
}

export default appRoutes
