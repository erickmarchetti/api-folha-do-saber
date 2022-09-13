import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { IUserPatchRequest } from "../../interfaces/users"
import updateUserService from "../../service/users/updateUser.service"

const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password, isAdm, isWriter }: IUserPatchRequest =
        req.body
    const { id } = req.params

    const updateUser = await updateUserService(
        { id, name, email, password, isAdm, isWriter },
        req.user
    )

    return res.status(200).json(instanceToPlain(updateUser))
}
export default updateUserController
