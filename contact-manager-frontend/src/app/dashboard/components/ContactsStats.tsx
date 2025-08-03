"use client";

import { Users } from "lucide-react";

interface ContactsStatsProps {
  totalContacts: number;
}

export default function ContactsStats({ totalContacts }: ContactsStatsProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6 mb-6">
      <div className="flex items-center">
        <Users className="h-8 w-8 text-white" />
        <div className="ml-4">
          <p className="text-sm text-gray-400">Total Contacts</p>
          <p className="text-2xl font-semibold text-white">{totalContacts}</p>
        </div>
      </div>
    </div>
  );
}
