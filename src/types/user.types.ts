export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    address: string;
  };
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
