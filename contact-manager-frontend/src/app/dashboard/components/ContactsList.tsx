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
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (contacts.content.length === 0) {
    return (
      <div className="text-center py-20 animate-in fade-in slide-in-from-bottom duration-700">
        <p className="text-white/40 text-sm font-light mb-8 animate-in slide-in-from-top duration-500">
          {searchQuery ? "no matches found" : "no people yet"}
        </p>
        {!searchQuery && (
          <div className="animate-in slide-in-from-bottom duration-500 delay-200">
            <Button onClick={onAddContact} variant="secondary">
              add your first person
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-0">
        {contacts.content.map((contact, index) => (
          <div
            key={contact.id}
            className="animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ContactCard
              contact={contact}
              onEdit={onEditContact}
              onDelete={onDeleteContact}
            />
          </div>
        ))}
      </div>

      {contacts.totalPages > 1 && (
        <div className="mt-12 text-center">
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
