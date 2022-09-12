import { Router } from "express"
import userLoginController from "../controller/login/userLogin.controller"
import verifyBodyLoginMiddleware from "../middlewares/verifyBodyLogin.middleware"

const loginRouter = Router()

loginRouter.post("", verifyBodyLoginMiddleware, userLoginController)

export default loginRouter
