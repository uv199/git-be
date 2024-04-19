import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./handler/errorHandler.js";
import userRouter from "./router/user.js";
import gitRouter from "./router/git.js";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "https://exquisite-starlight-41e74c.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use("/", (req, res) => {
  res.send("Server is live");
});

app.use("/user", userRouter);
app.use("/git", gitRouter);

app.use(errorHandler);

export default app;
