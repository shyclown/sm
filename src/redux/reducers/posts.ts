import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userSlice from "./user";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (data: { page: number }, { getState, dispatch }) => {
    // @ts-ignore
    const sl_token = getState().user.session.sl_token;

    try {
      const response = await fetch(
        "https://api.supermetrics.com/assignment/posts?" +
          new URLSearchParams({ sl_token, page: data.page.toString(10) }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      if (response.status === 403) {
        // TODO:
        dispatch(userSlice.actions.removeSession());
        return { posts: [] as Post[], page: null };
        // throw new Error("403 is unacceptable for me!");
      }
      const posts = await response.json();
      return posts.data;
    } catch (error) {
      // TODO: If request failed
      // it is possible that token is no longer valid, so we remove session
      // dispatch(userSlice.actions.removeSession());
    }
  }
);

export type Post = {
  created_time: string;
  from_id: string;
  from_name: string;
  id: string;
  message: string;
  type: string;
};

const initialState: {
  loading: "idle" | "pending";
  data: { posts: Post[]; page: number | null };
} = {
  loading: "idle",
  data: { posts: [] as Post[], page: null },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      });
  },
});

export default postsSlice;
