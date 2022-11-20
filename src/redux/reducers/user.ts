import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const tryGetSession: () => UserSession | null = () => {
  const storedSession = localStorage.getItem("session");
  if (!storedSession) return null;

  const ONE_HOUR = 60 * 60 * 1000;
  const parsedSession = JSON.parse(storedSession);
  if (parsedSession.time + ONE_HOUR < new Date().getTime()) {
    localStorage.removeItem("session");
    return null;
  }

  return parsedSession.data;
};

export const fetchSession = createAsyncThunk(
  "users/fetchSession",
  async (data: { name: string; email: string; client_id: string }) => {
    const response = await fetch(
      "https://api.supermetrics.com/assignment/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          ...data,
        }),
      }
    );
    const session = await response.json();
    localStorage.setItem(
      "session",
      JSON.stringify({
        time: new Date().getTime(),
        data: { ...session.data },
      })
    );
    // @ts-ignore
    return session.data;
  }
);

export type UserSession = {
  client_id: string;
  email: string;
  sl_token: string;
};

const initialState: {
  loading: "idle" | "pending";
  session: UserSession | null;
} = {
  loading: "idle",
  session: tryGetSession(),
};

const userSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    removeSession: (state) => {
      localStorage.removeItem("session");
      state.session = null;
    },
  },
  extraReducers: {
    [fetchSession.pending.type]: (state) => {
      state.session = null;
      state.loading = "pending";
    },
    [fetchSession.fulfilled.type]: (state, action) => {
      state.loading = "idle";
      state.session = action.payload;
    },
  },
});

export default userSlice;
