import { Express } from "express"
import newsRouter from "./news.routes"
import loginRouter from "./login.routes"
import userRouter from "./user.routes"
import writerRouter from "./writers.routes"

const appRoutes = (app: Express) => {
    app.use("/users", userRouter)
    app.use("/news", newsRouter)
    app.use("/writers", writerRouter)
    app.use("/news", newsRouter)
    app.use("/login", loginRouter)
}

export default appRoutes
