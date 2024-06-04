import { sequence } from "astro:middleware"

import { auth } from "@/middleware/auth"
import { validate } from "@/middleware/validate"

export const onRequest = sequence(auth, validate)
