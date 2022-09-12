import { Request, Response, NextFunction } from "express"

const verifyIsRedatorMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isWriter) {
        return res.status(401).json({ message: "User is not redator " })
    }
    next()
}
export default verifyIsRedatorMiddleware
