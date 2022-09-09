import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const authTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Token not found !" })
    }

    const splitToken = token.split(" ")

<<<<<<< HEAD
    console.log(splitToken[1])

=======
>>>>>>> 474723fa57e1bf3c41f65712a673d1c6e8764a3d
    jwt.verify(
        splitToken[1],
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
<<<<<<< HEAD
=======
                console.log(error)
>>>>>>> 474723fa57e1bf3c41f65712a673d1c6e8764a3d
                return res.status(401).json({ message: "Invalid token !" })
            }
            req.user = {
                isAdm: decoded.isAdm,
                userId: decoded.userId,
                isWriter: decoded.isWriter
            }
            next()
        }
    )
}
export default authTokenMiddleware
