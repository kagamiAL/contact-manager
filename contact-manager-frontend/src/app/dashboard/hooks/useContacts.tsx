"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { contactsAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import type {
  Contact,
  ContactBody,
  EditContactBody,
  PageableParams,
  PaginatedResponse,
  SearchType,
} from "@/lib/types";

export function useContacts() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // State
  const [contacts, setContacts] = useState<PaginatedResponse<Contact>>({
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("firstName");

  // Pagination params
  const [pageParams, setPageParams] = useState<PageableParams>({
    page: 0,
    size: 10,
    sortBy: "firstName",
    ascending: true,
  });

  // Load contacts
  const loadContacts = async (
    params = pageParams,
    search = searchQuery,
    type = searchType
  ) => {
    setIsLoading(true);
    try {
      let response: PaginatedResponse<Contact>;

      if (search) {
        switch (type) {
          case "firstName":
            response = await contactsAPI.searchByFirstName(search, params);
            break;
          case "lastName":
            response = await contactsAPI.searchByLastName(search, params);
            break;
          case "fullName":
            response = await contactsAPI.searchByFullName(search, params);
            break;
          default:
            response = await contactsAPI.getAll(params);
        }
      } else {
        response = await contactsAPI.getAll(params);
      }

      setContacts(response);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (isAuthenticated) {
      loadContacts();
    }
  }, [isAuthenticated]);

  // Handlers
  const handlePageChange = (newPage: number) => {
    const newParams = { ...pageParams, page: newPage };
    setPageParams(newParams);
    loadContacts(newParams);
  };

  const handleSearch = (query: string, type: SearchType) => {
    setSearchQuery(query);
    setSearchType(type);
    const resetParams = { ...pageParams, page: 0 };
    setPageParams(resetParams);
    loadContacts(resetParams, query, type);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const resetParams = { ...pageParams, page: 0 };
    setPageParams(resetParams);
    loadContacts(resetParams, "");
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await contactsAPI.delete([contactId]);
      toast.success("Contact deleted successfully");
      loadContacts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete contact");
    }
  };

  const handleFormSubmit = async (data: ContactBody | EditContactBody) => {
    try {
      if ("Id" in data) {
        await contactsAPI.update([data as EditContactBody]);
        toast.success("Contact updated successfully");
      } else {
        await contactsAPI.add([data as ContactBody]);
        toast.success("Contact added successfully");
      }
      loadContacts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save contact");
      throw error; // Re-throw to prevent form from closing
    }
  };

  return {
    contacts,
    isLoading,
    searchQuery,
    handlePageChange,
    handleSearch,
    handleClearSearch,
    handleDeleteContact,
    handleFormSubmit,
  };
}
