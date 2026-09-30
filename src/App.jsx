import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";

/**
 * App Component
 * 
 * Notice that App does NOT contain <BrowserRouter> or <StaticRouter> directly.
 * Instead, it only defines the <Routes> structure.
 * 
 * This design allows <App /> to be wrapped by:
 * 1. <StaticRouter location={url}> on the server (SSR or tests)
 * 2. Or any router wrapper needed.
 * 
 * How <Routes> and <Route> work:
 * - <Routes> looks at the current location provided by the parent Router (StaticRouter).
 * - It matches the URL against each <Route path="..." /> from top to bottom.
 * - When a match is found, its `element` is rendered.
 */
export default function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar displayed across all pages */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          {/* Route 1: Home page (Exact match for "/") */}
          <Route path="/" element={<Home />} />

          {/* Route 2: Products list page (Exact match for "/products") */}
          <Route path="/products" element={<Products />} />

          {/* Route 3: Dynamic Product Details page (Matches "/products/101", "/products/102", etc.) */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Route 4: About page (Exact match for "/about") */}
          <Route path="/about" element={<About />} />

          {/* Fallback Route: Matches any undefined route */}
          <Route
            path="*"
            element={
              <div className="info-box" style={{ borderLeftColor: "#ef4444" }}>
                <h2 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>404 - Page Not Found</h2>
                <p>The requested route does not exist in our route configuration.</p>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>React Router StaticRouter Educational Project • Built for Clean Learning</p>
      </footer>
    </div>
  );
}
