import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function protect(req,res,next) {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Not authenticated"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
    } catch (err) {
        
    }
    
}