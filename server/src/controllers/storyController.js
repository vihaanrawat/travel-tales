import mongoose from "mongoose";
import Story from "../models/Story.js"

const AUTHOR_FIELDS = "name avatarUrl"

function handleError(err, res) {
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message })
    }
    console.error(err);
    return res.status(500).json({ message: "Server Error" })
}

export async function createStory(req, res) {
    try {
        const { title, destination, country, content, travelStartDate, travelEndDate, tags, status } = req.body;

        const story = await Story.create({
            author:req.user._id,
            title,
            destination,
            country,
            content,
            travelStartDate,
            travelEndDate,
            tags: Array.isArray(tags) ? tags : [],
            status,
        })
        res.status(201).json(story)
    } catch (err) {
        handleError(err,res)
    }

}

export async function getStories(req,res) {
    try {
        const stories = await Story.find({status:"published"}).sort({createdAt:-1}).limit(20).populate("author",AUTHOR_FIELDS)

        res.json(stories)
    } catch (err) {
        handleError(err,res)
        
    }
}

export async function getStoryById(req,res) {
    try {
        const {id} = req.params
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:"Story not found"})
        }
        const story = await Story.findOne({_id:id, status:"published"}).populate("author",AUTHOR_FIELDS)

        if(!story){
            res.status(404).json({message:"Story not found"})
        }
        res.json(story)
    } catch (err) {
        handleError(err,res)
    }    
}

const UPDATABLE = [
    "title", "destination", "country", "content",
    "travelStartDate" , "travelEndDate", "tags", "status",
]

//returns the story if it exists and belongs to the logged in user
//otherwise send the error response itself and return null


