import { Router } from "express"

import listNewsByCategoryController from "../controller/news/listNewsByCategory.controller"
import createNewsController from "../controller/news/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriterOrAdm.middleware"
import listAllNewsController from "../controller/news/listAllNews.controller"
import listNewsIdController from "../controller/news/listNewsId.controller"
import listNewsByWriterController from "../controller/news/listNewsByWriter.controller"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"
import newsBelongsToTheUserMiddleware from "../middlewares/newsBelongsToTheUser.middleware"
import deleteNewsIdController from "../controller/news/deleteNewsId.controller"
import writerIsHimselfMiddleware from "../middlewares/writerIsHimself.middleware"
import updateNewsController from "../controller/news/updateNews.controller"
import verifyIsRedatorMiddleware from "../middlewares/verifyIsRedator.middleware"
import newsReallyExistsMiddleware from "../middlewares/newsReallyExists.middleware"

const newsRouter = Router()
newsRouter.get("/:categoryName/categories", listNewsByCategoryController)
newsRouter.get("", listAllNewsController)
newsRouter.get("/:id", listNewsIdController)
newsRouter.get("/:writerId/writers", listNewsByWriterController)
newsRouter.delete(
    "/:id",
    authTokenMiddleware,
    newsReallyExistsMiddleware,
    newsBelongsToTheUserMiddleware,
    deleteNewsIdController
)

newsRouter.post(
    "",
    authTokenMiddleware,
    verifyIsRedatorMiddleware,
    createNewsController
)

newsRouter.patch(
    "/:id",
    authTokenMiddleware,
    verifyIsRedatorMiddleware,
    newsReallyExistsMiddleware,
    newsBelongsToTheUserMiddleware,
    updateNewsController
)

export default newsRouter
