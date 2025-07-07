import { z } from "zod/v4"
export const loginSchema = z.object({
  userName: z
    .string()
    .nonempty()
    .max(255, { message: "length is not valid" }),
  password: z
    .string()
    .nonempty()
    .max(255, { message: "length is not valid" }),
})
export type LoginSchema = z.infer<typeof loginSchema>
