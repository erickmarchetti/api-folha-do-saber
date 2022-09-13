import { Router } from "express"

import listWritersController from "../controller/writers/listWriters.controller"
import createWriterController from "../controller/writers/createWriter.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"
import updateWriterController from "../controller/writers/updateWriter.controller"
import writerIsHimselfMiddleware from "../middlewares/writerIsHimself.middleware"
import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createWriterSchema } from "../schemas/createWriter.schema"

const writerRouter = Router()

writerRouter.get(
    "",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    listWritersController
)
writerRouter.post(
    "",
    yupValidateMiddleware(createWriterSchema),
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
