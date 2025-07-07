import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "."

interface AuthState {
  token: string
}
const initialState: AuthState = {
  token: "",
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("access_token", action.payload)
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
