const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AdminModel } = require('../model/admin_mode');
const { sendSuccess, sendError } = require('../utils/response');

const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, picture, mobile, code } = req.body;

  if (code !== process.env.ADMIN_REGISTER_CODE) {
    return sendError(res, 'Incorrect Admin Code', 400);
  }

  if (!name || !email || !password || !mobile) {
    return sendError(res, 'Please provide all the details', 400);
  }

  const isAdminExists = await AdminModel.findOne({ email });
  if (isAdminExists) {
    return sendError(res, 'Admin already exists', 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const newAdmin = new AdminModel({
      name, email, password: hashedPassword, picture, mobile, isAdmin: true,
    });

    const savedAdmin = await newAdmin.save();
    const adminResponse = savedAdmin.toObject();
    delete adminResponse.password;

    return sendSuccess(res, adminResponse, 'Admin registered successfully', 201);
  } catch (error) {
    return sendError(res, error.message);
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return sendError(res, 'Admin does not exist', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return sendError(res, 'Wrong password', 401);
    }

    const { password: _, mobile, ...adminData } = admin.toObject();
    const token = jwt.sign({ adminID: admin._id }, process.env.ADMIN_SECRET_KEY, {
      expiresIn: '10d',
    });

    return sendSuccess(res, { ...adminData, token }, 'Login successful');
  } catch (error) {
    return sendError(res, error.message);
  }
});

const getAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find().select('-password');
    return sendSuccess(res, admins, 'Admins fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while getting admins');
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return sendError(res, 'Admin does not exist', 404);
    }
    return sendSuccess(res, deletedAdmin, 'Admin deleted successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while deleting the admin');
  }
};

const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!updatedAdmin) {
      return sendError(res, 'Admin does not exist', 404);
    }
    return sendSuccess(res, updatedAdmin, 'Admin updated successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while updating the admin');
  }
};

module.exports = { adminRegister, adminLogin, getAdmin, deleteAdmin, updateAdmin };
