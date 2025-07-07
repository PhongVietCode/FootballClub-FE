import { api } from "."
import type { AppResponse } from "@/types/response"
import type { MemberProfile } from "@/types/member"

const memberAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createMember: builder.mutation<
      AppResponse<MemberProfile>,
      { elo: number; name: string; organizationId: string }
    >({
      query: (data) => ({
        url: "/members",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Member"],
    }),
    getListMember: builder.query<
      AppResponse<MemberProfile[]>,
      { organizationId?: string; name?: string }
    >({
      query: (data) => ({
        url: "/members",
        params: data,
      }),
    }),
  }),
})
export const { useCreateMemberMutation, useGetListMemberQuery, useLazyGetListMemberQuery } = memberAPI
