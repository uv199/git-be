import { asyncHandler } from "../handler/asyncHandler.js";
import { handleResponse } from "../handler/responseHandler.js";
import { modals } from "../models/index.js";

export const starHandler = asyncHandler(async (req, res) => {
  let input = req.body;
  input.userId = req?.me?._id;
  let data = null;
  if (input?.isStared) {
    data = await modals.StarRepo.findOneAndDelete({
      userId: input.userId,
      starId: input?.starId,
    });
  } else {
    data = await modals.StarRepo.create(input);
  }

  let starRepo = await modals.StarRepo.find(
    { userId: input.userId },
    { repoId: -1 }
  );

  handleResponse(
    { data: await starRepo?.map?.((e) => e?.repoId) },
    res,
    "Star  successfully"
  );
});

export const getStarRepoByUser = asyncHandler(async (req, res) => {
  let data = await modals.StarRepo.find({ userId: req?.me?._id });

  handleResponse(data, res, "Get Star successfully");
});
