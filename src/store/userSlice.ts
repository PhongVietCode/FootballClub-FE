import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "."
import type { OrgProfile } from "@/types/org"

interface UserState {
  id: string
  name: string
  orgProfile: OrgProfile[]
  choosenOrg?: OrgProfile
}
const initialState: UserState = {
  id: "",
  name: "",
  orgProfile: [],
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.orgProfile = action.payload.orgProfile
      state.choosenOrg = action.payload.choosenOrg
    },
    chooseProfile: (state, action: PayloadAction<OrgProfile>) => {
      localStorage.setItem("orgId", action.payload.id)
      state.choosenOrg = action.payload
    },
  },
})

export const { setProfile, chooseProfile } = userSlice.actions

export const selectAuth = (state: RootState) => state.auth
export default userSlice.reducer
