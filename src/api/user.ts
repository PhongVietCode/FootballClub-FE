import type { User, UserProfile } from "@/types/user"
import { api } from "."
import type { UserCreateSchema } from "@/schemas/user/UserCreateSchema"
import type { AppResponse } from "@/types/response"

const userAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createUser: builder.mutation<AppResponse<User>, UserCreateSchema>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query<AppResponse<UserProfile>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
})
export const { useCreateUserMutation, useGetProfileQuery } = userAPI
