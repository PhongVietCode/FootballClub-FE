import type { LoginSchema } from "@/schemas/user/LoginSchema"
import { api } from "."
import type { AppResponse } from "@/types/response"

const authAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<AppResponse<{ token: string }>, LoginSchema>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
})
export const { useLoginMutation } = authAPI
