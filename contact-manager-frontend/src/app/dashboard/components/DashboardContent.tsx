"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/lib/store";
import { useContacts } from "../hooks/useContacts";
import ContactsHeader from "./ContactsHeader";
import ContactsStats from "./ContactsStats";
import ContactsList from "./ContactsList";
import SearchBar from "@/components/contacts/SearchBar";
import ContactForm from "@/components/contacts/ContactForm";
import PaginationControls from "@/components/contacts/PaginationControls";
import type { Contact } from "@/lib/types";

export default function DashboardContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    contacts,
    isLoading,
    searchQuery,
    pageSize,
    sortBy,
    ascending,
    searchContacts,
    clearSearch,
    addContact,
    updateContact,
    deleteContact,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
    handleSortDirectionChange,
  } = useContacts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();

  const handleAddContact = () => {
    setEditingContact(undefined);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await deleteContact(id);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingContact) {
        await updateContact(data);
      } else {
        await addContact(data);
      }
      setIsFormOpen(false);
      setEditingContact(undefined);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <ContactsHeader onAddContact={handleAddContact} />

      <SearchBar
        onSearch={searchContacts}
        onClear={clearSearch}
        isLoading={isLoading}
      />

      <ContactsStats totalContacts={contacts.totalElements} />

      <PaginationControls
        pageSize={pageSize}
        sortBy={sortBy}
        ascending={ascending}
        onPageSizeChange={handlePageSizeChange}
        onSortChange={handleSortChange}
        onSortDirectionChange={handleSortDirectionChange}
      />

      <ContactsList
        contacts={contacts}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
        onPageChange={handlePageChange}
        onAddContact={handleAddContact}
      />

      <ContactForm
        contact={editingContact}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
}
