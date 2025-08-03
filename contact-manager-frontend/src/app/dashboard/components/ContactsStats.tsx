"use client";

interface ContactsStatsProps {
  totalContacts: number;
}

export default function ContactsStats({ totalContacts }: ContactsStatsProps) {
  return (
    <div className="mb-12">
      <p className="text-white/40 text-sm font-light animate-in slide-in-from-left duration-500 delay-300">
        {totalContacts} {totalContacts === 1 ? "person" : "people"}
      </p>
    </div>
  );
}
