import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

import jwtDecode from "jwt-decode";

export type TokenPayload = {
  userId: number;
  iat: number;
};

export type TokenState = {
  value: string | null;
  payload: TokenPayload | null;
};

const initialState: TokenState = {
  value: null,
  payload: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    update: (state, action: { payload: string }) => {
      state.value = action.payload;
      state.payload = jwtDecode<TokenPayload>(state.value);
    },
  },
});

export const { update } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.value;
export const selectUserId = (state: RootState) => state.token.payload?.userId;

export default tokenSlice.reducer;
