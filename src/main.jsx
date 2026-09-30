import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
// IMPORTANT: Demonstrating StaticRouter from "react-router-dom/server"
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";
import "./index.css";

/**
 * StaticRouterSplitScreenRunner Component
 * 
 * Creates a side-by-side (Left / Right) split-screen experience:
 * - LEFT SIDE:  StaticRouter Controller & Server Simulator (controls `location` prop, explains concepts, shows live SSR HTML)
 * - RIGHT SIDE: Rendered React Store App (`<StaticRouter location={currentUrl}><App /></StaticRouter>`)
 */
function StaticRouterSplitScreenRunner() {
  // State storing the current URL passed into StaticRouter's location prop
  const [currentUrl, setCurrentUrl] = useState("/");
  const [customInput, setCustomInput] = useState("");
  const [activeTab, setActiveTab] = useState("controls"); // "controls" | "ssr-preview"

  // Preset URLs matching the project routes
  const presetUrls = [
    { label: "Home", url: "/", description: "Matches exact root path '/'" },
    { label: "Products Catalog", url: "/products", description: "Matches '/products'" },
    { label: "Laptop Details", url: "/products/101", description: "Dynamic route '/products/:id' with id=101" },
    { label: "Mobile Details", url: "/products/102", description: "Dynamic route '/products/:id' with id=102" },
    { label: "Headphones Details", url: "/products/103", description: "Dynamic route '/products/:id' with id=103" },
    { label: "About Page", url: "/about", description: "Matches '/about'" },
    { label: "404 Not Found", url: "/unknown-route", description: "Matches wildcard '*'" }
  ];

  // Intercept normal anchor tag clicks so clicking links inside App updates our StaticRouter location
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("/")) {
        e.preventDefault();
        const targetPath = anchor.getAttribute("href");
        setCurrentUrl(targetPath);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      const formatted = customInput.startsWith("/") ? customInput : `/${customInput}`;
      setCurrentUrl(formatted);
      setCustomInput("");
    }
  };

  // Generate live SSR HTML string for the current location
  const currentSsrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={currentUrl}>
      <App />
    </StaticRouter>
  );

  return (
    <div className="split-screen-wrapper">
      {/* =========================================================================
          LEFT SIDE: StaticRouter Inspector & Controller Panel
          ========================================================================= */}
      <aside className="left-panel">
        <div className="panel-header">
          <div className="panel-badge-row">
            <span className="badge">StaticRouter Demo</span>
            <span className="sub-badge">react-router-dom/server</span>
          </div>
          <h2 className="panel-title">Server Router Controller</h2>
          <p className="panel-subtitle">
            StaticRouter is stateless and reads its URL from the <code>location</code> prop.
          </p>
        </div>

        {/* Live Code Box */}
        <div className="live-code-card">
          <div className="code-card-header">
            <span>⚡ Active JSX on Server</span>
          </div>
          <pre className="code-card-body">
            <code>
              <span className="code-tag">&lt;StaticRouter</span> <span className="code-prop">location</span>=<span className="code-val">"{currentUrl}"</span><span className="code-tag">&gt;</span>{'\n'}
              &nbsp;&nbsp;<span className="code-tag">&lt;App /&gt;</span>{'\n'}
              <span className="code-tag">&lt;/StaticRouter&gt;</span>
            </code>
          </pre>
        </div>

        {/* Tab switcher: Controls vs SSR HTML Preview */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "controls" ? "active" : ""}`}
            onClick={() => setActiveTab("controls")}
          >
            🧭 Route Switcher
          </button>
          <button
            className={`tab-btn ${activeTab === "ssr-preview" ? "active" : ""}`}
            onClick={() => setActiveTab("ssr-preview")}
          >
            📄 Live SSR HTML Output
          </button>
        </div>

        {activeTab === "controls" ? (
          <div className="panel-content-scroll">
            {/* Quick URL Selectors */}
            <div className="section-block">
              <label className="section-label">Select a Route to Pass as `location`:</label>
              <div className="url-button-grid">
                {presetUrls.map((item) => {
                  const isActive = currentUrl === item.url;
                  return (
                    <button
                      key={item.url}
                      className={`selector-card-btn ${isActive ? "active" : ""}`}
                      onClick={() => setCurrentUrl(item.url)}
                    >
                      <div className="btn-top-row">
                        <strong className="btn-name">{item.label}</strong>
                        <span className="btn-path">{item.url}</span>
                      </div>
                      <span className="btn-desc">{item.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="section-block">
              <label className="section-label">Or Type Any Custom URL Location:</label>
              <form onSubmit={handleCustomSubmit} className="custom-url-form">
                <input
                  type="text"
                  placeholder="e.g. /products/999 or /about"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="custom-url-input"
                />
                <button type="submit" className="custom-url-submit">
                  Set Prop
                </button>
              </form>
            </div>

            {/* Educational Concept Box */}
            <div className="concept-box">
              <h4>💡 How StaticRouter Works:</h4>
              <ul>
                <li><strong>No Browser Window:</strong> Perfect for Node.js servers, unit tests, and static generators.</li>
                <li><strong>Stateless:</strong> Never alters the URL itself; renders matching components strictly for the supplied <code>location</code> string.</li>
                <li><strong>useParams() Support:</strong> When given <code>"/products/101"</code>, it extracts <code>id: "101"</code> on the server!</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="panel-content-scroll">
            <div className="section-block">
              <label className="section-label">
                Generated Static HTML for <code>location="{currentUrl}"</code>:
              </label>
              <pre className="html-preview-code">
                {currentSsrHtml}
              </pre>
            </div>
          </div>
        )}

        <div className="panel-footer">
          <span>Active Location: <strong>{currentUrl}</strong></span>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT SIDE: Rendered React Store App
          ========================================================================= */}
      <main className="right-panel">
        <div className="app-viewport-header">
          <div className="browser-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="browser-address-bar">
            <span className="address-lock">🔒</span>
            <span className="address-domain">static-store.internal</span>
            <span className="address-path">{currentUrl}</span>
          </div>
          <div className="rendered-tag">
            <span>Rendered with StaticRouter</span>
          </div>
        </div>

        {/* The rendered React application wrapped inside StaticRouter */}
        <div className="app-viewport-content">
          <StaticRouter location={currentUrl}>
            <App />
          </StaticRouter>
        </div>
      </main>
    </div>
  );
}

// Mount the React Application to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StaticRouterSplitScreenRunner />
  </React.StrictMode>
);
