import { api } from "."
import type { AppResponse } from "@/types/response"
import type {
  Contest,
  TeamSplitResponse,
  TeamUpdateRequest,
} from "@/types/contest"
import type { CreateContestSchema } from "@/schemas/contest/CreateContest"

const contestAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createContest: builder.mutation<
      AppResponse<Contest>,
      { memberId: string } & { data: CreateContestSchema }
    >({
      query: (data) => ({
        url: "/contests",
        method: "POST",
        body: {
          memberId: data.memberId,
          ...data.data,
        },
      }),
      invalidatesTags: ["Contest"],
    }),
    updateContest: builder.mutation<
      AppResponse<Contest>,
      { teamSplitted: TeamUpdateRequest[]; id: string }
    >({
      query: (data) => ({
        url: `/contests/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => [
        {
          type: "Contest" as const,
          id: result?.result.id,
        },
      ],
    }),
    getContestList: builder.query<AppResponse<Contest[]>, { id: string }>({
      query: (data) => ({
        url: "/contests/list",
        method: "GET",
        params: {
          orgId: data.id,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "Contest" as const,
                id,
              })),
              "Contest",
              {
                type: "Contest" as const,
                id: "LIST",
              },
            ]
          : ["Contest"],
    }),
    getContestDetail: builder.query<AppResponse<Contest>, { id: string }>({
      query: (data) => ({
        url: `/contests/${data.id}`,
        method: "GET",
      }),
      providesTags(result) {
        return [{ type: "Contest", id: result?.result.id }]
      },
    }),
    splitTeam: builder.query<AppResponse<TeamSplitResponse[]>, { id: string }>({
      query: (data) => ({
        url: `/contests/${data.id}/teams`,
        method: "GET",
      }),
    }),
    deleteContest: builder.mutation<AppResponse<string>, { contestId: string }>(
      {
        query: (data) => ({
          url: `/contests/${data.contestId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Contest"],
      }
    ),
  }),
})
export const {
  useCreateContestMutation,
  useGetContestListQuery,
  useLazyGetContestListQuery,
  useGetContestDetailQuery,
  useLazyGetContestDetailQuery,
  useSplitTeamQuery,
  useLazySplitTeamQuery,
  useUpdateContestMutation,
  useDeleteContestMutation,
} = contestAPI
