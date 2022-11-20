import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./reducers/user";
import postsSlice from "./reducers/posts";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: sessionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
