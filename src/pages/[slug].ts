import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ locals, params, redirect, url }) => {
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 400, statusText: "Bad Request" })
  }

  const { REDIRECTIONS } = locals.runtime.env

  try {
    const redirection = await REDIRECTIONS.get(slug)

    if (!redirection) {
      const error = await fetch(`${url}/404`)
      return new Response(error.body, {
        headers: error.headers,
        status: 404,
        statusText: "Not Found",
      })
    }
    return redirect(redirection, 302)
  } catch {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}
