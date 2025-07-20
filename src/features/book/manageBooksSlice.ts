import { BookType } from "../../types/BookType";
import { apiSlice } from "../api/apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BookType[], { search: string }>({
      query: ({ search }) => `/books`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Books" as const, _id })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    getBookById: builder.query<BookType, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    createBook: builder.mutation<BookType, Partial<BookType>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    updateBookDetails: builder.mutation<
      BookType,
      Partial<BookType> & { id: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useUpdateBookDetailsMutation,
  useGetBookByIdQuery,
  useGetBooksQuery,
  useDeleteBookMutation,
} = bookApiSlice;
