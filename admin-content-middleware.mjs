/**
 * Middleware de dev: grava src/data/content.json a partir do painel /admin.
 * Só ativo com `astro dev` / `npm run dev`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = path.join(__dirname, "src", "data", "content.json");

export function adminContentMiddleware() {
  return {
    name: "admin-content-middleware",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url !== "/api/admin/save-content" || req.method !== "POST") {
          return next();
        }

        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => {
          try {
            const raw = Buffer.concat(chunks).toString("utf8");
            const body = JSON.parse(raw);

            if (!body || typeof body !== "object" || !body.site || !body.hero) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "JSON inválido: faltam seções obrigatórias." }));
              return;
            }

            fs.writeFileSync(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n", "utf8");

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : "Erro ao gravar content.json",
              }),
            );
          }
        });
      });
    },
  };
}
