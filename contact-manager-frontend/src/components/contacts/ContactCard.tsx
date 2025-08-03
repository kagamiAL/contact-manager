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
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-semibold">
            {getInitials(contact.firstName, contact.lastName)}
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {contact.firstName} {contact.lastName}
            </h3>

            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>Zip Code: {contact.zipCode}</span>
              </div>

              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>
                  {formatDateOfBirth(contact.dateOfBirth)} (Age:{" "}
                  {calculateAge(contact.dateOfBirth)})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(contact)}
            className="p-2 text-white hover:bg-gray-800"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            loading={isDeleting}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
