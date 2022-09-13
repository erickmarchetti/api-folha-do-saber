import { Router } from "express"

import userDeleteController from "../controllers/users/deleteUserId.controller"
import createUserController from "../controllers/users/createUser.controller"
import listUserIdController from "../controllers/users/listUserId.controller"
import verifyEmailAvailabilityMiddleware from "../middlewares/verifyEmailAvailability.middleware"
import updateUserController from "../controllers/users/updateUser.controller"
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
