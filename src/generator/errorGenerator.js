export class ErrorGenerator extends Error {
  constructor(
    statusCode,
    message = "Somthing went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
