"use client";

import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContactsHeaderProps {
  onAddContact: () => void;
}

export default function ContactsHeader({ onAddContact }: ContactsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contacts
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your contacts and stay connected
          </p>
        </div>
        <Button onClick={onAddContact} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </div>
    </div>
  );
}
