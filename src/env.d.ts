/// <reference types="astro/client" />

import type { KVNamespace } from "@cloudflare/workers-types"

interface Env {
  REDIRECTIONS: KVNamespace
  AUTH_SECRET: string
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare global {
  namespace App {
    interface Locals extends Runtime {}
  }
}
