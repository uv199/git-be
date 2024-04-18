import jwt from "jsonwebtoken";

import { modals } from "../models/index.js";
import { config } from "../config.js";
import { asyncHandler } from "../handler/asyncHandler.js";
import { ErrorGenerator } from "../generator/errorGenerator.js";
import { handleResponse } from "../handler/responseHandler.js";

const createToken = (user) => {
  return jwt.sign({ email: user?.email, id: user._id }, config.SECRET_KEY);
};

export const signup = asyncHandler(async (req, res) => {
  let input = req.body;

  const match = await modals.User.findOne({
    $or: [{ email: input.email }, { contactNo: input.contactNo }],
  });

  if (match) throw new ErrorGenerator(400, "email or password are used");

  let user = await modals.User.create(input);

  res.cookie("accessToken", createToken(user));

  handleResponse(user, res, "User create successfully");
});
export const logout = asyncHandler(async (req, res) => {
  // res.clearCookie("accessToken");
  res.clearCookie("user");
  handleResponse(null, res, "User create successfully");
});

export const signin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const matchUser = await modals.User.findOne({
    $or: [{ email }, { contactNo: email }],
  });

  if (!matchUser)
    throw new ErrorGenerator(400, "User not found with credetial");
  let match = await matchUser.validatePassword(password);

  if (!match) throw new ErrorGenerator(400, "Email of password not match");
  res.cookie("accessToken", createToken(matchUser));
  handleResponse(matchUser, res, "User signin successfully");
});
