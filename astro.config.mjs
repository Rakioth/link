import cloudflare from "@astrojs/cloudflare"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

export default defineConfig({
	site: "https://link.raks.dev",
	output: "hybrid",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	integrations: [tailwind()],
	compressHTML: true,
	vite: {
		build: {
			cssMinify: "lightningcss",
		},
	},
	build: {
		inlineStylesheets: "always",
	},
	devToolbar: {
		enabled: false,
	},
})
