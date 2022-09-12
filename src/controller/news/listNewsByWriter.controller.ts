import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listNewsByWriterService from "../../service/news/listNewsByWriter.service"

const listNewsByWriterController = async (req: Request, res: Response) => {
    const { writerId } = req.params

    const newsList = await listNewsByWriterService(writerId)
    return res.status(200).json(instanceToPlain(newsList))
}

export default listNewsByWriterController
