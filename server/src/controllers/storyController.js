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

const SORTS = {
    newest: {createdAt:-1, _id: -1},
    oldest: {createdAt:1, _id:1},
}

const asString = (v) => (typeof v ==="string" ? v.trim() : "")
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")

export async function getStories(req,res) {
    try {
        const page = Math.max(parseInt(req.query.page,10) || 1,1)
        const limit = Math.min(Math.max(parseInt(req.query.limit,10) || 10,1),50)
        
        const filter=  {status:"published"}
        
        const search = asString(req.query.search)
        if(search){
            const rx = new RegExp(escapeRegex(search), "i"); //i means case insensitive
            filter.$or = [
                {title:rx},
                {destination:rx}
            ];
        }
        const destination = asString(req.query.destination);
        if(destination){
            filter.destination = new RegExp(`${escapeRegex(destination)}$`,"i");
        }
        const tag = asString(req.query.tag).toLowerCase();
        if(tag) filter.tags = tag;

        const sortKey = asString(req.query.sort);
        const sort = Object.hasOwn(SORTS,sortKey) ? SORTS[sortKey] : SORTS.newest;
    } catch (error) {
        
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

async function findOwnedStory(req,res) {
    const {id} = req.params
    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"Story not found"});
        return null;
    }
    const story = await Story.findById(id)
    if(!story){
        res.status(404).json({message:"Story not found"});
        return null;
    }
    
    if(!story.author.equals(req.user._id)){
        res.status(403).json({message:"You can only modify your own stories"});
        return null;
    }
    return story;
}

export async function updateStory(req,res) {
    try {
        const story = await findOwnedStory(req,res)
        if(!story) return;

        for(const key of UPDATABLE){
            if(req.body[key]!==undefined) story[key] = req.body[key];
        }

        if(story.travelStartDate && story.travelEndDate && story.travelEndDate < story.travelStartDate){
            return res.status(400).json({message:"End date cannot be before start date"})
        }
        await story.save()
        res.json(story)
    } catch (err) {
        handleError(err,res);
    }
}

export async function deleteStory(req,res) {
    try {
        const story = await findOwnedStory(req,res)
        if(!story) return;

        await story.deleteOne()
        res.json({message:"Story deleted"})
    } catch (err) {
        handleError(err,res)
    }
}



