import { z } from "zod/v4"
export const createOrgSchema = z.object({
  name: z.string().nonempty().max(255, { message: "length is not valid" }),
  logoUrl: z.string().max(255, { message: "length is not valid" }).optional(),

})
export type CreateOrgSchema = z.infer<typeof createOrgSchema>
