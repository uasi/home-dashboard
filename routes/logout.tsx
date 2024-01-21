import { Handlers, PageProps } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { Button } from "../components/Button.tsx";
import {
  getSessionId,
  setSession,
  setSessionIdCookie,
} from "../lib/session.ts";

interface Data {
  error: string | undefined;
}

export const handler: Handlers<Data> = {
  POST: async (req, ctx) => {
    const sessionId = getSessionId(req.headers);
    const headers = new Headers({ "Location": "/" });

    if (sessionId) {
      deleteCookie(headers, "_sid");

      const kv = await Deno.openKv();
      kv.delete(["session", sessionId]);
    }

    return new Response("Logging out...", { status: 307, headers });
  },
};

export default function Home({ data }: PageProps<Data | undefined>) {
  const { error } = data ?? {};

  return (
    <div class="p-8 flex flex-col gap-4">
      <form action="/logout" method="post">
        <Button type="submit">Log out</Button>
      </form>
      {error ? <p class="px-1 text-red-500">{error}</p> : null}
    </div>
  );
}
