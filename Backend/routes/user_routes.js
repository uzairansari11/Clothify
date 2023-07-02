const express = require('express');
const {
  userRegister,
  userLogin,
  getUser,
  deleteUser,
  updateUser,
} = require('../controller/user_controller');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const userRouter = express.Router();

userRouter.post('/register', userRegister);

userRouter.post('/login', userLogin);

userRouter.get('/', adminMiddleware, getUser);

userRouter.delete('/:id', adminMiddleware, deleteUser);

userRouter.patch('/:id', adminMiddleware, updateUser);

module.exports = { userRouter };
