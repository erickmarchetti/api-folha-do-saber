import { Router } from "express"

import listNewsByCategoryController from "../controller/listNewsByCategory.controller"
import createNewsController from "../controller/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriterOrAdm.middleware"

const newsRouter = Router()
newsRouter.get("/:id/categories", listNewsByCategoryController)

newsRouter.post(
    "",
    authTokenMiddleware,
    authTokenWriterOrAdmMiddleware,
    createNewsController
)

export default newsRouter
