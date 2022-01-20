import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { app } from "../env";
import {createApi} from "@reduxjs/toolkit/query/react"

const { DEBUG_MODE } = app;

export const store = configureStore({
  reducer: {},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type MeetsyAppStore = typeof store;

export const wrapper = createWrapper<MeetsyAppStore>(() => store, {
  debug: DEBUG_MODE as boolean,
});
