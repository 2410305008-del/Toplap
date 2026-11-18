# 💻 TopLap — High-Performance Tech & Laptop E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_4-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

**TopLap** is a modern, full-stack e-commerce web platform engineered for exploring, comparing, and purchasing high-performance laptops, custom workstations, and cutting-edge tech gear. Built with a responsive **React 18 + Vite** client and a modular **Node.js & Express** REST API with zero-setup JSON database persistence.

---

## 🚀 Key Features

### 🛒 Shopping Experience & Storefront
- **Dynamic Catalog & Filtering**: Browse laptops by category (*Gaming*, *Ultrabook*, *Workstation*, *Creator*, *Budget*), brand (*Apple, ASUS, Dell, Lenovo, HP, MSI, Acer, Razer*), and real-time price slider.
- **Search & Sort**: Instant keyword search and multi-criteria sorting (Price Low to High, High to Low, Popularity, Rating).
- **Quick View Modal**: Inspect technical specifications, high-res galleries, stock status, and feature bullet points without leaving the catalog.
- **Side-by-Side Product Comparison**: Compare up to 4 machines simultaneously in a dock with synchronized spec grids (CPU, GPU, RAM, Storage, Display, Battery, Ports).
- **Interactive Laptop Quiz**: Smart questionnaire that matches users to their ideal device based on workflow, budget, portability, and operating system preference.

### 🛍️ Cart, Wishlist & Checkout
- **Cart & Wishlist Drawers**: Smooth off-canvas drawers for managing cart quantities, reviewing order summaries, and bookmarking favorite gear.
- **Dynamic Coupon Engine**: Real-time discount code validation supporting percentage cuts, flat vouchers, and free air shipping (e.g., `TOPLAP10`, `TECH2025`, `WELCOME500`, `FREESHIP`).
- **Streamlined Checkout Flow**: Multi-step checkout with address validation, delivery mode selection, instant invoice calculation, and order generation.

### 🔐 User Accounts & Support
- **Authentication**: User registration, login, and protected profile retrieval (`/api/auth/me`).
- **Support Ticketing**: Direct contact submission storing customer service queries with tracking IDs.
- **Newsletter Subscription**: Instant newsletter sign-up with promotional voucher rewards.

---

## 🏗️ Project Architecture

```plaintext
TopLap/
├── Backend/                 # Modular Express.js REST API
│   ├── data/                # Persistent JSON database
│   │   ├── coupons.json     # Active discount codes
│   │   ├── orders.json      # Customer order records
│   │   ├── products.json    # Certified hardware catalog
│   │   ├── subscribers.json # Newsletter mailing list
│   │   ├── tickets.json     # Support inquiries
│   │   └── users.json       # Registered customer profiles
│   ├── routes/              # Express route modules
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── coupons.routes.js
│   │   ├── newsletter.routes.js
│   │   ├── orders.routes.js
│   │   ├── products.routes.js
│   │   ├── quiz.routes.js
│   │   └── stats.routes.js
│   ├── utils/               # File-system JSON database helpers
│   ├── package.json
│   ├── server.js            # Backend application entry point
│   └── test_backend.js      # Automated API integration test suite
│
├── Frontend/                # Modern React + Vite Single Page Application
│   ├── public/              # Static assets & brand icons
│   ├── src/
│   │   ├── components/      # Reusable UI widgets
│   │   │   ├── common/      # Badges, loaders, buttons
│   │   │   ├── layout/      # Navbar, Footer, Floating Dock
│   │   │   └── modals/      # CartDrawer, WishlistDrawer, CheckoutModal, CompareModal, QuickView
│   │   ├── context/         # React Context (Auth, Cart, Wishlist, Compare)
│   │   ├── pages/           # Page routes (HomePage, ShopPage, AboutPage, ContactPage, AuthPage)
│   │   ├── services/        # Centralized API service client (api.js)
│   │   ├── App.jsx          # Router & layout provider configuration
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json          # SPA rewrite rules for Vercel deployment
│   └── vite.config.js
│
├── data/                    # Root fallback database
├── images/                  # Product imagery & media assets
├── server.js                # Monolithic root server (legacy / standalone mode)
├── test_backend.js          # Root integration tests
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: Custom modern responsive CSS with dark-mode aesthetic, glowing accents, and glassmorphism.
- **Icons**: Lucide React & FontAwesome.

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Server Framework**: [Express.js](https://expressjs.com/)
- **CORS**: [cors](https://www.npmjs.com/package/cors)
- **Database**: Zero-dependency JSON flat-file storage engine (`fs` / `path`) for instant portability without external database setup.

---

## 📡 REST API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server uptime and health status |
| `GET` | `/products` | List all products (supports `?category=`, `?brand=`, `?maxPrice=`, `?search=`, `?sort=`) |
| `GET` | `/products/:id` | Fetch single product specification by ID |
| `POST` | `/orders` | Create a new customer order |
| `GET` | `/orders/:orderId` | Retrieve order status and receipt details |
| `POST` | `/coupons/validate`| Validate promo code and calculate discount amount |
| `POST` | `/quiz/recommend` | Submit user quiz answers to receive machine recommendations |
| `POST` | `/contact` | Create a customer support ticket |
| `POST` | `/newsletter` | Subscribe email to VIP announcements and receive coupons |
| `GET` | `/stats` | Live platform metrics (total products, orders, tickets, subscribers) |
| `POST` | `/auth/register` | Register a new user account |
| `POST` | `/auth/login` | Authenticate user credentials and receive session token |
| `GET` | `/auth/me` | Retrieve profile data for the authenticated user |

---

## 🎟️ Built-in Promotional Codes

Test checkout discount validation with any of these pre-configured codes:

| Code | Benefit | Minimum Order |
| :--- | :--- | :--- |
| `TOPLAP10` | 10% discount on order | ₹20,000 |
| `TECH2025` | Flat ₹5,000 instant discount | ₹70,000 |
| `WELCOME500` | Flat ₹500 welcome voucher | ₹25,000 |
| `FREESHIP` | 100% Free Air Express Shipping | ₹0 |

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/2410305008-del/Toplap.git
cd Toplap
```

### 2. Backend Setup
```bash
# Navigate to Backend folder (or run from root)
cd Backend
npm install

# Start the Express API server
npm start
```
The backend API server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend
npm install

# Start the Vite development server
npm run dev
```
The React frontend will be available at `http://localhost:5173`.

### 4. Environment Variables (Optional)
If running Frontend with an external or production backend URL, create a `.env` file in `Frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Automated Testing

TopLap includes an automated end-to-end integration test suite verifying health, catalog endpoints, filters, coupon logic, order placement, support ticketing, quiz calculations, and database snapshots:

```bash
# Run backend tests
cd Backend
npm test

# Or run root test suite against running server
node test_backend.js
```

---

## 🚢 Deployment

### Deploying Frontend to Vercel
The repository includes a ready-to-use `Frontend/vercel.json` configured for Single Page Application routing:
1. Import the repository into [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `Frontend`.
3. Add the environment variable `VITE_API_URL` pointing to your deployed Backend API.
4. Deploy!

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
