export interface User {
  user: {
    id?: string;
    name: string;
    email: string;
    subscription: {
      title: string,
      price: number
    };
    status: string
  }
}

export interface AuthResponse {
  user: User;
  token: string;
}
