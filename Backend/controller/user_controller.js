const asyncHandler = require("express-async-handler");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user_model");
const jwt = require("jsonwebtoken");
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, picture, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ error: "Please provide all the details" });
  }
  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ error: "User Already Exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      picture,
      mobile,
      isAdmin: false,
    });

    const savedUser = await newUser.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const { password: _, mobile, ...userData } = user.toObject();

    const token = jwt.sign({ userID: user._id }, process.env.USER_SECRET_KEY, {
      expiresIn: "10d",
    });
    const responseData = { ...userData, token };

    return res.status(200).json(responseData);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occurred while logging in the user" });
  }
});

const getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occurred while getting in the user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });
    if (!deletedUser) {
      res.status(400).json({ message: "User does not exists" });
    } else {
      res
        .status(200)
        .json({ data: deletedUser, message: "Item deleted successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occurred while getting in the user" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const payload = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      payload,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res.status(400).json({ message: "User does not exists" });
    } else {
      res
        .status(200)
        .json({ data: updatedUser, message: "User updated successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occurred while getting in the user" });
  }
};

module.exports = { userRegister, userLogin, getUser, deleteUser, updateUser };
