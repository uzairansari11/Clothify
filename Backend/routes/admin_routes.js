const express = require('express');
const {
  adminRegister,
  adminLogin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
} = require('../controller/admin_controller');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);

adminRouter.post('/login', adminLogin);

adminRouter.get('/', adminMiddleware, getAdmin);

adminRouter.delete('/:id', adminMiddleware, deleteAdmin);

adminRouter.patch('/:id', adminMiddleware, updateAdmin);

module.exports = { adminRouter };
