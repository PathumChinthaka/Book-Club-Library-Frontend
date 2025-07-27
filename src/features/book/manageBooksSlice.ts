import { PaginatedBooksResponse, BookType, GetBooksQueryParams } from "../../types/BookType";
import { apiSlice } from "../api/apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<PaginatedBooksResponse, GetBooksQueryParams>({
      query: ({ title, author, category, isbn, page, pageSize }) => {
        const queryParams: string[] = [];

        if (title) queryParams.push(`title=${encodeURIComponent(title)}`);
        if (author) queryParams.push(`author=${encodeURIComponent(author)}`);
        if (category)
          queryParams.push(`category=${encodeURIComponent(category)}`);
        if (isbn) queryParams.push(`isbn=${encodeURIComponent(isbn)}`);
        if (page !== undefined) queryParams.push(`page=${page}`);
        if (pageSize !== undefined) queryParams.push(`pageSize=${pageSize}`);

        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        return `/books${queryString}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map((book) => ({
                type: "Books" as const,
                id: book._id,
              })),
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
