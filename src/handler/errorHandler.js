export const errorHandler = (err, req, res, next) => {
  const message = err.message;
  const success = false;
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    success,
    message,
    data: null,
  });
};

export const validationErrorHandler = (err, res) => {
  let feild = Object.keys(err.errors)?.[0];
  res.status(400).json({
    success: false,
    message: err?.errors?.[feild]?.message,
    data: null,
  });
};
