"use client";

import { useState } from "react";
import { MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { getInitials, formatDateOfBirth, calculateAge } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Contact } from "@/lib/types";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: number) => void;
}

export default function ContactCard({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(contact.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group py-6 border-b border-white/10 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />

          {/* Contact Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-light text-white mb-1 group-hover:text-white/90 transition-colors duration-300">
              {contact.firstName} {contact.lastName}
            </h3>
            <div className="flex items-center space-x-6 text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                {contact.zipCode}
              </span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                age {calculateAge(contact.dateOfBirth)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(contact)}
            className="p-0 h-auto transform hover:scale-105 transition-transform duration-200"
          >
            edit
          </Button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-white/30 hover:text-white/60 text-xs transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isDeleting ? "..." : "×"}
          </button>
        </div>
      </div>
    </div>
  );
}
