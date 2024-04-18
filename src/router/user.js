import express from "express";
import { logout, signin, signup } from "../controller/user.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", signin);

router.post("/logout",auth, logout);

export default router;
