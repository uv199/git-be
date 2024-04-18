import express from "express";
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./handler/errorHandler.js";
import { signin } from "./controller/user.js";

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

app.use(errorHandler);

export default app;
