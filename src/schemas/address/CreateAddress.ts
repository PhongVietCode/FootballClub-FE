import { z } from "zod"
export const createAddressSchema = z.object({
  address: z.string().max(255, { message: "length is not valid" }),
  name: z.string().max(255, { message: "length is not valid" }),
  orgId: z.string().max(255, { message: "length is not valid" }),
})
export type CreateAddressSchema = z.infer<typeof createAddressSchema>
