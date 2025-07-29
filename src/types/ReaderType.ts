export interface ReaderType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  profilePictureUrl: string;
  activeStatus: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface PaginatedReaderResponse {
  page: number;
  pageSize: number;
  total: number;
  data: ReaderType[];
}

export type GetReadersQueryParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};
