import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true , "Name is required"],
            trim:true,
            maxlength: [50, "Name must be 50 characters or fewer"],
        },
        email
    }
)