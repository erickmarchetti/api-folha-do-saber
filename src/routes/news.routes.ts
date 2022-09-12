import { Router } from "express"

import listNewsByCategoryController from "../controller/listNewsByCategory.controller"
import createNewsController from "../controller/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriterOrAdm.middleware"
import listAllNewsController from "../controller/listAllNews.controller"
import listNewsIdController from "../controller/listNewsId.controller"
import listNewsByWriterController from "../controller/listNewsByWriter.controller"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"
import newsBelongsToTheUserMiddleware from "../middlewares/newsBelongsToTheUser.middleware"
import deleteNewsIdController from "../controller/deleteNewsId.controller"
import writerIsHimselfMiddleware from "../middlewares/writerIsHimself.middleware"
import updateNewsController from "../controller/updateNews.controller"

const newsRouter = Router()
newsRouter.get("/:id/categories", listNewsByCategoryController)
newsRouter.get("", listAllNewsController)
newsRouter.get("/:id", listNewsIdController)
newsRouter.get("/:id/writers", listNewsByWriterController)
newsRouter.delete(
    "/:id",
    authTokenAdmMiddleware,
    newsBelongsToTheUserMiddleware,
    deleteNewsIdController
)

newsRouter.post(
    "",
    authTokenMiddleware,
    authTokenWriterOrAdmMiddleware,
    createNewsController
)

newsRouter.patch(
    "/:id",
    authTokenWriterOrAdmMiddleware,
    writerIsHimselfMiddleware,
    updateNewsController
)

export default newsRouter
