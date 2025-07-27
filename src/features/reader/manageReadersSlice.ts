import {
  PaginatedReaderResponse,
  ReaderType,
  GetReadersQueryParams,
} from "../../types/ReaderType";
import { apiSlice } from "../api/apiSlice";

export const readerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReaders: builder.query<
      PaginatedReaderResponse,
      GetReadersQueryParams
    >({
      query: ({ firstName, lastName, email, page, pageSize }) => {
        const queryParams: string[] = [];

        if (firstName)
          queryParams.push(`firstName=${encodeURIComponent(firstName)}`);
        if (lastName)
          queryParams.push(`lastName=${encodeURIComponent(lastName)}`);
        if (email) queryParams.push(`email=${encodeURIComponent(email)}`);
        if (page !== undefined) queryParams.push(`page=${page}`);
        if (pageSize !== undefined) queryParams.push(`pageSize=${pageSize}`);

        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        return `/readers${queryString}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map((reader) => ({
                type: "Readers" as const,
                id: reader._id,
              })),
              { type: "Readers", id: "LIST" },
            ]
          : [{ type: "Readers", id: "LIST" }],
    }),

    getReaderById: builder.query<ReaderType, string>({
      query: (id) => `/readers/${id}`,
      providesTags: (result, error, id) => [{ type: "Reader", id }],
    }),

    createReader: builder.mutation<ReaderType, Partial<ReaderType>>({
      query: (newReader) => ({
        url: "/readers",
        method: "POST",
        body: newReader,
      }),
      invalidatesTags: [{ type: "Readers", id: "LIST" }],
    }),

    updateReaderDetails: builder.mutation<
      ReaderType,
      Partial<ReaderType> & { id: string }
    >({
      query: ({ id, ...readerData }) => ({
        url: `/readers/${id}`,
        method: "PUT",
        body: readerData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Readers", id },
        { type: "Readers", id: "LIST" },
      ],
    }),

    deleteReader: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/readers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Readers", id },
        { type: "Readers", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateReaderMutation,
  useUpdateReaderDetailsMutation,
  useGetReaderByIdQuery,
  useGetAllReadersQuery,
  useDeleteReaderMutation,
} = readerApiSlice;
