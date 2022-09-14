import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listWritersService from "../../services/writers/listWriters.service"

const listWritersController = async (req: Request, res: Response) => {
    const writersList = await listWritersService()
    return res.status(200).json(instanceToPlain(writersList))
}
export default listWritersController
