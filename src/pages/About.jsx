import React from "react";
import { Link } from "react-router-dom";

/**
 * About Page Component (Route: "/about")
 * 
 * Explains the purpose of this store application and how StaticRouter works.
 */
export default function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-title">About This Store & StaticRouter</h1>
        <p className="page-description">
          Understanding the role of StaticRouter in Server-Side Rendering (SSR).
        </p>
      </div>

      <div className="about-card">
        <h3>What is this Project?</h3>
        <p>
          This is an educational React application built to explain and demonstrate how 
          <strong> StaticRouter</strong> from <code>react-router-dom/server</code> works.
        </p>

        <h3>What is StaticRouter?</h3>
        <p>
          Unlike <code>BrowserRouter</code> (which relies on the browser's <code>window.history</code> and URL bar), 
          <strong> StaticRouter</strong> is a router that never changes its location on its own. It receives a fixed 
          URL via the <code>location</code> prop and renders the matching route once.
        </p>

        <h3>Why do we use StaticRouter?</h3>
        <p>
          On a Node.js server (SSR) or during testing, there is no browser window, no history API, and no DOM. 
          When a user requests a URL like <code>https://my-store.com/products</code>, the server passes that request 
          URL into <code>&lt;StaticRouter location="/products"&gt;</code> to render the exact HTML page before sending 
          it to the client.
        </p>

        <div className="info-box">
          <h3 className="info-box-title">
            <span>🚀</span> Key Takeaway
          </h3>
          <p className="info-box-text">
            <code>BrowserRouter</code> = Client-side (interactive, reads <code>window.location</code>)<br />
            <code>StaticRouter</code> = Server-side / testing (stateless, reads <code>location</code> prop)
          </p>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/products" className="btn-primary">
            Browse Store Products →
          </Link>
        </div>
      </div>
    </div>
  );
}
