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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ContactsHeader onAddContact={handleAddContact} />

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isLoading={isLoading}
        />
      </div>

      {/* Stats */}
      <ContactsStats totalContacts={contacts.totalElements} />

      {/* Contacts List */}
      <div className="space-y-6">
        <ContactsList
          contacts={contacts}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onEditContact={handleEditContact}
          onDeleteContact={handleDeleteContact}
          onPageChange={handlePageChange}
          onAddContact={handleAddContact}
        />
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        contact={editingContact}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
}
