import { Express } from "express"
import newsRouter from "./news.routes"
import userRouter from "./user.routes"

const appRoutes = (app: Express) => {
    app.use("/users", userRouter)
    app.use("/news", newsRouter)
}

export default appRoutes
