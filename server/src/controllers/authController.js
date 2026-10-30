import bcrypt from "bcryptjs"
import User from "../models/User.js"

export async function register(req,res) {
    try {
        const {name , email , password} = req.body
    } catch (error) {
        
    }
}