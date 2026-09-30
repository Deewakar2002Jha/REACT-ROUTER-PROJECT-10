# 🛍️ React Router StaticRouter Demonstration Project

A simple, clean, and beginner-friendly educational React project designed to demonstrate and understand **`StaticRouter`** from `react-router-dom/server`.

---

## 🖥️ Side-by-Side Split Screen Interface

When running the interactive demo (`npm run dev`), the entire experience is presented in a **side-by-side split screen**:

* **Left Side (StaticRouter Controller & Inspector):**
  * Shows the active `<StaticRouter location="...">` code block updating in real time.
  * Allows one-click switching across all routes (`/`, `/products`, `/products/101`, `/products/102`, `/products/103`, `/about`, 404 test).
  * Has an input field for custom URL paths.
  * Includes a **Live SSR HTML Output** tab showing the exact static HTML string generated on the server.
  * Displays beginner-friendly explanations of how `StaticRouter` and `location` work.

* **Right Side (Rendered React Store App):**
  * Displays the live React Store application rendered through `<StaticRouter location={currentUrl}>`.
  * Features the store Navbar, Products Grid, dynamic Product Details with `useParams()`, and About page.

---

## 📖 Table of Contents
1. [What is StaticRouter?](#1-what-is-staticrouter)
2. [Why do we use StaticRouter?](#2-why-do-we-use-staticrouter)
3. [When should we use StaticRouter?](#3-when-should-we-use-staticrouter)
4. [Basic Syntax & Example](#4-basic-syntax--example)
5. [Difference between BrowserRouter and StaticRouter](#5-difference-between-browserrouter-and-staticrouter)
6. [How this Project Demonstrates StaticRouter](#6-how-this-project-demonstrates-staticrouter)
7. [Project Structure](#7-project-structure)
8. [Routes Overview](#8-routes-overview)
9. [How to Run the Project](#9-how-to-run-the-project)

---

## 1. What is StaticRouter?

`StaticRouter` is a router provided by React Router in the package `react-router-dom/server`. 

Unlike a regular browser router, `StaticRouter` **does not read the browser URL bar** and **never changes the URL on its own**. Instead, it is given a static URL string via its `location` prop and renders the matching route once.

```jsx
import { StaticRouter } from "react-router-dom/server";
```

---

## 2. Why do we use StaticRouter?

In browser environments, `BrowserRouter` listens to the browser's `window.history` and responds to back/forward buttons or user interactions. 

However, on a **Node.js server** (Server-Side Rendering / SSR):
* There is **no browser window** (`window` is `undefined`).
* There is **no address bar or history stack**.
* Each user request arrives as an incoming URL string (like `/products/101`).

`StaticRouter` provides the routing context needed by `<Routes>`, `<Route>`, `<Link>`, and hooks like `useParams()` without needing any browser APIs.

---

## 3. When should we use StaticRouter?

You should use `StaticRouter` in the following scenarios:
1. **Server-Side Rendering (SSR)**: When rendering React to an HTML string inside Node.js/Express, Fastify, AWS Lambda, or Cloudflare Workers.
2. **Static Site Generation (SSG)**: When pre-rendering static HTML pages during build time.
3. **Automated Unit & Integration Testing**: When testing React components wrapped in routes in headless test runners (like Jest, Vitest) without launching a full browser.

---

## 4. Basic Syntax & Example

```jsx
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

// 1. Receive a URL from an HTTP request
const url = "/products";

// 2. Pass the URL into StaticRouter's location prop
const html = ReactDOMServer.renderToString(
  <StaticRouter location={url}>
    <App />
  </StaticRouter>
);

console.log(html);
```

---

## 5. Difference between BrowserRouter and StaticRouter

| Feature | `BrowserRouter` | `StaticRouter` |
| :--- | :--- | :--- |
| **Package** | `react-router-dom` | `react-router-dom/server` |
| **Environment** | Client / Web Browser | Server (Node.js) / Headless Tests |
| **URL Source** | Browser address bar (`window.location`) | Explicit `location` prop passed in code |
| **State** | Stateful (URL changes on link click) | Stateless (fixed for one render pass) |
| **Primary Use Case** | Single Page Applications (SPA) | Server-Side Rendering (SSR) & Static HTML generation |

---

## 6. How this Project Demonstrates StaticRouter

This project provides multiple ways to see `StaticRouter` in action:

1. **Interactive Split-Screen UI (`npm run dev`)**:
   Shows the controller and inspector on the left and the rendered `<StaticRouter location={currentUrl}>` store app on the right on the same screen.

2. **Server-side Rendering Entry (`src/server.jsx`)**:
   Contains the `renderApp(url)` function that wraps `<App />` in `<StaticRouter location={url}>` and outputs static HTML using `ReactDOMServer.renderToString()`.

3. **Live SSR Express Server (`npm run server`)**:
   An actual Node.js HTTP server. When you visit `http://localhost:3000/products/101` in your browser, the Express server executes `StaticRouter` and sends the server-rendered HTML.

4. **Terminal CLI Demo (`npm run demo`)**:
   A quick CLI script that renders all routes through `StaticRouter` and prints the output to your terminal.

---

## 7. Project Structure

```text
src/
├── components/
│   └── Navbar.jsx           # Top navigation bar with store links
├── pages/
│   ├── Home.jsx             # Welcome page (Route: "/")
│   ├── Products.jsx         # Product catalog with 3 items (Route: "/products")
│   ├── ProductDetails.jsx   # Dynamic details using useParams() (Route: "/products/:id")
│   └── About.jsx            # About page explaining StaticRouter (Route: "/about")
├── App.jsx                  # Main routes configuration (<Routes> and <Route>)
├── main.jsx                 # Split-screen UI passing location prop to StaticRouter
├── server.jsx               # Server SSR entry using StaticRouter & renderToString
└── index.css                # Split-screen styles & store styling
├── server.js                # Express SSR server
├── demo-ssr.js              # Standalone Node.js CLI test script
├── index.html               # HTML template
├── package.json             # Project dependencies and scripts
└── vite.config.js           # Vite configuration
```

---

## 8. Routes Overview

| Route | Component | Description | Example URL |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Welcome page with intro & links | `http://localhost:3000/` |
| `/products` | `Products` | Catalog showing Laptop, Mobile, Headphones | `http://localhost:3000/products` |
| `/products/:id` | `ProductDetails` | Dynamic route showing Product ID with `useParams()` | `http://localhost:3000/products/101` |
| `/about` | `About` | Information about this store & StaticRouter | `http://localhost:3000/about` |

---

## 9. How to Run the Project

### Option A: Side-by-Side Split Screen Demo (Recommended)
```bash
npm run dev
```
Open **http://localhost:5173** in your browser to see both the controller (left) and the store app (right) simultaneously!

---

### Option B: Real Server-Side Rendering (SSR Express Server)
```bash
npm run server
```
Open in your browser:
* **Home**: [http://localhost:3000/](http://localhost:3000/)
* **Products**: [http://localhost:3000/products](http://localhost:3000/products)
* **Product Details (Laptop)**: [http://localhost:3000/products/101](http://localhost:3000/products/101)
* **Product Details (Mobile)**: [http://localhost:3000/products/102](http://localhost:3000/products/102)
* **About**: [http://localhost:3000/about](http://localhost:3000/about)

---

### Option C: Terminal CLI Demo
```bash
npm run demo
```
