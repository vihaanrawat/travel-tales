import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function protect(req,res,next) {
    try {
        const token = req.cookies.token
    } catch (err) {
        
    }
    
}