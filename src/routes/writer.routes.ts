import { Router } from "express"
import listWritersController from "../controller/listWriters.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"

const writerRouter = Router()

writerRouter.get(
    "",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    listWritersController
)

export default writerRouter
