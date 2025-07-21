export interface BookType {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  publisher?: string;
  publicationYear?: number;
  copiesTotal: number;
  copiesAvailable: number;
  createdOn: string;
  updatedOn?: string | null;
}

export interface PaginatedBooksResponse {
  page: number;
  pageSize: number;
  total: number;
  data: BookType[];
}
