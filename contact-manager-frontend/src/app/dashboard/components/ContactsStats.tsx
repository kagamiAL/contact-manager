"use client";

import { Users } from "lucide-react";

interface ContactsStatsProps {
  totalContacts: number;
}

export default function ContactsStats({ totalContacts }: ContactsStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center">
        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div className="ml-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Contacts
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {totalContacts}
          </p>
        </div>
      </div>
    </div>
  );
}
