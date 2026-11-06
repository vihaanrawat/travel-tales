import { Router } from "express";
import { createStory, getStories , getStoryById } from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/",getStories)
router.get("/:id",getStoryById)
router.post("/",protect, createStory)

export default router
