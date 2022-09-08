import { Router } from "express"
import listUserIdController from "../controller/listUserId.controller"

const userRouter = Router()

userRouter.get("", listUserIdController)

export default userRouter
