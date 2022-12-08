const mongoose = require("mongoose");
const validator = require("validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Exceed 30 characters"],
    minLength: [3, "Enter more than 3 character"],
  },
  email: {
    type: String,
    required: [true, "Enter your Email please!"],
    unique: true,
    validator: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Enter more than 5 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
