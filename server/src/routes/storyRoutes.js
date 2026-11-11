import { Router } from "express";
import { createStory, getStories , getStoryById, updateStory ,deleteStory } from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/",getStories)
router.get("/:id",getStoryById)
router.post("/",protect, createStory)
router.patch("/:id",protect,updateStory)
router.delete("/:id",protect,deleteStory)

export default router
