import { Router } from "express"
import userLoginController from "../controller/userLogin.controller"

const loginRouter = Router()

loginRouter.post("", userLoginController)

export default loginRouter
