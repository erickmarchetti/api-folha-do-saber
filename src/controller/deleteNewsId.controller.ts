import { Request, Response } from "express"
import deleteNewsIdService from "../service/deleteNewsId.service"

const deleteNewsIdController = async (request: Request, response: Response) => {
    const id = request.params.id
    const deleteNew = await deleteNewsIdService(id)
    return response.status(204).json({ message: deleteNew })
}
export default deleteNewsIdController
