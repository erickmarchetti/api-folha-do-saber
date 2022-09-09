import { Router } from "express"
import listWritersController from "../controller/listWriters.controller"
import createWriterController from "../controller/createWriter.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"
import updateWriterController from "../controller/updateWriter.controller"
import writerIsHimselfMiddleware from "../middlewares/writerIsHimself.middleware"

const writerRouter = Router()

writerRouter.get(
    "",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    listWritersController
)
writerRouter.post(
    "",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    createWriterController
)
writerRouter.patch(
    "/:id",
    authTokenMiddleware,
    writerIsHimselfMiddleware,
    updateWriterController
)

export default writerRouter
