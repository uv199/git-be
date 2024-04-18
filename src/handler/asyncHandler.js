import { validationErrorHandler } from "./errorHandler.js";

export const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (error) {
    if (error.name === "ValidationError") {
      validationErrorHandler(error, res);
    } else {
      res.status(error.statusCode || 500).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
};
