import { api } from "."
import type { AppResponse } from "@/types/response"
import type { CreateOrgSchema } from "@/schemas/org/CreateOrg"
import type { OrgDetail, OrgProfile } from "@/types/org"

const orgAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createOrg: builder.mutation<AppResponse<OrgProfile>, CreateOrgSchema>({
      query: (data) => ({
        url: "/organizations",
        method: "POST",
        body: data,
      }),
    }),
    getOrgDetail: builder.query<AppResponse<OrgDetail>, { id: string }>({
      query: (data) => ({
        url: `/organizations/${data.id}`,
        method: "GET",
      }),
      providesTags: ["Member", "Address"],
    })
  }),
})
export const {
  useCreateOrgMutation,
  useGetOrgDetailQuery,
  useLazyGetOrgDetailQuery,
} = orgAPI
