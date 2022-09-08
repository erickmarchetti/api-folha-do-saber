import { Request, Response, NextFunction } from "express"

const authTokenWriterMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isWriter) {
        return res.status(403).json({ message: "User is not a writer " })
    }
    next()
}
export default authTokenWriterMiddleware
