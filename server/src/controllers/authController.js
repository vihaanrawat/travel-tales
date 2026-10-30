import bcrypt from "bcryptjs"
import User from "../models/User.js"

export async function register(req,res) {
    try {
        const {name , email , password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Name , email and password are required"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Password must be atleast 8 characters"})
        }
        const passwordHash = await bcrypt.hash(password,12);
        
    } catch (error) {
        
    }
}