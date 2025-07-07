import { z } from "zod/v4"
export const userCreateSchema = z.object({
  fullName: z
    .string()
    .nonempty()
    .max(255, { message: "length is not valid" }),
  password: z
    .string()
    .nonempty()
    .max(255, { message: "length is not valid" }),
})
export type UserCreateSchema = z.infer<typeof userCreateSchema>
