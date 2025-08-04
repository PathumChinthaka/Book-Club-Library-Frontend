export type UserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  address: string | null;
  profilePictureUrl: string | null;
  activeStatus: number;
  updatedOn: string | null;
  createdOn: string;
};

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  address: string | null;
  profilePictureUrl: string | null;
};
