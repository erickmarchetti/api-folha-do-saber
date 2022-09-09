import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listAllNewsService from "../service/listAllNews.service"

const listAllNewsController = async (req: Request, res: Response) => {
    const listAllNews = await listAllNewsService()
    return res.status(200).json(instanceToPlain(listAllNews))
}
export default listAllNewsController
