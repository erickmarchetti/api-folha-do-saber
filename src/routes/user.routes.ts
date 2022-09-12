import { Router } from "express"
import userDeleteController from "../controller/users/deleteUserId.controller"
import createUserController from "../controller/users/createUser.controller"
import listUserIdController from "../controller/users/listUserId.controller"
import nameEmailPasswordIsRequiredMiddleware from "../middlewares/nameEmailPasswordIsRequired.middleware"
import verifyEmailAvailabilityMiddleware from "../middlewares/verifyEmailAvailability.middleware"
import updateUserController from "../controller/users/updateUser.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import authTokenAdmMiddleware from "../middlewares/authTokenIsAdm.middleware"
import userReallyExistsMiddleware from "../middlewares/userReallyExists.middleware"
import userIsHimselfMiddleware from "../middlewares/userIsHimself.middleware"

const userRouter = Router()

userRouter.post(
    "",
    nameEmailPasswordIsRequiredMiddleware,
    verifyEmailAvailabilityMiddleware,
    createUserController
)

userRouter.get("", listUserIdController)

userRouter.delete("", userDeleteController)

userRouter.patch(
    "/:id",
    authTokenMiddleware,
    userReallyExistsMiddleware,
    userIsHimselfMiddleware,
    verifyEmailAvailabilityMiddleware,
    updateUserController
)

userRouter.delete(
    "/:id",
    authTokenMiddleware,
    authTokenAdmMiddleware,
    userDeleteController
)

export default userRouter
