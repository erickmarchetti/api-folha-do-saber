import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listNewsByCategoryService from "../../service/news/listNewsByCategory.service"

const listNewsByCategoryController = async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const newsList = await listNewsByCategoryService(categoryId)
    return res.status(200).json(instanceToPlain(newsList))
}

export default listNewsByCategoryController
