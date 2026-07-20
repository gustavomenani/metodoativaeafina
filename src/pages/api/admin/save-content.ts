import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { isAdminAuthenticated } from "../../../lib/admin-auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: "Não autenticado." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Em produção (Vercel) o filesystem é somente leitura — salvamento só no dev local.
  if (!import.meta.env.DEV) {
    return new Response(
      JSON.stringify({
        error:
          "Em produção o salvamento de arquivo não está disponível. Edite localmente com npm run dev e faça deploy, ou altere src/data/content.json no repositório.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("site" in body) ||
    !("hero" in body)
  ) {
    return new Response(
      JSON.stringify({ error: "JSON inválido: faltam seções obrigatórias." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Nunca persistir senha antiga embutida no JSON de conteúdo
  const data = { ...(body as Record<string, unknown>) };
  delete data.admin;

  try {
    const contentPath = path.join(process.cwd(), "src", "data", "content.json");
    fs.writeFileSync(contentPath, JSON.stringify(data, null, 2) + "\n", "utf8");
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Erro ao gravar content.json",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
