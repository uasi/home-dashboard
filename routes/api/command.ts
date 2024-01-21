import { Handlers } from "$fresh/server.ts";
import { $ } from "https://deno.land/x/dax@0.36.0/mod.ts";

export type Commands = "hello" | "forgetBackups";
export type Payload = Record<string, unknown>;
export type Result = { result: string };

const commands: Record<Commands, (payload?: Payload) => Promise<Result>> = {
  async hello() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { result: "hello" };
  },

  async forgetBackups() {
    const result =
      await $`restic-driver --rot-key=restic forget home-notes home-unsecured-images`
        .text();
    return { result };
  },
};

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = await req.json() as { name: Commands; payload?: Payload };

    if (data && "name" in data && commands[data.name]) {
      const result = await commands[data.name](data["payload"] ?? {});
      return new Response(JSON.stringify(result));
    }

    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
    });
  },
};
