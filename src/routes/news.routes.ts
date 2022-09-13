import { Router } from "express"

import listNewsByCategoryController from "../controllers/news/listNewsByCategory.controller"
import createNewsController from "../controllers/news/createNews.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import listAllNewsController from "../controllers/news/listAllNews.controller"
import listNewsIdController from "../controllers/news/listNewsId.controller"
import listNewsByWriterController from "../controllers/news/listNewsByWriter.controller"
import newsBelongsToTheUserMiddleware from "../middlewares/newsBelongsToTheUser.middleware"
import deleteNewsIdController from "../controllers/news/deleteNewsId.controller"
import updateNewsController from "../controllers/news/updateNews.controller"
import verifyIsRedatorMiddleware from "../middlewares/verifyIsRedator.middleware"
import newsReallyExistsMiddleware from "../middlewares/newsReallyExists.middleware"
import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createNewsSchema } from "../schemas/createNews.schema"

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
    yupValidateMiddleware(createNewsSchema),
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
