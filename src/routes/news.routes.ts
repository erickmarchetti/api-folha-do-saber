import { Router } from "express"
import createNewsController from "../controller/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterMiddleware from "../middlewares/authTokenIsWriter.middleware"

const newsRouter = Router()

newsRouter.post(
    "",
    authTokenMiddleware,
    authTokenWriterMiddleware,
    createNewsController
)

export default newsRouter
