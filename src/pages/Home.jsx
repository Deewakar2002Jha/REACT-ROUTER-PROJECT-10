import React from "react";
import { Link } from "react-router-dom";

/**
 * Home Page Component (Route: "/")
 * 
 * When StaticRouter is given location="/", React Router matches this component
 * and renders it as the initial page.
 */
export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to My Store</h1>
        <p className="hero-subtitle">
          A beginner-friendly demonstration of <strong>StaticRouter</strong> from React Router.
          Explore our collection of electronics and see how server-side routing works with fixed URLs!
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/products" className="btn-primary">
            Explore Products →
          </Link>
          <Link to="/about" className="btn-secondary">
            About StaticRouter
          </Link>
        </div>
      </section>

      {/* Educational info box explaining why this page rendered */}
      <div className="info-box">
        <h3 className="info-box-title">
          <span>💡</span> StaticRouter Routing Concept
        </h3>
        <p className="info-box-text">
          Because the <code>location</code> prop was set to <code className="code-inline">"/"</code>, 
          the <code>&lt;Routes&gt;</code> component matched <code>&lt;Route path="/" element=&#123;&lt;Home /&gt;&#125; /&gt;</code>.
          In a server environment (Node.js/Express), <code>StaticRouter</code> renders this exact HTML synchronously to a string!
        </p>
      </div>
    </div>
  );
}
