const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user_model');
const { sendSuccess, sendError } = require('../utils/response');

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, picture, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return sendError(res, 'Please provide all the details', 400);
  }

  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists) {
    return sendError(res, 'User already exists', 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const newUser = new UserModel({
      name, email, password: hashedPassword, picture, mobile, isAdmin: false,
    });

    const savedUser = await newUser.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return sendSuccess(res, userResponse, 'User registered successfully', 201);
  } catch (error) {
    return sendError(res, 'An error occurred while registering the user');
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendError(res, 'User does not exist', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 'Wrong password', 401);
    }

    const { password: _, mobile, ...userData } = user.toObject();
    const token = jwt.sign({ userID: user._id }, process.env.USER_SECRET_KEY, {
      expiresIn: '10d',
    });

    return sendSuccess(res, { ...userData, token }, 'Login successful');
  } catch (error) {
    return sendError(res, 'An error occurred while logging in');
  }
});

const getUser = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    return sendSuccess(res, users, 'Users fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while getting the users');
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return sendError(res, 'User does not exist', 404);
    }
    return sendSuccess(res, deletedUser, 'User deleted successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while deleting the user');
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!updatedUser) {
      return sendError(res, 'User does not exist', 404);
    }
    return sendSuccess(res, updatedUser, 'User updated successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while updating the user');
  }
};

module.exports = { userRegister, userLogin, getUser, deleteUser, updateUser };
