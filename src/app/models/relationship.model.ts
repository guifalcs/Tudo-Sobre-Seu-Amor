export interface Relationship {
  id?: string;
  userId: string;
  partnerName: string;
  startDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RelationshipFormData {
  partnerName: string;
  startDate: string;
}
