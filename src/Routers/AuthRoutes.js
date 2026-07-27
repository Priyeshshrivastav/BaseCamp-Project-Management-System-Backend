const {
  registerUser,
  login,
  logOutUser,
  verifyEmail,
  refreshAccessToken,
  forgotPasswrdRequest,
  resetForgotPassword,
  getCurrentUser,
  changeCurrentPassword,
  resendEmailVerification,
} = require("../Controllers/Auth.Controllers");
const express = require("express");
const validate = require("../Middlewares/validator.middlewre");
const {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  userChangeCurrentPasswordValidator,
} = require("../validators/index");
const { verifyJWT } = require("../Middlewares/auth.middlewares");

const router = express.Router();

// unsecured routes
router.post("/register", userRegisterValidator(), validate, registerUser);
router.post("/login", userLoginValidator(), validate, login);
router.get("/verify-email/:verificationToken", verifyEmail);

router.post("/refresh-token", refreshAccessToken);
router.post(
  "/forgot-password",
  userForgotPasswordValidator(),
  validate,
  forgotPasswrdRequest
);

router.post(
  "/reset-password/:resetToken",
  userResetForgotPasswordValidator(),
  validate,
  resetForgotPassword
);

// secure routes
router.post("/logout", verifyJWT, logOutUser);
router.get("/current-user", verifyJWT, getCurrentUser);
router.post(
  "/change-password",
  verifyJWT,
  userChangeCurrentPasswordValidator(),
  validate,
  changeCurrentPassword
);
router.post("/resend-email-verification", verifyJWT, resendEmailVerification);

module.exports = router;


