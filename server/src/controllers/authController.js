import bcrypt from "bcryptjs"
import User from "../models/User.js"
import User from "../models/User.js"

export async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name , email and password are required" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters" })
        }
        const passwordHash = await bcrypt.hash(password, 12)
        const user = await User.create({name,email,passwordHash});

        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email
        })
    } catch (err) {
        if(err.code===11000){
            return res.status(409).json({message:"Email is already registered"})
        }
        if(err.name === "ValidationError"){
            return res.status(400).json({message:err.message});
        }
        console.error(err);
        res.status(500).json({message : "Server error"})
    }
}