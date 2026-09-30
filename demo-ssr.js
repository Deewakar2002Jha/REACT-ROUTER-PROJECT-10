import { createServer as createViteServer } from "vite";

/**
 * CLI Demonstration Script for StaticRouter
 * 
 * Runs without a web browser to demonstrate how StaticRouter
 * synchronously renders React components to static HTML strings
 * on a Node.js server.
 */
async function runDemo() {
  console.log("================================================================");
  console.log("   REACT ROUTER: STATICROUTER SERVER-SIDE DEMO");
  console.log("================================================================\n");

  // Create Vite SSR loader instance
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom"
  });

  const { renderApp } = await vite.ssrLoadModule("/src/server.jsx");

  const testRoutes = [
    { name: "Home Route", url: "/" },
    { name: "Products Route", url: "/products" },
    { name: "Product Details (Laptop)", url: "/products/101" },
    { name: "Product Details (Mobile)", url: "/products/102" },
    { name: "About Route", url: "/about" },
  ];

  for (const route of testRoutes) {
    console.log(`----------------------------------------------------------------`);
    console.log(`📌 Rendering route: "${route.url}" (${route.name})`);
    console.log(`   Executing: <StaticRouter location="${route.url}"><App /></StaticRouter>`);
    console.log(`----------------------------------------------------------------`);

    const html = renderApp(route.url);

    // Extract key headings and rendered text to show what got matched
    const headingMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const heading = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '') : "No <h1> found";
    
    console.log(`   ✅ Matched Page Header: "${heading}"`);
    if (route.url.startsWith("/products/")) {
      const idBadge = html.match(/Product ID:\s*(?:<!-- -->)?\s*([^<]+)/i);
      console.log(`   ✅ Dynamic param parsed: Product ID = ${idBadge ? idBadge[1].trim() : "N/A"}`);
    }
    console.log(`   📄 Rendered HTML preview (first 180 chars):\n   ${html.slice(0, 180)}...\n`);
  }

  console.log("================================================================");
  console.log("🎉 StaticRouter demonstration completed successfully!");
  console.log("================================================================\n");

  await vite.close();
  process.exit(0);
}

runDemo().catch((err) => {
  console.error("Demo failed with error:", err);
  process.exit(1);
});
