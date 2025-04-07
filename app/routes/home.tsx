import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { env } from "cloudflare:workers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  let value = await env.MY_KV.get("key");

  if (!value) {
    await env.MY_KV.put("key", "booger");
    value = "fallback";
  }

  return { value };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome value={loaderData.value} />;
}
