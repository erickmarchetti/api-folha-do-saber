import { Router } from "express"
import createWriterController from "../controller/createWriter.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"

const writerRouter = Router()

writerRouter.post(
    "",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    createWriterController
)

export default writerRouter
