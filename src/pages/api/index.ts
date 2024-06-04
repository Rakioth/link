import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ locals }) => {
	const { REDIRECTIONS } = locals.runtime.env

	try {
		const redirections = await REDIRECTIONS.list()
		const keys = redirections.keys.map((key) => key.name)

		return new Response(JSON.stringify(keys), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch {
		return new Response(null, { status: 500, statusText: "Internal Server Error" })
	}
}
