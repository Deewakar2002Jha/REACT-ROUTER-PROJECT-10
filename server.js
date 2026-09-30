import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Create Vite server in SSR mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom"
  });

  // Use Vite's middlewares for module transformation
  app.use(vite.middlewares);

  // Read CSS file to inline into server-rendered pages
  const cssPath = path.resolve(__dirname, "src/index.css");
  const cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf-8") : "";

  // Handle all incoming HTTP GET requests
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Load the server entry module dynamically via Vite SSR
      const { renderFullPage } = await vite.ssrLoadModule("/src/server.jsx");

      // 2. Render the full HTML using StaticRouter with location={url}
      const html = renderFullPage(url, cssContent);

      // 3. Send the server-rendered HTML response with status 200
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      // If an error occurs, let Vite fix the stacktrace and pass to next middleware
      vite.ssrFixStacktrace(error);
      console.error("SSR Rendering Error:", error);
      res.status(500).end(error.message);
    }
  });

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 StaticRouter SSR Server is running at: http://localhost:${PORT}`);
    console.log(`Try opening in your browser:`);
    console.log(`  - Home:            http://localhost:${PORT}/`);
    console.log(`  - Products:        http://localhost:${PORT}/products`);
    console.log(`  - Product Details: http://localhost:${PORT}/products/101`);
    console.log(`  - About:           http://localhost:${PORT}/about`);
    console.log(`======================================================\n`);
  });
}

startServer();
