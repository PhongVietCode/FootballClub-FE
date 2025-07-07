import { api } from "."
import type { AppResponse } from "@/types/response"
import type { Player } from "@/types/player"
import type { JoinContestByListSchema } from "@/schemas/player/JoinContestByList"

const playerAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    joinByList: builder.mutation<
      AppResponse<Player[]>,
      JoinContestByListSchema
    >({
      query: (data) => ({
        url: "/players/list",
        method: "POST",
        body: data,
      }),
    }),
  }),
})
export const { useJoinByListMutation } = playerAPI
