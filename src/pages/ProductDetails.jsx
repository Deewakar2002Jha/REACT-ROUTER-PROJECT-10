import React from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "./Products.jsx";

/**
 * ProductDetails Page Component (Route: "/products/:id")
 * 
 * Educational Explanation:
 * 1. Dynamic Routing (:id):
 *    In App.jsx, the route is defined as `<Route path="/products/:id" element={<ProductDetails />} />`.
 *    The `:id` is a URL parameter (placeholder) that matches anything after `/products/`.
 * 
 * 2. useParams() Hook:
 *    The `useParams()` hook extracts an object of key/value pairs of URL parameters.
 *    For a URL like `/products/101`, `useParams()` returns `{ id: "101" }`.
 * 
 * 3. StaticRouter Integration:
 *    Even though StaticRouter is static and running without browser window.location,
 *    React Router parses the `location` string (e.g. "/products/101") and makes
 *    `useParams()` work seamlessly on the server!
 */
export default function ProductDetails() {
  // Extract the "id" param from the URL path defined as "/products/:id"
  const { id } = useParams();

  // Find the product in our mock data matching the extracted ID
  const product = productsData.find((item) => item.id === id);

  return (
    <div className="product-details-page">
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/products" className="btn-secondary">
          ← Back to All Products
        </Link>
      </div>

      <div className="details-card">
        <div className="details-badge-row">
          <span className="id-badge">Product ID: {id}</span>
          {product ? (
            <span style={{ fontSize: "1.5rem" }}>{product.icon}</span>
          ) : (
            <span className="badge" style={{ backgroundColor: "#ef4444" }}>Custom / Unknown ID</span>
          )}
        </div>

        {product ? (
          <>
            <h1 className="details-title">{product.name}</h1>
            <div className="details-price">{product.price}</div>
            <p className="details-desc">{product.description}</p>
            
            <div className="features-list">
              <h3 className="features-title">Product Features:</h3>
              <ul>
                <li>Genuine product with 1-Year Official Warranty</li>
                <li>Fast same-day dispatch and secure packaging</li>
                <li>24/7 Dedicated customer support</li>
              </ul>
            </div>
          </>
        ) : (
          <div>
            <h1 className="details-title">Product #{id}</h1>
            <p className="details-desc">
              This product details page was dynamically rendered for ID: <strong>{id}</strong>.
            </p>
          </div>
        )}

        {/* Educational Breakdown Box */}
        <div className="info-box">
          <h3 className="info-box-title">
            <span>🔍</span> How useParams() & StaticRouter Worked Here
          </h3>
          <p className="info-box-text">
            1. StaticRouter was initialized with: <code className="code-inline">location="/products/{id}"</code><br />
            2. The route pattern <code className="code-inline">/products/:id</code> matched the URL.<br />
            3. React Router extracted the parameter value: <code className="code-inline">id = "{id}"</code><br />
            4. The hook <code className="code-inline">const &#123; id &#125; = useParams()</code> retrieved this value.
          </p>
        </div>
      </div>
    </div>
  );
}
