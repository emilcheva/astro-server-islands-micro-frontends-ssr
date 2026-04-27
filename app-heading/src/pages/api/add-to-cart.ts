import type { APIRoute } from "astro";

let cartCount = 0;

export const POST: APIRoute = () => {
  cartCount++;
  return new Response(JSON.stringify({ count: cartCount }), {
    headers: { "Content-Type": "application/json" },
  });
};
