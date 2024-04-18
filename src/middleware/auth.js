import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { ErrorGenerator } from "../generator/errorGenerator.js";
import { modals } from "../models/index.js";

export const auth = async (req, res, next) => {
  try {
    let token = req?.headers?.["x-token"];
    if (!token) throw new ErrorGenerator(500, "Session invalid or expire");
    else {
      let data = jwt.verify(token, config.SECRET_KEY);
      const user = await modals.User.findById(data?.id);
      if (!user) throw new ErrorGenerator(500, "Session invalid or expire");
      req.me = user;
      next();
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};
