import { errorResponse } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Default values
  let statusCode = 500;
  let message = "Internal Server Error";

  // Our custom application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Any unexpected errors
    statusCode = err.statusCode || 500;
    message = err.message || message;
  }

  return errorResponse(
    res,
    message,
    err.errors ||
      (process.env.NODE_ENV === "development"
        ? err.stack
        : null),
    statusCode
  );
};

export default errorMiddleware;