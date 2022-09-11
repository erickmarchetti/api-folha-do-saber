import { Request, Response } from "express"
import updateUserService from "../../service/users/updateUser.service"

const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password, isAdm, isWriter } = req.body
    const { id } = req.params

    const updateUser = await updateUserService(
        id,
        name,
        email,
        password,
        isAdm,
        isWriter
    )

    return res.status(200).json({ message: "User updated" })
}
export default updateUserController
