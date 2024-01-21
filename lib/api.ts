import type { Commands, Payload, Result } from "../routes/api/command.ts";

export type { Commands, Payload, Result } from "../routes/api/command.ts";

export async function runCommand(
  name: Commands,
  payload?: Payload,
): Promise<Result> {
  const resp = await fetch("/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, payload }),
  });

  return await resp.json();
}
