import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import createNewsService from "../../services/news/createNews.service"

const createNewsController = async (req: Request, res: Response) => {
    const { title, subtitle, urlImage, category, body, createdAt } = req.body
    const userId = req.user.userId

    const newNews = await createNewsService(userId, {
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
