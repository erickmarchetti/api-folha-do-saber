import { Request, Response } from "express"
import updateUserService from "../service/updateUser.service"

const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const updateUser = await updateUserService(name, email, password)

    return res.status(201).json({ message: updateUser })
}
export default updateUserController
