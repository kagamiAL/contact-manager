// API Response Types
export interface JwtAuthenticationResponse {
  token: string;
  tokenType: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthorizationRequest {
  email: string;
  password: string;
}

// Contact Types
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  zipCode: string;
  dateOfBirth: string; // ISO date string (yyyy-MM-dd)
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactBody {
  firstName: string;
  lastName: string;
  zipCode: string;
  dateOfBirth: string; // ISO date string (yyyy-MM-dd)
}

export interface EditContactBody {
  Id: number; // Note: capitalized as per backend
  firstName?: string;
  lastName?: string;
  zipCode?: string;
  dateOfBirth?: string; // ISO date string (yyyy-MM-dd)
}

// Pagination Types
export interface PageableParams {
  page: number;
  size: number;
  sortBy?: string;
  ascending?: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Search Types
export type SearchType = "firstName" | "lastName" | "fullName";
