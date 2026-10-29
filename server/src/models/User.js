import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true , "Name is required"],
            trim:true,
            maxlength: [50, "Name must be 50 characters or fewer"],
        },
        email:{
            type:String,
            required : [true, "Email is required"],
            unique: true,
            lowercase:true,
            trim:true,
        },
        passwordHash:{
            type:String,
            required:true,
            select:false,
        },
        avatarUrl:{
            type:String,
            default:"",
        },
        bio:{
            type:String,
            maxlength:300,
            default:"",
        },
    },
    {timestamps:true}
)