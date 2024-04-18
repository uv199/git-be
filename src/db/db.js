import mongoose from "mongoose";
import { config } from "../config.js";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const dbConnect = () => {
  return mongoose.connect(config.DB_URL,clientOptions);
};
