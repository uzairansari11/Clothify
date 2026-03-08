# Clothify

**Fashion That Defines You**

[![Vercel](https://vercelbadge.vercel.app/api/uzairansari11/Clothify)](https://clothify-rho.vercel.app/)
[![Last Commit](https://img.shields.io/github/last-commit/uzairansari11/Clothify?style=flat-square)](https://github.com/uzairansari11/Clothify/commits/main)
[![Contributors](https://img.shields.io/github/contributors-anon/uzairansari11/Clothify?style=flat-square)](https://github.com/uzairansari11/Clothify/graphs/contributors)

---

## Overview

Clothify is a full-stack e-commerce web application for fashion retail. It provides a complete shopping experience — from browsing and filtering products to cart management, wishlist, checkout, and order tracking — backed by a RESTful API with JWT-based authentication. Features a dynamic theming system with customizable accent colors, border radius presets, dark mode, smooth page transitions, and a full admin dashboard.

---

## Live Demo

[https://clothify-rho.vercel.app/](https://clothify-rho.vercel.app/)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Chakra UI v2, Redux + Thunk, Framer Motion, React Router v6 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Auth** | JWT (JSON Web Tokens), bcrypt password hashing, cookie-based sessions |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend) |

---

## Features

### Customer Experience
- Product browsing with multi-filter support (category, brand, price, discount)
- Real-time debounced search with "no results" feedback
- Detailed product pages with size selection, ratings, and delivery info
- Shopping cart with quantity controls and live price calculation
- Wishlist to save products for later
- Multi-step checkout with shipping and payment forms
- Order history with full item breakdown
- Secure login and signup with JWT authentication

### Admin Dashboard
- Statistics overview — revenue, users, admins, products, orders
- User management with search and pagination
- Admin account management
- Full CRUD on products (add, edit, delete) with image URLs, sizes, pricing
- Order management with detail modal (customer info, items, totals)
- Protected routes with admin authentication

### Design System
- **Dynamic Theming** — 8 accent colors (Purple, Blue, Teal, Green, Orange, Pink, Red, Cyan) via Preference Drawer
- **Border Radius Presets** — Sharp, Rounded, or Full
- **Dark / Light Mode** — Full support across all pages
- **Smooth Page Transitions** — Framer Motion entrance/exit animations
- **Code Splitting** — React.lazy + Suspense for optimized loading
- **Responsive Design** — Mobile-first, adapts to all screen sizes

---

## Screenshots

### Homepage
![Homepage Hero](./Frontend/clothify/screenshots/01-homepage-hero.png)

### Product Collections
| Men's Collection | Women's Collection |
|:---:|:---:|
| ![Men](./Frontend/clothify/screenshots/03-men-collection.png) | ![Women](./Frontend/clothify/screenshots/04-women-collection.png) |

| Kids' Collection | Product Sections |
|:---:|:---:|
| ![Kids](./Frontend/clothify/screenshots/05-kids-collection.png) | ![Sections](./Frontend/clothify/screenshots/02-homepage-sections.png) |

### Authentication
| User Login | User Signup |
|:---:|:---:|
| ![Login](./Frontend/clothify/screenshots/07-login.png) | ![Signup](./Frontend/clothify/screenshots/08-signup.png) |

| Admin Login | Admin Signup |
|:---:|:---:|
| ![Admin Login](./Frontend/clothify/screenshots/09-admin-login.png) | ![Admin Signup](./Frontend/clothify/screenshots/10-admin-signup.png) |

### Single Product
![Single Product](./Frontend/clothify/screenshots/06-single-product.png)

### Shopping Experience
| Shopping Cart | Wishlist |
|:---:|:---:|
| ![Cart](./Frontend/clothify/screenshots/19-cart.png) | ![Wishlist](./Frontend/clothify/screenshots/20-wishlist.png) |

### Order History
![Order History](./Frontend/clothify/screenshots/21-orderhistory.png)

### Dark Mode
| Homepage (Dark) | Login (Dark) |
|:---:|:---:|
| ![Homepage Dark](./Frontend/clothify/screenshots/12-homepage-dark.png) | ![Login Dark](./Frontend/clothify/screenshots/13-login-dark.png) |

### About Page
![About](./Frontend/clothify/screenshots/11-about.png)

### Admin Dashboard
![Dashboard](./Frontend/clothify/screenshots/14-admin-dashboard.png)

| User Management | Product Management |
|:---:|:---:|
| ![Users](./Frontend/clothify/screenshots/15-admin-users.png) | ![Products](./Frontend/clothify/screenshots/16-admin-products.png) |

| Order Management | Add Product |
|:---:|:---:|
| ![Orders](./Frontend/clothify/screenshots/17-admin-orders.png) | ![Add Product](./Frontend/clothify/screenshots/18-admin-addproduct.png) |

---

## Getting Started

### Prerequisites

- Node.js >= 16
- MongoDB instance (local or Atlas)
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/uzairansari11/Clothify.git
cd Clothify
```

### Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
SALT_ROUND=10
USER_SECRET_KEY=your_user_jwt_secret
ADMIN_REGISTER_CODE=your_admin_registration_code
ADMIN_SECRET_KEY=your_admin_jwt_secret
```

```bash
npm start
```

### Frontend setup

```bash
cd Frontend/clothify
npm install
```

Create a `.env` file in the `Frontend/clothify` directory:

```env
REACT_APP_URL=http://localhost:8080
REACT_APP_USER_TOKEN=user_token_key
REACT_APP_ADMIN_TOKEN=admin_token_key
```

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
Clothify/
├── Backend/
│   ├── controllers/        # Route handler logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── middleware/          # Auth and error middleware
│   └── index.js            # Server entry point
│
└── Frontend/clothify/
    ├── public/             # Static assets
    └── src/
        ├── api/            # Axios instance
        ├── components/
        │   ├── admin/      # Dashboard, sidebar, tables, add product
        │   ├── common/     # EmptyState, ErrorMessage, LoadingScreen, PageTransition
        │   ├── hoc/        # PrivateRoute, AdminPrivateRoute
        │   └── user/       # Navbar, cards, carousel, cart, wishlist, product grid
        ├── context/        # PreferenceContext (accent color, border radius)
        ├── pages/          # Route-level page components
        ├── redux/
        │   ├── Admin_Redux/  # Admin auth, products, users, orders
        │   ├── User_Redux/   # User auth, cart, wishlist, orders, products
        │   └── store.js      # Redux store with global logout reset
        ├── routing/        # Route definitions with lazy loading
        ├── theme.js        # Dynamic Chakra theme factory
        └── utils/          # Cookie helpers, signup API
```

---

## Author

**Uzair Ansari**

- GitHub: [@uzairansari11](https://github.com/uzairansari11)
- LinkedIn: [linkedin.com/in/uzairansari11](https://www.linkedin.com/in/uzairansari11)

---

*Built with React, Chakra UI, and Node.js*
