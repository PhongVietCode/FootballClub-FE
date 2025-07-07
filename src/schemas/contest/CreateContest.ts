import { z } from "zod"
export const createContestSchema = z.object({
  teamCount: z.string(),
  orgId: z.string().max(255, { message: "length is not valid" }),
  addressId: z.string().max(255, { message: "length is not valid" }),
  dateTime: z.string(),
})
export type CreateContestSchema = z.infer<typeof createContestSchema>
