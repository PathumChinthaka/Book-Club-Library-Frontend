import {
  LendingType,
  GetLendingsQueryParams,
  PaginatedLendingResponse,
} from "../../types/LendingType";
import { apiSlice } from "../api/apiSlice";

export const lendingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLendings: builder.query<
      PaginatedLendingResponse,
      GetLendingsQueryParams
    >({
      query: ({ search, page, pageSize }) => {
        const queryParams: string[] = [];
        if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
        if (page !== undefined) queryParams.push(`page=${page}`);
        if (pageSize !== undefined) queryParams.push(`pageSize=${pageSize}`);

        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        return `/lendings${queryString}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map((lending) => ({
                type: "Lendings" as const,
                id: lending._id,
              })),
              { type: "Lendings", id: "LIST" },
            ]
          : [{ type: "Lendings", id: "LIST" }],
    }),

    getLendingById: builder.query<LendingType, string>({
      query: (id) => `/lendings/${id}`,
      providesTags: (result, error, id) => [{ type: "Lending", id }],
    }),

    createLending: builder.mutation<
      { id: string } | { error: any },
      Partial<LendingType>
    >({
      query: (newReader) => ({
        url: "/lendings",
        method: "POST",
        body: {
          ...newReader,
        },
      }),
      invalidatesTags: [{ type: "Lendings", id: "LIST" }],
    }),

    remindLending: builder.mutation<{ success: boolean }, string>({
      query: (lendId) => ({
        url: `/lendings/${lendId}/remind`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Lendings", id },
        { type: "Lendings", id: "LIST" },
      ],
    }),

    updateLendingDetails: builder.mutation<
      LendingType,
      Partial<LendingType> & { id: string }
    >({
      query: ({ id, ...readerData }) => ({
        url: `/lendings/${id}`,
        method: "PUT",
        body: readerData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Lendings", id },
        { type: "Lendings", id: "LIST" },
      ],
    }),

    deleteLending: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/lendings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Lendings", id },
        { type: "Lendings", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllLendingsQuery,
  useCreateLendingMutation,
  useUpdateLendingDetailsMutation,
  useGetLendingByIdQuery,
  useDeleteLendingMutation,
  useRemindLendingMutation
} = lendingApiSlice;
