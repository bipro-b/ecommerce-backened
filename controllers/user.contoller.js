const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewire/catchAsyncError.js");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avator: {
      public_id: "this is sample id",
      url: "profilepicurl",
    },
  });
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    user,
    token,
  });

  //   sendToken(user, 200, res);
});

//Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //   sendToken(user, 200, res);
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    user,
    token,
  });
});
