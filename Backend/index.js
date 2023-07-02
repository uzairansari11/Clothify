require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { userRouter } = require('./routes/user_routes');
const { connection } = require('./config/db');
const { productRouter } = require('./routes/product_routes');
const { cartRouter } = require('./routes/cart_routes');
const { authorizedMiddleware } = require('./middleware/authorizedMiddleware');
const { orderRouter } = require('./routes/order_routes');
const { WishlistRouter } = require('./routes/wishlist_routes');
const { adminRouter } = require('./routes/admin_routes');

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/cart', authorizedMiddleware, cartRouter);
app.use('/order', orderRouter);
app.use('/wishlist', authorizedMiddleware, WishlistRouter);

// Not found route
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(process.env.PORT, async () => {
  try {
    await connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
