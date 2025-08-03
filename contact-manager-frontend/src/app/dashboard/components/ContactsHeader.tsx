"use client";

import Button from "@/components/ui/Button";

interface ContactsHeaderProps {
  onAddContact: () => void;
}

export default function ContactsHeader({ onAddContact }: ContactsHeaderProps) {
  return (
    <div className="mb-16">
      <div className="flex items-end justify-between">
        <div className="animate-in slide-in-from-left duration-700">
          <p className="text-white/40 text-sm font-light mb-2">
            people you know
          </p>
        </div>
        <div className="animate-in slide-in-from-right duration-700">
          <Button
            onClick={onAddContact}
            variant="secondary"
            className="text-sm font-light"
          >
            add person
          </Button>
        </div>
      </div>
    </div>
  );
}
