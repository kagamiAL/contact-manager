"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(0);

    if (currentPage <= 3) {
      // Show first 5 pages
      for (let i = 1; i <= Math.min(4, totalPages - 1); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push(-1); // Ellipsis
        pages.push(totalPages - 1);
      }
    } else if (currentPage >= totalPages - 4) {
      // Show last 5 pages
      pages.push(-1); // Ellipsis
      for (let i = Math.max(totalPages - 5, 1); i < totalPages - 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages - 1);
    } else {
      // Show pages around current
      pages.push(-1); // Ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(totalPages - 1);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-6">
      {currentPage > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading}
          className="text-xs"
        >
          previous
        </Button>
      )}

      <span className="text-white/40 text-xs">
        {currentPage + 1} of {totalPages}
      </span>

      {currentPage < totalPages - 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading}
          className="text-xs"
        >
          next
        </Button>
      )}
    </div>
  );
}
