import axios from "axios";
import type {
  JwtAuthenticationResponse,
  AuthorizationRequest,
  Contact,
  ContactBody,
  EditContactBody,
  PageableParams,
  PaginatedResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (
    data: AuthorizationRequest
  ): Promise<JwtAuthenticationResponse> => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  },

  signIn: async (
    data: AuthorizationRequest
  ): Promise<JwtAuthenticationResponse> => {
    const response = await api.post("/api/auth/signIn", data);
    return response.data;
  },
};

// Contacts API
export const contactsAPI = {
  getAll: async (
    params: PageableParams
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get("/api/contacts/all", { params });
    return response.data;
  },

  searchByFirstName: async (
    search: string,
    params: PageableParams
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get("/api/contacts/searchFirstName", {
      params: { ...params, search },
    });
    return response.data;
  },

  searchByLastName: async (
    search: string,
    params: PageableParams
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get("/api/contacts/searchLastName", {
      params: { ...params, search },
    });
    return response.data;
  },

  searchByFullName: async (
    search: string,
    params: PageableParams
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get("/api/contacts/searchFullName", {
      params: { ...params, search },
    });
    return response.data;
  },

  add: async (contacts: ContactBody[]): Promise<void> => {
    await api.post("/api/contacts/add", contacts);
  },

  update: async (contacts: EditContactBody[]): Promise<void> => {
    await api.post("/api/contacts/update", contacts);
  },

  delete: async (contactIds: number[]): Promise<void> => {
    await api.delete("/api/contacts/delete", { data: contactIds });
  },
};

export default api;
