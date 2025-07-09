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
      { organizationId?: string; name?: string; contestId?: string }
    >({
      query: (data) => ({
        url: "/members",
        method: "GET",
        params: data,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "Member" as const,
                id,
              })),
              "Member",
            ]
          : ["Member"],
    }),
    updateMember: builder.mutation<
      AppResponse<MemberProfile>,
      {
        memberId: string
      } & { updateSchema: { elo: number; name: string } }
    >({
      query: (data) => ({
        url: `/members/${data.memberId}`,
        method: "PATCH",
        body: {
          ...data.updateSchema,
        },
      }),
      invalidatesTags: (result) => [
        {
          type: "Member" as const,
          id: result?.result.id,
        },
      ],
    }),
    deleteMember: builder.mutation<AppResponse<string>, { memberId: string }>({
      query: (data) => ({
        url: `/members/${data.memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["Member"],
    }),
  }),
})
export const {
  useCreateMemberMutation,
  useGetListMemberQuery,
  useLazyGetListMemberQuery,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberAPI
