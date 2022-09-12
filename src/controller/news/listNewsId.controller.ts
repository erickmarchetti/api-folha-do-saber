import { Request, Response } from "express"
import listNewsIdService from "../../service/news/listNewsId.service"

const listNewsIdController = async (req: Request, res: Response) => {
    const id = req.params.id

    const news = await listNewsIdService(id)

    return res.status(200).json(news)
}

export default listNewsIdController
