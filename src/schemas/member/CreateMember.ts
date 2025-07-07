import { z } from "zod"
export const createMemberSchema = z.object({
  elo: z
    .string(),
  name: z.string().max(255, { message: "length is not valid" }),
})
export type CreateMemberSchema = z.infer<typeof createMemberSchema>
