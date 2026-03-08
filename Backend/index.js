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

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/cart', authorizedMiddleware, cartRouter);
app.use('/order', orderRouter);
app.use('/wishlist', authorizedMiddleware, WishlistRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

connection().catch((error) => console.log(error));

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}

module.exports = app;
