import { Request, Response, NextFunction } from "express"

const authTokenAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isAdm) {
        return res.status(403).json({ message: "User is not administrator " })
    }
    next()
}
export default authTokenAdmMiddleware
