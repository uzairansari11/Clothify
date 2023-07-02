const asyncHandler = require('express-async-handler');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { AdminModel } = require('../model/admin_mode');
const jwt = require('jsonwebtoken');

const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, picture, mobile, code } = req.body;
  if (code != process.env.ADMIN_REGISTER_CODE) {
    return res.status(400).json({ error: 'Incorrect Admin Code' });
  }

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ error: 'Please provide all the details' });
  }
  const isAdminExists = await AdminModel.findOne({ email });
  if (isAdminExists) {
    return res.status(400).json({ error: 'Admin Already Exists' });
  }
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const newAadmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
      picture,
      mobile,
      isAdmin: code == process.env.ADMIN_REGISTER_CODE ? true : false,
    });

    const savedAdmin = await newAadmin.save();
    const adminResponse = savedAdmin.toObject();
    delete adminResponse.password;

    res.status(200).json(adminResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide all the details' });
    }

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ error: 'Admin does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Wrong password' });
    }

    const { password: _, mobile, ...adminData } = admin.toObject();

    const token = jwt.sign(
      { adminID: admin._id },
      process.env.ADMIN_SECRET_KEY,
      {
        expiresIn: '10d',
      },
    );
    const responseData = { ...adminData, token };

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const getAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    return res.status(200).json(admins);
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'An error occurred while getting in the admin' });
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const deletedAdmin = await AdminModel.findByIdAndDelete({ _id: adminId });
    if (!deletedAdmin) {
      res.status(400).json({ message: 'Admin does not exists' });
    } else {
      res
        .status(200)
        .json({ data: deletedAdmin, message: 'Admin deleted successfully' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'An error occurred while deleting in the admin' });
  }
};

const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  const payload = req.body;
  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      { _id: adminId },
      payload,
      {
        new: true,
      },
    );
    if (!updatedAdmin) {
      res.status(400).json({ message: 'Admin does not exists' });
    } else {
      res
        .status(200)
        .json({ data: updatedAdmin, message: 'Admin updated successfully' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'An error occurred while updating in the admin' });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
};
