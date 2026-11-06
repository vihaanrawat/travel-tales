import mongoose from "mongoose";
import Story from "../models/Story.js"

const AUTHOR_FIELDS = "name avatarUrl"

function handleError(err,res){
    if(err.name==="ValidationError"){
        return res.status(400).json({message:err.message})
    }
    console.error(err);
    return res.status(500).json({message:"Server Error"})
}

export async function createStory(req,res) {
    
    
}