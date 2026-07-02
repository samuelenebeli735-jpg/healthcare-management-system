import jwt from "jsonwebtoken";

/**
 * Generate a JWT for an authenticated user.
 *
 * @param {Object} user
 * @returns {string}
 */
export default function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
}