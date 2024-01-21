import { FreshContext } from "$fresh/server.ts";
import {
  getSession,
  getSessionId,
  redirectToLogin,
  setSession,
  setSessionIdCookie,
} from "../lib/session.ts";

const AUTHORIZED_PATHS = ["/", "/api/command"];

interface State {
  session: Record<string, unknown>;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const url = new URL(req.url);

  if (!AUTHORIZED_PATHS.includes(url.pathname)) {
    return await ctx.next();
  }

  const sessionId = getSessionId(req.headers);

  if (!sessionId) {
    return req.method === "GET" ? redirectToLogin("/") : badRequest();
  }

  const kv = await Deno.openKv();
  const session = await getSession(kv, sessionId);

  if (!session) {
    return req.method === "GET" ? redirectToLogin("/") : badRequest();
  }

  await setSession(kv, sessionId, session);
  ctx.state.session = session;

  const resp = await ctx.next();

  setSessionIdCookie(resp.headers, sessionId);

  return resp;
}

function badRequest() {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
  });
}
