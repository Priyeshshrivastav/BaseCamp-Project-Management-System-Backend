const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")
const crypto=require("crypto")



// write schema
const userSchema=new mongoose.Schema({
    avatar:{
        type:{
            url:String,
            localPath:String,
        },
        default:{
            url:`https://placehold.co/`,
            localPath:""
        }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// write prehook -> for hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate tokens -> access token and refresh token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// crypto tokens  ->generating tokens
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // hashed token
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  // token expiry
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

  return { unHashedToken, hashedToken, tokenExpiry };
};

// connect with models
const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.User = User;

