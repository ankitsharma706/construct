import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://*.google.com https://*.googleapis.com https://*.googlesyndication.com https://fundingchoicesmessages.google.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://www.google-analytics.com https://*.googlesyndication.com https://fundingchoicesmessages.google.com wss://*.firebaseio.com; frame-src 'self' https://*.google.com https://*.firebaseapp.com https://accounts.google.com https://*.googlesyndication.com; media-src 'self' https: blob:;"
    );
    next();
  });

  // Serve ads.txt explicitly with text/plain charset=utf-8
  app.get("/ads.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    const pubPath = path.join(process.cwd(), "public", "ads.txt");
    const distPath = path.join(process.cwd(), "dist", "ads.txt");
    if (fs.existsSync(pubPath)) {
      return res.sendFile(pubPath);
    } else if (fs.existsSync(distPath)) {
      return res.sendFile(distPath);
    }
    const publisherId = (process.env.VITE_ADSENSE_PUBLISHER_ID || "ca-pub-4318712038607459").replace(/^ca-/, "");
    return res.status(200).send(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`);
  });

  // Serve robots.txt explicitly
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const pubPath = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(pubPath)) {
      return res.sendFile(pubPath);
    }
    return res.status(200).send("User-agent: Mediapartners-Google\nAllow: /\n\nUser-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nDisallow: /api/\n");
  });

  // Serve sitemap.xml explicitly
  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    const pubPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(pubPath)) {
      return res.sendFile(pubPath);
    }
    return res.status(404).send("<error>Sitemap not found</error>");
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "CONSTRUCT API is healthy" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.get(["/admin", "/login"], (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.status(404).sendFile(path.join(distPath, "404.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is in use, trying ${Number(PORT) + 1}...`);
      process.env.PORT = (Number(PORT) + 1).toString();
      startServer();
    } else {
      console.error(err);
    }
  });
}

startServer();
