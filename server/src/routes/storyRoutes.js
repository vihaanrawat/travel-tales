import { Router } from "express";
import { createStory, getStories , getStoryById } from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";


