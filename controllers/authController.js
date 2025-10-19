const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const TryCatch = require("../middlewares/TryCatch.js");

const newUser = async (req, res, next) => {
  try {
    const { _id, name, email, photo } = req.body;

    let user = await User.findById(_id);

    if (user) {
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
        token,
        user,
      });
    }

    if (!_id || !name || !email || !photo)
      return res.status(401).json({
        success: false,
        message: "Please Fill all the fields",
      });

    user = await User.create({
      _id,
      name,
      email,
      photo,
    });

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Error While Log in, ${error}`,
    });
  }
};

const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    users,
  });
});

const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user)
    return res.status(401).json({
      success: false,
      message: "Invalid Id",
    });

  return res.status(200).json({
    success: true,
    user,
  });
});

const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user)
    return res.status(401).json({
      success: false,
      message: "Invalid Id",
    });

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

module.exports = {
  newUser,
  getAllUsers,
  getUser,
  deleteUser,
};
