import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (data: { page: number }, { getState }) => {
    // @ts-ignore
    const sl_token = getState().user.session.sl_token;

    console.log("request-sending");

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
    const posts = await response.json();

    return posts.data;
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
  extraReducers: {
    [fetchPosts.pending.type]: (state) => {
      state.loading = "pending";
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.loading = "idle";
      state.data = action.payload;
    },
  },
});

export default postsSlice;
