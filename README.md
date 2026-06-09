# GreenEra — E-Commerce Frontend

GreenEra is a grocery e-commerce web app built with React and Vite. It provides a
customer-facing storefront for browsing and buying products, plus a seller/admin
dashboard for managing products, categories, and orders.

## Features

- Product catalog with category browsing, search, and product detail pages
- Shopping cart and checkout with address management
- User authentication and order history (My Orders)
- Seller/admin dashboard: add/edit products and categories, manage product and
  order lists
- Toast notifications and responsive UI styled with Tailwind CSS

## Tech Stack

- [React 19](https://react.dev/) + [Vite 6](https://vite.dev/)
- [React Router DOM 7](https://reactrouter.com/) for routing
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API requests
- [react-hot-toast](https://react-hot-toast.com/) / react-toastify for notifications
- [lucide-react](https://lucide.dev/) and react-icons for icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
git clone https://github.com/NandiniKitike/frontendEcom.git
cd frontendEcom
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_CURRENCY='$'
```

The backend API base URL is configured in [`constant.js`](./constant.js) via the
`BASE_URL` export.

### Running Locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Build the app for production into `dist/`     |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint over the codebase                  |

## Project Structure

```
.
├── public/              # Static assets served as-is
├── src/
│   ├── assets/          # Images, videos, and asset manifest
│   ├── components/      # Reusable UI components (Navbar, Footer, etc.)
│   │   └── seller/      # Seller dashboard components
│   ├── context/         # React context (AppContext) for global state
│   ├── pages/           # Route pages (Home, Cart, MyOrders, etc.)
│   │   └── seller/      # Seller dashboard pages
│   ├── App.jsx          # App routes and layout
│   └── main.jsx         # App entry point
├── constant.js          # API base URL and cookie helpers
├── vite.config.js       # Vite + React + Tailwind configuration
└── vercel.json          # SPA rewrite config for Vercel deployment
```

## Deployment

The app is configured for deployment on [Vercel](https://vercel.com/). The
[`vercel.json`](./vercel.json) rewrite rule routes all paths to `index.html` so
client-side routing works correctly.

```bash
npm run build
```

Deploy the generated `dist/` directory to your hosting provider of choice.
