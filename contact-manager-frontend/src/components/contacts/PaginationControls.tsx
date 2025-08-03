"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";

interface PaginationControlsProps {
  pageSize: number;
  sortBy: string;
  ascending: boolean;
  onPageSizeChange: (size: number) => void;
  onSortChange: (field: string) => void;
  onSortDirectionChange: (ascending: boolean) => void;
}

export default function PaginationControls({
  pageSize,
  sortBy,
  ascending,
  onPageSizeChange,
  onSortChange,
  onSortDirectionChange,
}: PaginationControlsProps) {
  const pageSizes = [10, 25, 50, 100];
  const sortFields = [
    { value: "firstName", label: "first name" },
    { value: "lastName", label: "last name" },
    { value: "zipCode", label: "zip code" },
    { value: "dateOfBirth", label: "age" },
  ];

  return (
    <div className="flex items-center justify-between mb-8 animate-in slide-in-from-top duration-500 delay-100">
      {/* Page Size */}
      <div className="flex items-center space-x-3">
        <span className="text-white/40 text-xs font-light">show</span>
        <div className="flex space-x-1">
          {pageSizes.map((size) => (
            <button
              key={size}
              onClick={() => onPageSizeChange(size)}
              className={`text-xs font-light px-2 py-1 transition-all duration-300 ${
                pageSize === size
                  ? "text-white border-b border-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center space-x-4">
        <span className="text-white/40 text-xs font-light">sort by</span>
        <div className="flex space-x-3">
          {sortFields.map((field) => (
            <button
              key={field.value}
              onClick={() => onSortChange(field.value)}
              className={`text-xs font-light transition-all duration-300 transform hover:scale-105 ${
                sortBy === field.value
                  ? "text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {field.label}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSortDirectionChange(!ascending)}
          className="p-0 ml-2"
        >
          {ascending ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
