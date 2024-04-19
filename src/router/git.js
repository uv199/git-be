import express from "express";
import {
  getSearchListRepository,
  getStaredRepoApi,
  getUserRepository,
  starRepository,
} from "../controller/git.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/get-user/:userName", getUserRepository);

router.get("/search-user", getSearchListRepository);

router.post("/star", auth, starRepository);

router.get("/get-star", getStaredRepoApi);

export default router;
