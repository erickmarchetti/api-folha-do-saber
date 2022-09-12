import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import createNewsService from "../../service/news/createNews.service"

const createNewsController = async (req: Request, res: Response) => {
    const { title, subtitle, urlImage, category, body, createdAt, writerId } =
        req.body
    const newNews = await createNewsService(writerId, {
        title,
        subtitle,
        urlImage,
        category,
        body,
        createdAt
    })
    return res.status(201).json(instanceToPlain(newNews))
}
export default createNewsController
