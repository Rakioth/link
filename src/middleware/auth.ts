import { defineMiddleware } from "astro:middleware"

export const auth = defineMiddleware((context, next) => {
  if (context.request.method === "GET") {
    return next()
  }

  const secret = context.request.headers.get("Authorization")

  if (!secret) {
    return new Response("Missing Auth Code", { status: 401 })
  }

  if (secret !== context.locals.runtime.env.AUTH_SECRET) {
    return new Response("Invalid Auth Code", { status: 401 })
  }

  return next()
})
