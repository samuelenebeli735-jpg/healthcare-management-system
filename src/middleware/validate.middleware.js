import { ZodError } from "zod";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        error.statusCode = 400;

        error.message = "Validation failed.";

        error.errors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
      }

      next(error);
    }
  };
};

export default validate;