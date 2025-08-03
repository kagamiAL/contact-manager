"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { contactsAPI } from "@/lib/api";
import type {
  Contact,
  ContactBody,
  EditContactBody,
  PaginatedResponse,
  PageableParams,
  SearchType,
} from "@/lib/types";

export function useContacts() {
  const [contacts, setContacts] = useState<PaginatedResponse<Contact>>({
    content: [],
    page: 0,
    size: 25,
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("firstName");

  // Pagination params
  const [pageParams, setPageParams] = useState<PageableParams>({
    page: 0,
    size: 25,
    sortBy: "firstName",
    ascending: true,
  });

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        loadContacts({ ...pageParams, page: 0 }, searchQuery, searchType);
      } else {
        loadContacts({ ...pageParams, page: 0 });
      }
    }, 200); // 200ms delay for responsive search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  // Load contacts
  const loadContacts = async (
    params = pageParams,
    search = searchQuery,
    type = searchType
  ) => {
    try {
      setIsLoading(true);
      let response;

      if (search.trim()) {
        if (type === "firstName") {
          response = await contactsAPI.searchByFirstName(search, params);
        } else if (type === "lastName") {
          response = await contactsAPI.searchByLastName(search, params);
        } else {
          response = await contactsAPI.searchByFullName(search, params);
        }
      } else {
        response = await contactsAPI.getAll(params);
      }

      setContacts(response);
      setPageParams(params);
    } catch (error) {
      toast.error(
        search ? "Failed to search contacts" : "Failed to fetch contacts"
      );
      console.error("Error loading contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadContacts();
  }, []);

  // Reload when pagination params change (except during initial mount)
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    loadContacts();
  }, [pageParams.size, pageParams.sortBy, pageParams.ascending]);

  const handleSearch = useCallback((query: string, type: SearchType) => {
    setSearchQuery(query);
    setSearchType(type);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setPageParams((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setPageParams((prev) => ({ ...prev, page }));
      loadContacts({ ...pageParams, page });
    },
    [pageParams]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      const newParams = { ...pageParams, size, page: 0 };
      setPageParams(newParams);
      loadContacts(newParams);
    },
    [pageParams]
  );

  const handleSortChange = useCallback(
    (sortBy: string) => {
      const newParams = { ...pageParams, sortBy, page: 0 };
      setPageParams(newParams);
      loadContacts(newParams);
    },
    [pageParams]
  );

  const handleSortDirectionChange = useCallback(
    (ascending: boolean) => {
      const newParams = { ...pageParams, ascending, page: 0 };
      setPageParams(newParams);
      loadContacts(newParams);
    },
    [pageParams]
  );

  const handleAddContact = useCallback(async (contactData: ContactBody) => {
    try {
      await contactsAPI.add([contactData]);
      toast.success("Contact added successfully");
      loadContacts();
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to add contact";
      toast.error(message);
      throw error;
    }
  }, []);

  const handleUpdateContact = useCallback(
    async (contactData: EditContactBody) => {
      try {
        await contactsAPI.update([contactData]);
        toast.success("Contact updated successfully");
        loadContacts();
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Failed to update contact";
        toast.error(message);
        throw error;
      }
    },
    []
  );

  const handleDeleteContact = useCallback(async (id: number) => {
    try {
      await contactsAPI.delete([id]);
      toast.success("Contact deleted successfully");
      loadContacts();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to delete contact";
      toast.error(message);
      throw error;
    }
  }, []);

  return {
    contacts,
    isLoading,
    searchQuery,
    pageSize: pageParams.size,
    sortBy: pageParams.sortBy || "firstName",
    ascending: pageParams.ascending ?? true,
    searchContacts: handleSearch,
    clearSearch: handleClearSearch,
    addContact: handleAddContact,
    updateContact: handleUpdateContact,
    deleteContact: handleDeleteContact,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
    handleSortDirectionChange,
  };
}
