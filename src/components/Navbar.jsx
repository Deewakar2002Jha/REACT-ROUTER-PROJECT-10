import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar Component
 * 
 * Demonstrates standard React Router <Link> elements.
 * When rendered under StaticRouter on the server, <Link to="/products">
 * generates standard HTML <a href="/products"> tags that search engines and
 * browsers understand immediately.
 */
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <span className="brand-icon">🛍️</span>
          <span>StaticStore</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
