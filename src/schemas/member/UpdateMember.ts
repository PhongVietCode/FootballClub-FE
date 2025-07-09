import { z } from "zod"
export const updateMemberSchema = z.object({
  elo: z.string(),
  name: z.string().max(255, { message: "length is not valid" }),
})
export type UpdateMemberSchema = z.infer<typeof updateMemberSchema>
