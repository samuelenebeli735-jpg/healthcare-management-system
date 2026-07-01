import { errorResponse } from "../utils/apiResponse.js";

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    return errorResponse(
        res,
        err.message || "Internal Server Error",
        process.env.NODE_ENV === "development"
            ? err.stack
            : null,
        statusCode
    );
};

export default errorMiddleware;