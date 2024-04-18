import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { modals } from "../model";
import { ErrorGenerator } from "../generator/errorGenerator.js";

export const auth = async (req, res, next) => {
  try {
    let token = req?.cookies?.accessToken;
    if (!token) throw new ErrorGenerator("Session invalid or expire");
    else {
      let data = jwt.verify(token, config.SECRET_KEY);
      const user = await modals.User.findById(data?.id);
      if (!user) throw new ErrorGenerator("Session invalid or expire");
      req.me = user;
      next();
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};
