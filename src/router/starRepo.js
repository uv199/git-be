import express from "express";
import { getStarRepoByUser, starHandler } from "../controller/star.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/starhandle", auth, starHandler);

router.get("/getAll", auth, getStarRepoByUser);

export default router;
