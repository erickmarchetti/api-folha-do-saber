import { Router } from "express"
import userDeleteController from "../controller/deleteUserId.controller"
import createUserController from "../controller/createUser.controller"
import listUserIdController from "../controller/listUserId.controller"
import nameEmailPasswordIsRequiredMiddleware from "../middlewares/nameEmailPasswordIsRequired.middleware"
import verifyEmailAvailabilityMiddleware from "../middlewares/verifyEmailAvailability.middleware"

const userRouter = Router()

userRouter.post(
    "",
    nameEmailPasswordIsRequiredMiddleware,
    verifyEmailAvailabilityMiddleware,
    createUserController
)
userRouter.get("", listUserIdController)
userRouter.delete("", userDeleteController)
export default userRouter
