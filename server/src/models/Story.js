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
            
        }
    }
)