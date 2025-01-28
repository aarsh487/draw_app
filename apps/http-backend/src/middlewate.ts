import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] ?? "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded){
            res.json({ success: false, message: "Unauthorized user" });
            return;
        }
        if(typeof(decoded) == 'string'){
            return;
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        console.log("Error in decoding token", error)
        return;
    }
}