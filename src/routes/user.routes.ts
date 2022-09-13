import { Router } from "express"

import userDeleteController from "../controller/users/deleteUserId.controller"
import createUserController from "../controller/users/createUser.controller"
import listUserIdController from "../controller/users/listUserId.controller"
import nameEmailPasswordIsRequiredMiddleware from "../middlewares/nameEmailPasswordIsRequired.middleware"
import verifyEmailAvailabilityMiddleware from "../middlewares/verifyEmailAvailability.middleware"
import updateUserController from "../controller/users/updateUser.controller"
import authTokenMiddleware from "../middlewares/authToken.middleware"
import userReallyExistsMiddleware from "../middlewares/userReallyExists.middleware"
import userIsHimselfMiddleware from "../middlewares/userIsHimself.middleware"
import authTokenWriterOrAdmMiddleware from "../middlewares/authTokenIsWriterOrAdm.middleware"
import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createUserSchema } from "../schemas/createUser.schema"

const userRouter = Router()

userRouter.post(
    "",
    yupValidateMiddleware(createUserSchema),
    verifyEmailAvailabilityMiddleware,
    createUserController
)

userRouter.get(
    "",
    authTokenMiddleware,
    authTokenWriterOrAdmMiddleware,
    listUserIdController
)

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
    userIsHimselfMiddleware,
    userDeleteController
)

export default userRouter
