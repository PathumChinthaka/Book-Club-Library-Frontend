export interface LendingType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  isbn: string;
  dueDate: Date;
  reminderSent: Boolean;
}

export interface LendingResponse {
  _id: string;
  reader: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  book: {
    _id: string;
    title: string;
    isbn: string;
  };
  borrowedAt: string; 
  dueDate: string;   
  returnedDate: string | null;
  reminderSent: boolean;
}

export interface PaginatedLendingResponse {
  page: number;
  pageSize: number;
  total: number;
  data: LendingResponse[];
}

export type GetLendingsQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};
