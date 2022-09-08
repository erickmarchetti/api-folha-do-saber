import { Router } from "express"
import userLoginController from "../controller/userLogin.controller"

const loginRouter = Router()

loginRouter.get("", userLoginController)

export default loginRouter
