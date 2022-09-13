import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
import { AppError } from "../errors/appError"

const yupValidateMiddleware =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            await schema.validate(data)

            next()
        } catch (err) {
            if (err instanceof Error) {
                throw new AppError(400, err.message)
            }
        }
    }

export default yupValidateMiddleware
