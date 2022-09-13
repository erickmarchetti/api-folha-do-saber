import { Router } from "express"

import userLoginController from "../controllers/login/userLogin.controller"
import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { postLoginSchema } from "../schemas/postLogin.schema"

const loginRouter = Router()

loginRouter.post(
    "",
    yupValidateMiddleware(postLoginSchema),
    userLoginController
)

export default loginRouter
