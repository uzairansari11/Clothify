const express = require('express');
const { userRegister, userLogin, userSearch, getUser, deleteUser, updateUser } = require('../controller/user_controller');

const userRouter = express.Router();

userRouter.post("/register", userRegister)

userRouter.post("/login", userLogin)

userRouter.get("/saas", userSearch)

userRouter.get("/", getUser)

userRouter.delete("/:id", deleteUser)

userRouter.patch("/:id", updateUser)

module.exports = { userRouter }