import { api } from "."
import type { AppResponse } from "@/types/response"
import type { Address } from "@/types/address"
import type { CreateAddressSchema } from "@/schemas/address/CreateAddress"

const addressAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createAddress: builder.mutation<AppResponse<Address>, CreateAddressSchema>({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
})
export const { useCreateAddressMutation } = addressAPI
