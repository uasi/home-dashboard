import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "$std/http/cookie.ts";

export type Session = Record<string, unknown>;

export function getSessionId(headers: Headers) {
  return getCookies(headers)["_sid"];
}

export function setSessionIdCookie(
  headers: Headers,
  sessionId: string = crypto.randomUUID(),
) {
  const cookie = {
    name: "_sid",
    value: sessionId,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    sameSite: "Lax",
  } satisfies Cookie;

  setCookie(headers, cookie);

  return sessionId;
}

export async function getSession(kv: Deno.Kv, sessionId: string) {
  return await kv.get<Session>(["sessions", sessionId]);
}

export async function setSession(
  kv: Deno.Kv,
  sessionId: string,
  session: Session,
) {
  return await kv.set(["sessions", sessionId], session, {
    expireIn: 1000 * 60 * 60 * 24 * 7,
  });
}

export function redirectToLogin(returnPath: string) {
  const params = new URLSearchParams({ r: returnPath });
  const headers = new Headers({ "Location": `/login?${params}` });

  deleteCookie(headers, "_sid");

  return new Response("", { status: 307, headers });
}
