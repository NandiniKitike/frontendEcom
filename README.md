# GreenEra — E-Commerce Frontend

GreenEra is the React frontend for an online grocery/e-commerce store. It provides a
customer-facing storefront (browse products, search, cart, checkout, orders) and a
seller/admin dashboard (manage products, categories, and orders). The app talks to a
separate backend REST API and uses Razorpay for payments.

> This is the frontend only. It expects a running backend API (see [Configuration](#configuration)).

## Tech Stack

- **React 19** with **Vite 6** (dev server + build, HMR via `@vitejs/plugin-react`)
- **React Router DOM 7** for client-side routing
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Axios** for HTTP requests (`withCredentials` enabled)
- **react-hot-toast** / **react-toastify** for notifications
- **lucide-react** / **react-icons** for icons
- **Razorpay Checkout** for payments
- **ESLint 9** for linting

## Features

### Storefront (customer)
- Home page with banners, categories, and best sellers
- Browse all products and products by category
- Product details page
- Product search
- Shopping cart with quantity updates and item removal
- Address management and order placement
- Razorpay payment integration
- "My Orders" history
- Email/password registration and login (token persisted in `localStorage`)

### Seller / Admin dashboard (`/seller`)
- Seller login (admin role)
- Product list with add / edit
- Category list with add / edit
- Order management

## Project Structure

```
.
├── index.html              # App entry HTML (mounts #root)
├── constant.js             # BASE_URL of the backend API + cookie helpers
├── vite.config.js          # Vite config (React + Tailwind plugins)
├── vercel.json             # SPA rewrite config for Vercel
├── eslint.config.js        # ESLint flat config
├── public/                 # Static assets served as-is (logo, etc.)
└── src/
    ├── main.jsx            # React entry; wraps App in Router + AppContext
    ├── App.jsx             # Route definitions (storefront + seller)
    ├── index.css           # Tailwind + global styles
    ├── assets/             # Images, svgs, videos, and dummy product data
    ├── context/
    │   └── AppContext.jsx  # Global state: user, cart, products, auth, API calls
    ├── components/         # Navbar, Footer, Login, Banner, ProductCard, etc.
    │   └── seller/         # Seller-specific components (SellerLogin)
    ├── pages/              # Home, AllProducts, Cart, MyOrders, AddAddress, ...
    │   └── seller/         # Seller dashboard pages (Orders, AddProduct, ...)
    └── paymnetgetway/
        └── PaymentGetway.jsx  # Razorpay checkout integration
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Home page |
| `/products` | All products |
| `/products/:category` | Products filtered by category |
| `/products/:category/:id` | Product details |
| `/products/category/:categoryId` | Products by category id |
| `/cart` | Shopping cart |
| `/add-address` | Add a delivery address |
| `/my-orders` | Customer order history |
| `/seller` | Seller dashboard (product list); login if not authenticated |
| `/seller/orders` | Manage orders |
| `/seller/product-add` | Add a product |
| `/seller/edit-product/:id` | Edit a product |
| `/seller/category-list` | Manage categories |
| `/seller/category-add` | Add a category |
| `/seller/edit-category/:id` | Edit a category |

## Getting Started

### Prerequisites
- **Node.js 18+** (Node 20+ recommended for Vite 6)
- **npm** (or a compatible package manager)
- A running instance of the backend API

### Installation

```bash
git clone https://github.com/NandiniKitike/frontendEcom.git
cd frontendEcom
npm install
```

### Configuration

The app reads two pieces of configuration:

1. **Backend API URL** — set in `constant.js`:

   ```js
   export const BASE_URL = "https://e-commerce-mbth.onrender.com";
   ```

   Change this to point at your own backend (e.g. `http://localhost:5000` for local
   development).

2. **Currency symbol** — provided via a Vite environment variable in a `.env` file at the
   project root:

   ```bash
   VITE_CURRENCY='$'
   ```

   If unset, the app falls back to `₹`.

> Payments use a Razorpay **test** key configured in `src/paymnetgetway/PaymentGetway.jsx`.
> Replace it with your own key for production use, and never commit real secret keys.

### Run the development server

```bash
npm run dev
```

Vite prints a local URL (default `http://localhost:5173`). Open it in your browser; the app
hot-reloads as you edit.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

## Deployment

The project includes a `vercel.json` with a SPA rewrite so client-side routing works on
[Vercel](https://vercel.com/):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

To deploy:

1. Build the app with `npm run build` (output goes to `dist/`).
2. Deploy `dist/` to any static host (Vercel, Netlify, etc.). On Vercel, the included
   `vercel.json` handles SPA routing automatically.

Make sure `BASE_URL` in `constant.js` points at your production backend before building.

## Notes

- Authentication state (user and admin/seller flags) and the auth token are stored in
  `localStorage`; requests send the token as a `Bearer` header.
- `src/assets/assets.js` contains dummy product data used as a fallback for the catalog.
```
