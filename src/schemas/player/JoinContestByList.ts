import { z } from "zod/v4"
export const joinContestByListSchema = z.object({
  memberIds: z.array(z.string()),
  contestId: z.string().max(255, { message: "length is not valid" }),
  orgId: z.string().max(255, { message: "length is not valid" }),
})
export type JoinContestByListSchema = z.infer<typeof joinContestByListSchema>
