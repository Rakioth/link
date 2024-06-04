import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ locals, params, redirect }) => {
	const { slug } = params

	if (!slug) {
		return new Response(null, { status: 400, statusText: "Bad Request" })
	}

	const { REDIRECTIONS } = locals.runtime.env

	try {
		const redirection = await REDIRECTIONS.get(slug)

		if (!redirection) {
			return redirect("/404")
		}
		return redirect(redirection, 302)
	} catch {
		return new Response(null, { status: 500, statusText: "Internal Server Error" })
	}
}
