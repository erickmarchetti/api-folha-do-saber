import { Router } from "express"
import userLoginController from "../controller/login/userLogin.controller"

const loginRouter = Router()

loginRouter.post("", userLoginController)

export default loginRouter
