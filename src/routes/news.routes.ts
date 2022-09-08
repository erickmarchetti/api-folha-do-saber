import { Router } from "express"
import createNewsController from "../controller/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriter.middleware"

const newsRouter = Router()

newsRouter.post(
    "",
    authTokenMiddleware,
    authTokenWriterOrAdmMiddleware,
    createNewsController
)

export default newsRouter
