import { Request, Response } from "express"
import listUserIdService from "../service/listUserId.service"
import { AppError, handleError } from "../errors/appError"
import { instanceToPlain } from "class-transformer"

const listUserIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const categoryList = await listUserIdService(id)
        return res.status(200).json(instanceToPlain(categoryList))
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res)
        }
    }
}
export default listUserIdController
