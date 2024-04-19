import jwt from "jsonwebtoken";

import { modals } from "../models/index.js";
import { config } from "../config.js";
import { asyncHandler } from "../handler/asyncHandler.js";
import { ErrorGenerator } from "../generator/errorGenerator.js";
import { handleResponse } from "../handler/responseHandler.js";
import { getStaredRepo, verifyGitUserName } from "./git.js";

const createToken = (user) => {
  return jwt.sign({ email: user?.email, id: user._id }, config.SECRET_KEY);
};

export const signup = asyncHandler(async (req, res) => {
  let input = req.body;

  const match = await modals.User.findOne({
    $or: [
      { email: input.email },
      { contactNo: input.contactNo },
      { gitUserName: input.gitUserName },
    ],
  });

  let msg = "email or password are used";
  if (match?.gitUserName === input?.gitUserName) msg = "git account are used";
  if (match) throw new ErrorGenerator(400, msg);

  let isVerify = await verifyGitUserName(input?.gitUserName);

  if (!isVerify) throw new ErrorGenerator(400, "Git username are not valid");

  let user = await modals.User.create(input);

  handleResponse(
    {
      data: user,
      token: createToken(user),
    },
    res,
    "User create successfully"
  );
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

  const staredRepo = await modals.StarRepo.find(
    { userId: matchUser._id },
    { repoId: -1 }
  );

  handleResponse(
    {
      data: matchUser,
      token: createToken(matchUser),
      staredRepo: staredRepo?.map?.((e) => e?.repoId),
    },
    res,
    "User signin successfully"
  );
});
