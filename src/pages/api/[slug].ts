import type { APIRoute } from "astro"

export const prerender = false

export const POST: APIRoute = async ({ locals, params, request }) => {
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 400, statusText: "Bad Request" })
  }

  const { REDIRECTIONS } = locals.runtime.env

  try {
    if (await REDIRECTIONS.get(slug)) {
      return new Response(null, { status: 409, statusText: "Conflict" })
    }

    const destination = request.headers.get("X-Destination")!
    await REDIRECTIONS.put(slug, destination)
  } catch {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }

  return new Response(null, { status: 201, statusText: "Created" })
}

export const PUT: APIRoute = async ({ locals, params, request }) => {
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 400, statusText: "Bad Request" })
  }

  const { REDIRECTIONS } = locals.runtime.env

  try {
    if (!(await REDIRECTIONS.get(slug))) {
      return new Response(null, { status: 404, statusText: "Not Found" })
    }

    const destination = request.headers.get("X-Destination")!
    await REDIRECTIONS.put(slug, destination)
  } catch {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }

  return new Response(null, { status: 200, statusText: "OK" })
}

export const DELETE: APIRoute = async ({ locals, params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 400, statusText: "Bad Request" })
  }

  const { REDIRECTIONS } = locals.runtime.env

  try {
    if (!(await REDIRECTIONS.get(slug))) {
      return new Response(null, { status: 404, statusText: "Not Found" })
    }

    await REDIRECTIONS.delete(slug)
  } catch {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }

  return new Response(null, { status: 204, statusText: "No Content" })
}
