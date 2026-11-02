import jwt from "jsonwebtoken";
const isProd = process.env.NODE_ENV==="production"

export const cookieOptions = {
    httpOnly : true,
    secure: isProd,
    sameSite : isProd ? "none": "lax",
    maxAge : 7*24*60*60*1000, //7 days in ms
}

export function signToken(userId){
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }

    );
}