const User = require("../Models/user.models");
const ProjectMember = require("../Models/projectmember.models");
const asyncHandler = require("../utils/async-handler");
const ApiError = require("../utils/ap-error");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    throw new ApiError(401, err?.message || "Invalid access token");
  }
});

const validateProjectPermission = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "project id is missing");
    }

    const projectMember = await ProjectMember.findOne({
      project: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!projectMember) {
      throw new ApiError(403, "User is not a member of this project");
    }

    const givenRole = projectMember?.role;

    req.user.role = givenRole;

    if (!roles.includes(givenRole)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action"
      );
    }

    next();
  });
};

module.exports = {
  verifyJWT,
  veriftJWT: verifyJWT,
  validateProjectPermission,
};