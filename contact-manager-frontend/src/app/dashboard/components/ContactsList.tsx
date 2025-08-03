"use client";

import { Users, Loader2 } from "lucide-react";
import ContactCard from "@/components/contacts/ContactCard";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import type { Contact, PaginatedResponse } from "@/lib/types";

interface ContactsListProps {
  contacts: PaginatedResponse<Contact>;
  isLoading: boolean;
  searchQuery: string;
  onEditContact: (contact: Contact) => void;
  onDeleteContact: (contactId: number) => void;
  onPageChange: (page: number) => void;
  onAddContact: () => void;
}

export default function ContactsList({
  contacts,
  isLoading,
  searchQuery,
  onEditContact,
  onDeleteContact,
  onPageChange,
  onAddContact,
}: ContactsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (contacts.content.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {searchQuery ? "No contacts found" : "No contacts yet"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {searchQuery
            ? "Try adjusting your search criteria or clear the search to see all contacts."
            : "Get started by adding your first contact."}
        </p>
        {!searchQuery && (
          <Button onClick={onAddContact}>Add Your First Contact</Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {contacts.content.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEditContact}
            onDelete={onDeleteContact}
          />
        ))}
      </div>

      {contacts.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={contacts.page}
            totalPages={contacts.totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}
