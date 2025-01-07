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
    relationship: Relationship,
    specialDates: [
      {
      id: string,
      title: string,
      date: string,
    }
  ];
    timeline: [
    {
      id: string,
      title: string,
      description: string,
      date: string,
    }
  ];
  wishlist: [
    {
      id: string,
      title: string,
      link: string,
      }
    ],
  lovemap: [
    {
      id: string,
      title: string,
      subtitle: string,
      location: string,
    }
  ]
  }
}

export interface AuthResponse {
  user: User;
  token: string;
}
