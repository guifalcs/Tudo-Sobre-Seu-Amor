import { Relationship } from "./relationship.model";

export interface User {
  user: {
    id?: string;
    name: string;
    email: string;
    subscription: {
      title: string,
      price: number
    };
    status: string,
    relationship: Relationship
  }
}

export interface AuthResponse {
  user: User;
  token: string;
}
