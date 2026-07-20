import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import type { AstroCookies } from "astro";

const COOKIE_NAME = "aaf_admin_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 horas

function getEnv(name: string): string {
  const value = import.meta.env[name] ?? process.env[name];
  return typeof value === "string" ? value : "";
}

export function getAdminCredentials() {
  return {
    username: getEnv("ADMIN_USERNAME"),
    password: getEnv("ADMIN_PASSWORD"),
    secret: getEnv("ADMIN_SESSION_SECRET"),
  };
}

export function adminAuthConfigured(): boolean {
  const { username, password, secret } = getAdminCredentials();
  return Boolean(username && password && secret && secret.length >= 16);
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Ainda compara com lixo do mesmo tamanho para reduzir timing leak óbvio
    const dummy = Buffer.alloc(bufA.length);
    timingSafeEqual(bufA, dummy);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function validateCredentials(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  if (!adminAuthConfigured()) return false;
  return (
    safeEqual(username.trim(), creds.username) &&
    safeEqual(password, creds.password)
  );
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const { username, secret } = getAdminCredentials();
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const nonce = randomBytes(8).toString("hex");
  const payload = Buffer.from(
    JSON.stringify({ u: username, exp, n: nonce }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !adminAuthConfigured()) return false;
  const { username, secret } = getAdminCredentials();
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload, secret);
  if (!safeEqual(sig, expected)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { u?: string; exp?: number };
    if (!data.u || !data.exp) return false;
    if (data.exp < Date.now()) return false;
    return safeEqual(data.u, username);
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(cookies: AstroCookies): boolean {
  return verifySessionToken(cookies.get(COOKIE_NAME)?.value);
}

export function setAdminSessionCookie(cookies: AstroCookies): void {
  cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export function clearAdminSessionCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: "/" });
}

export { COOKIE_NAME };
