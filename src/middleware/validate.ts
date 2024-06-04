import { defineMiddleware } from "astro:middleware"

export const validate = defineMiddleware((context, next) => {
	if (context.request.method === "GET" || context.request.method === "DELETE") {
		return next()
	}

	const destination = context.request.headers.get("X-Destination")

	if (!destination) {
		return new Response("Missing Destination URL", { status: 400 })
	}

	try {
		void new URL(destination)
	} catch {
		return new Response("Invalid Destination URL", { status: 400 })
	}

	return next()
})
