import React from "react";
import ReactDOMServer from "react-dom/server";
// IMPORTANT: Import StaticRouter from "react-router-dom/server"
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

/**
 * ============================================================================
 * SERVER-SIDE RENDERING (SSR) ENTRY POINT USING STATICROUTER
 * ============================================================================
 * 
 * 1. What is StaticRouter?
 *    StaticRouter is a router provided by React Router specifically for server-side
 *    environments (like Node.js / Express) or automated tests where there is no
 *    browser window, no URL address bar, and no DOM history stack.
 * 
 * 2. Why do we use StaticRouter?
 *    In standard React apps on the client, BrowserRouter listens to browser navigation
 *    events. But on a server, each HTTP request is independent and stateless.
 *    StaticRouter renders the React tree once for a single requested location without
 *    needing any browser APIs.
 * 
 * 3. What does the `location` prop do?
 *    The `location` prop tells StaticRouter which URL path to render.
 *    - If location = "/", it renders the Home component.
 *    - If location = "/products", it renders the Products component.
 *    - If location = "/products/101", it matches "/products/:id" and renders ProductDetails with id="101".
 *    - If location = "/about", it renders the About component.
 * 
 * @param {string} url - The incoming request URL path (e.g., "/", "/products", "/products/101")
 * @returns {string} - The fully rendered HTML string
 */
export function renderApp(url = "/") {
  // Render the App component wrapped inside StaticRouter to an HTML string
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return html;
}

/**
 * Helper function to generate a complete HTML page with CSS styles
 * ready to be returned by an HTTP server.
 * 
 * @param {string} url - The URL to render
 * @param {string} customCss - Optional inline CSS string
 * @returns {string} - Full HTML document markup
 */
export function renderFullPage(url = "/", customCss = "") {
  const content = renderApp(url);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StaticRouter Demo • ${url}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  ${customCss ? `<style>${customCss}</style>` : ''}
</head>
<body>
  <!-- Server Rendered by StaticRouter with location="${url}" -->
  <div id="root">${content}</div>
</body>
</html>`;
}

export default renderApp;
