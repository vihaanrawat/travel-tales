import mongoose, { mongo } from "mongoose";
const storySchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title:{
            type:String,
            required:[true,"Title is required"],
            trim: true,
            maxlength: [true, "Title must be 120 characters or fewer"],
        },
        destination:{
            type:String,
            required:[true,"Destination is required"]
        }
    }
)