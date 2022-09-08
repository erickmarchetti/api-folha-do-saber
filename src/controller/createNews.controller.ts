import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import createNewsService from "../service/createNews.service"

const createNewsController = async (req: Request, res: Response) => {
    const { title, subtitle, urlImage, categoryId, body, createdAt, writerId } =
        req.body
    const newNews = await createNewsService(writerId, {
        title,
        subtitle,
        urlImage,
        categoryId,
        body,
        createdAt
    })
    return res.status(200).json(instanceToPlain(newNews))
}
export default createNewsController
