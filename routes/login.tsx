import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";
import { setSession, setSessionIdCookie } from "../lib/session.ts";

interface Data {
  error: string | undefined;
}

export const handler: Handlers<Data> = {
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const password = formData.get("password");

    if (password === Deno.env.get("ADMIN_PASSWORD")) {
      const returnPath = new URL(req.url).searchParams.get("r");
      const headers = new Headers({ "Location": returnPath ?? "/" });
      const sessionId = setSessionIdCookie(headers);

      const kv = await Deno.openKv();
      await setSession(kv, sessionId, {});

      return new Response("", { status: 307, headers });
    } else {
      return ctx.render({ error: "Invalid password" });
    }
  },
};

export default function Home({ data }: PageProps<Data | undefined>) {
  const { error } = data ?? {};

  return (
    <div class="p-8 flex flex-col gap-4">
      <form action="/login" method="post">
        <div class="flex flex-col items-start gap-4">
          <input
            type="password"
            name="password"
            class="text-2xl border-2 rounded-md"
          />
          <Button type="submit">Log in</Button>
        </div>
      </form>
      {error ? <p class="px-1 text-red-500">{error}</p> : null}
    </div>
  );
}
