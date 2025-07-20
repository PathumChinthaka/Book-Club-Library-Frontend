import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/AuthTypes";
import { decryptData } from "../../utils/utilMethods";

const initialState: AuthState = {
  accessToken: decryptData(localStorage.getItem("accessToken")),
  user: decryptData(localStorage.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
    },
    logOut(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
