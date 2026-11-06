import mongoose from "mongoose";
import Story from "../models/Story.js"

const AUTHOR_FIELDS = "name avatarUrl"

function handleError(err,res){
    if(err.name==="ValidationError"){
        return res.status()
    }
}