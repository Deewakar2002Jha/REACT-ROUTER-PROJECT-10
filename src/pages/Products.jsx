import React from "react";
import { Link } from "react-router-dom";

/**
 * Sample product catalog data
 */
export const productsData = [
  {
    id: "101",
    name: "Laptop",
    price: "$999.00",
    icon: "💻",
    description: "High performance workstation with 16GB RAM and M-series processor."
  },
  {
    id: "102",
    name: "Mobile",
    price: "$699.00",
    icon: "📱",
    description: "Flagship 5G smartphone featuring a crystal-clear OLED display."
  },
  {
    id: "103",
    name: "Headphones",
    price: "$199.00",
    icon: "🎧",
    description: "Wireless noise-cancelling over-ear headphones with 40h battery life."
  }
];

/**
 * Products Page Component (Route: "/products")
 * 
 * When StaticRouter is given location="/products", it matches this component.
 * Each product card renders a dynamic link `<Link to={`/products/${product.id}`}>`.
 */
export default function Products() {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-description">
          Click "View Details" on any product to see how dynamic routing works with StaticRouter.
        </p>
      </div>

      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-icon">{product.icon}</div>
            <h3 className="product-title">{product.name}</h3>
            <div className="product-price">{product.price}</div>
            <p className="product-desc">{product.description}</p>
            <div className="product-route-tag">
              Route: /products/{product.id}
            </div>
            <Link to={`/products/${product.id}`} className="btn-primary">
              View Details →
            </Link>
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3 className="info-box-title">
          <span>💡</span> StaticRouter at "/products"
        </h3>
        <p className="info-box-text">
          StaticRouter took <code className="code-inline">location="/products"</code> and matched the route 
          <code className="code-inline">&lt;Route path="/products" element=&#123;&lt;Products /&gt;&#125; /&gt;</code>.
          Notice how the links to product details target paths like <code className="code-inline">/products/101</code>.
        </p>
      </div>
    </div>
  );
}
