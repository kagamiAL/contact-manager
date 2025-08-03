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
import type { Contact } from "@/lib/types";

export default function DashboardContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    contacts,
    isLoading,
    searchQuery,
    handlePageChange,
    handleSearch,
    handleClearSearch,
    handleDeleteContact,
    handleFormSubmit,
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <ContactsHeader onAddContact={handleAddContact} />

      <SearchBar
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={isLoading}
      />

      <ContactsStats totalContacts={contacts.totalElements} />

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
