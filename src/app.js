import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./handler/errorHandler.js";
import userRouter from "./router/user.js";
import gitRouter from "./router/git.js";
import starRouter from "./router/starRepo.js";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/git", gitRouter);
app.use("/star", starRouter);

app.use(errorHandler);

export default app;
