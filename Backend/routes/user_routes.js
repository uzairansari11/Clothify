const express = require('express');
const { userRegister, userLogin, userSearch } = require('../controller/user_controller');

const userRouter = express.Router();

userRouter.post("/register",userRegister)

userRouter.post("/login",userLogin)

userRouter.get("/",userSearch)




module.exports= {userRouter}