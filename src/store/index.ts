import { api } from "@/api"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./authSlice"
import { userSlice } from "./userSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
