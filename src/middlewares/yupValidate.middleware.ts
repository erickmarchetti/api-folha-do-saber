import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
import { AppError } from "../errors/appError"

const yupValidateMiddleware =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            await schema.validate(data, { abortEarly: false })

            next()
        } catch (err: any) {
            console.log(err.errors)

            throw new AppError(400, err.errors.join("; "))
        }
    }

export default yupValidateMiddleware
