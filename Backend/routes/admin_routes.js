const express = require('express');
const { adminRegister, adminLogin, getAdmin, deleteAdmin, updateAdmin } = require('../controller/admin_controller');


const adminRouter = express.Router();

adminRouter.post("/register", adminRegister)

adminRouter.post("/login", adminLogin)

adminRouter.get("/", getAdmin)

adminRouter.delete("/:id", deleteAdmin)

adminRouter.patch("/:id", updateAdmin)

module.exports = { adminRouter }