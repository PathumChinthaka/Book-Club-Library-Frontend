import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../lib/store";
import { setCredentials, logOut } from "../auth/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { decryptData, encryptData } from "../../utils/utilMethods";
const BASE_URL = import.meta.env.VITE_APP_API_URL;
const API_VERSION = import.meta.env.VITE_APP_API_VERSION;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/${API_VERSION}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    let token = state.auth.accessToken;
    if (!token) {
      token = decryptData(localStorage.getItem("accessToken"));
    }
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "*/*");
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    try {
      const refreshResult = await rawBaseQuery(
        { url: "/auth/refresh-token", method: "POST" },
        api,
        extraOptions
      );

      const newToken = (refreshResult.data as { accessToken?: string, user?: any })

      if (newToken) {
        api.dispatch(setCredentials({ accessToken: newToken.accessToken, user: newToken.user }));
        localStorage.setItem("accessToken", encryptData(newToken.accessToken));
        localStorage.setItem("user", encryptData(newToken.user));
        result = await rawBaseQuery(args, api, extraOptions);
      } 
      else if(refreshResult.error){
        api.dispatch(logOut());
        window.location.href = '/login'
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Books", "Readers", "Book", "Reader", "Lendings", "Lending"],
  endpoints: () => ({}),
});
