import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { signToken, cookieOptions } from "../utils/token.js"

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
        const user = await User.create({ name, email, passwordHash });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email is already registered" })
        }
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        }).select("+passwordHash");

        const valid = user && (await bcrypt.compare(password, user.passwordHash))

        if(!valid){
            return res.status(401).json({
                message : "Invalid email or password",
            });
        }

        res.cookie("token",signToken(user._id),cookieOptions);

        res.json({
            id: user._id,
            name:user.name,
            email:user.email
        })

    } catch (error) {

    }
}
