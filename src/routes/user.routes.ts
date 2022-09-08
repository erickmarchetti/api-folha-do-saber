import { Router } from "express"
import userDeleteController from "../controller/deleteUserId.controller"
import listUserIdController from "../controller/listUserId.controller"

const userRouter = Router()

userRouter.get("", listUserIdController)
userRouter.delete("", userDeleteController)
export default userRouter
