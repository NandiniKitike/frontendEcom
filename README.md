# 🍃 GreenEra - Grocery & Food E-Commerce Platform

Welcome to **GreenEra**, a modern, responsive, and feature-rich E-Commerce frontend built for purchasing fresh groceries, organic vegetables, fruits, dairy products, bakery items, and more. 

This repository houses the complete frontend application, featuring a smooth buyer shopping interface and a comprehensive seller dashboard.

---

## 🚀 Key Features

### 🛒 Buyer Experience
- **Interactive Home Page**: Dynamic banners, categorized navigation, best-sellers carousel, and promotional bottom banners.
- **Product Catalog**: Seamless browsing with real-time product search, category filters, and detailed product pages.
- **Cart Management**: Add, update, and remove items with real-time total updates.
- **Address Management**: Securely add and select delivery addresses.
- **My Orders**: Real-time listing and tracking of order history.
- **Payment Gateway**: Integrated payment gateway interface for seamless mock transactions.

### 💼 Seller Dashboard (Admin Panel)
- **Seller Login**: Secure entry to the seller management suite.
- **Product Management**:
  - View all listed items.
  - Create new products with details (title, description, price, discount, inventory, category, and image upload).
  - Edit or delete existing products.
- **Category Management**: Add, update, and manage categories.
- **Order Management**: Track customer orders and update delivery status (e.g., Processing, Shipped, Delivered).

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` plugin)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: React Context API (`AppContext`)
- **API Client**: [Axios](https://axios-http.com/) (configured with credentials and JWT Bearer tokens)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Project Structure

```text
├── public/                  # Static assets
└── src/
    ├── assets/              # SVGs, PNGs, and dummy product configurations
    ├── components/          # Reusable UI components
    │   ├── seller/          # Seller-specific components (e.g., SellerLogin)
    │   ├── Banner.jsx
    │   ├── Categories.jsx
    │   └── ...
    ├── context/             # React Context (`AppContext.jsx` for global state)
    ├── pages/               # Application pages
    │   ├── seller/          # Seller dashboard pages (ProductList, Orders, etc.)
    │   ├── Home.jsx
    │   ├── Cart.jsx
    │   ├── MyOrders.jsx
    │   └── ...
    ├── paymnetgetway/       # Payment gateway checkout component
    ├── App.jsx              # Main App entry with route definitions
    ├── index.css            # Stylesheet importing Tailwind v4 and Nunito Sans font
    └── main.jsx             # React DOM bootstrapping
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/NandiniKitike/frontendEcom.git
cd frontendEcom
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and define the default currency symbol (or other API variables if applicable):
```env
VITE_CURRENCY='$'
```

### 4. Running Locally
Launch the Vite development server:
```bash
npm run dev
```
By default, the server runs on [http://localhost:5173](http://localhost:5173).

### 5. Build for Production
Build the optimized production assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment

This application includes a `vercel.json` configuration file, making it ready for single-page application (SPA) deployment on [Vercel](https://vercel.com/):
- Handles all client-side routing fallback checks by rewriting routes back to `index.html`.
- Production builds will automatically compile via `npm run build`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/NandiniKitike/frontendEcom/issues) if you want to contribute.
