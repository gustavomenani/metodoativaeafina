import type { APIRoute } from "astro";
import {
  adminAuthConfigured,
  setAdminSessionCookie,
  validateCredentials,
} from "../../../lib/admin-auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!adminAuthConfigured()) {
    return new Response(
      JSON.stringify({
        error:
          "Credenciais do admin não configuradas. Defina ADMIN_USERNAME, ADMIN_PASSWORD e ADMIN_SESSION_SECRET no .env / Vercel.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (!validateCredentials(username, password)) {
    return new Response(JSON.stringify({ error: "Usuário ou senha incorretos." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  setAdminSessionCookie(cookies);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
