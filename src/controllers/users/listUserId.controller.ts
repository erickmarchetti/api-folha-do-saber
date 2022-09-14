import { Request, Response } from "express"
import listUserIdService from "../../services/users/listUserId.service"

import { instanceToPlain } from "class-transformer"

const listUserIdController = async (req: Request, res: Response) => {
    const userList = await listUserIdService()
    return res.status(200).json(instanceToPlain(userList))
}
export default listUserIdController
