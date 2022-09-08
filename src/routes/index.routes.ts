import { Express } from "express"
import userRouter from "./user.routes"

const appRoutes = (app: Express) => {
    app.use("/users", userRouter)
}

export default appRoutes
