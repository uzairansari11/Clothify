# Clothify - Modern E-Commerce Platform

A full-stack e-commerce application built with React, Chakra UI, and Node.js. Features a dynamic theming system, responsive design, and a complete admin dashboard.

## Screenshots

### Homepage
![Homepage Hero](./screenshots/01-homepage-hero.png)

### Product Collections
![Men's Collection](./screenshots/03-men-collection.png)
![Women's Collection](./screenshots/04-women-collection.png)
![Kids' Collection](./screenshots/05-kids-collection.png)

### Product Sections
![Homepage Sections](./screenshots/02-homepage-sections.png)

### Authentication
| User Login | User Signup |
|:---:|:---:|
| ![Login](./screenshots/07-login.png) | ![Signup](./screenshots/08-signup.png) |

| Admin Login | Admin Signup |
|:---:|:---:|
| ![Admin Login](./screenshots/09-admin-login.png) | ![Admin Signup](./screenshots/10-admin-signup.png) |

### Shopping Experience
| Shopping Cart | Wishlist |
|:---:|:---:|
| ![Cart](./screenshots/19-cart.png) | ![Wishlist](./screenshots/20-wishlist.png) |

### Order History
![Order History](./screenshots/21-orderhistory.png)

### About Page
![About](./screenshots/11-about.png)

### Admin Dashboard
![Dashboard](./screenshots/14-admin-dashboard.png)

| User Management | Product Management |
|:---:|:---:|
| ![Users](./screenshots/15-admin-users.png) | ![Products](./screenshots/16-admin-products.png) |

| Order Management | Add Product |
|:---:|:---:|
| ![Orders](./screenshots/17-admin-orders.png) | ![Add Product](./screenshots/18-admin-addproduct.png) |

---

## Features

### Customer-Facing
- **Product Browsing** — Browse Men, Women, and Kids collections with filters (price, category, brand, discount)
- **Product Search** — Real-time search with debounced API calls and "no results" feedback
- **Product Details** — Size selection, image gallery, ratings, delivery info
- **Shopping Cart** — Add/remove items, quantity controls, price summary
- **Wishlist** — Save favorite products, move to cart
- **Checkout** — Multi-step checkout with shipping & payment forms
- **Order History** — Track past orders with full item details
- **Authentication** — User signup/login with cookie-based sessions

### Admin Dashboard
- **Statistics Overview** — Revenue, users, admins, products, orders at a glance
- **User Management** — View, edit, and manage registered users (paginated)
- **Admin Management** — View and manage admin accounts (paginated)
- **Product Management** — Add, edit, delete products with image URLs, sizes, pricing
- **Order Management** — View all orders with detail modal, customer info, item breakdown
- **Protected Routes** — Admin routes secured with authentication

### Design System
- **Dynamic Theming** — Choose from 8 accent colors (Purple, Blue, Teal, Green, Orange, Pink, Red, Cyan) via Preference Drawer
- **Border Radius Presets** — Sharp, Rounded, or Full radius options
- **Dark Mode** — Full dark mode support across all pages
- **Smooth Page Transitions** — Framer Motion page entrance/exit animations
- **Code Splitting** — React.lazy + Suspense for optimized bundle loading
- **Responsive Design** — Mobile-first, works on all screen sizes

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Chakra UI v2** | Component library & theming |
| **Redux + Thunk** | State management |
| **React Router v6** | Client-side routing |
| **Framer Motion** | Animations & page transitions |
| **React Hook Form** | Form validation (checkout) |
| **Axios** | HTTP client |
| **React Icons** | Icon library (Feather, Ant Design) |
| **js-cookie** | Cookie management |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |
| **CORS** | Cross-origin resource sharing |

---

## Project Structure

```
Frontend/clothify/
├── src/
│   ├── api/                    # Axios instance configuration
│   ├── components/
│   │   ├── admin/              # Admin dashboard components
│   │   │   ├── authentication/ # Admin login/signup pages
│   │   │   ├── dashboard/      # Dashboard layout, sidebar, panels
│   │   │   └── utils/          # Order & revenue calculation helpers
│   │   ├── common/             # Shared components (EmptyState, ErrorMessage, LoadingScreen, PageTransition)
│   │   ├── hoc/                # Route guards (PrivateRoute, AdminPrivateRoute)
│   │   └── user/               # User-facing components
│   │       ├── card/           # Product cards
│   │       ├── carousel/       # Product carousel
│   │       ├── cart/           # Cart item cards
│   │       ├── footer/         # Footer
│   │       ├── navbar/         # Navbar, search, menus, drawer
│   │       ├── product/        # Product grid, filters, pagination
│   │       ├── scrollToTopButton/
│   │       ├── spinner/        # Loading spinner
│   │       └── wishlist/       # Wishlist cards
│   ├── context/                # PreferenceContext (accent color, border radius)
│   ├── pages/                  # Route-level page components
│   ├── redux/
│   │   ├── Admin_Redux/        # Admin auth, products, users, orders
│   │   ├── User_Redux/         # User auth, cart, wishlist, orders, products
│   │   └── store.js            # Redux store with global logout reset
│   ├── routing/                # Route definitions with lazy loading
│   ├── theme.js                # Dynamic Chakra theme factory
│   └── utils/                  # Cookie helpers, signup API calls
├── screenshots/                # Application screenshots
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB instance (local or Atlas)

### Backend Setup
```bash
cd Backend
npm install
# Configure .env with MONGODB_URI, JWT_SECRET, PORT
npm run dev
```

### Frontend Setup
```bash
cd Frontend/clothify
npm install
# Configure .env with REACT_APP_API_URL, REACT_APP_USER_TOKEN, REACT_APP_ADMIN_TOKEN
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### Frontend (`Frontend/clothify/.env`)
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_USER_TOKEN=clothify_user_token
REACT_APP_ADMIN_TOKEN=clothify_admin_token
```

### Backend (`Backend/.env`)
```
PORT=8080
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_secret
```

---

## Deployment

The frontend is configured for Vercel deployment. Build with:

```bash
npm run build
```

---

## Author

**Uzair Ansari**

---

*Built with React, Chakra UI, and Node.js*
