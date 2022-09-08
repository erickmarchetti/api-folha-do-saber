import { Router } from "express"

import listNewsByCategoryController from "../controller/listNewsByCategory.controller"
import createNewsController from "../controller/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriterOrAdm.middleware"
import listAllNewsController from "../controller/listAllNews.controller"
import listNewsIdController from "../controller/listNewsId.controller"

const newsRouter = Router()
newsRouter.get("/:id/categories", listNewsByCategoryController)
newsRouter.get("", listAllNewsController)
newsRouter.get("/:id", listNewsIdController)

newsRouter.post(
    "",
    authTokenMiddleware,
    authTokenWriterOrAdmMiddleware,
    createNewsController
)

export default newsRouter
