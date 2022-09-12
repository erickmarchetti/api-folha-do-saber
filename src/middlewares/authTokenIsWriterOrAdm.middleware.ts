import { Request, Response, NextFunction } from "express"

const authTokenWriterOrAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isWriter && !req.user.isAdm) {
        return res
            .status(401)
            .json({ message: "User is not a writer neither an administrator" })
    }
    next()
}
export default authTokenWriterOrAdmMiddleware
