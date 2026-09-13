"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransition } from "react";

interface PaginationProps {
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const { total, currentPage, totalPages } = pagination;

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  // Generate page numbers to render
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-sm text-zeno-neutral-secondary">
      <div>
        Total: <span className="font-semibold text-zeno-black">{total}</span> {total === 1 ? "item" : "itens"}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 border border-zeno-neutral-border rounded-lg hover:bg-zeno-neutral-surface disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed text-sm font-medium"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-1">
          {renderPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 rounded-lg font-medium text-sm transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-zeno-orange text-white bg-gradient-zeno shadow-xs"
                  : "border border-zeno-neutral-border hover:bg-zeno-neutral-surface text-zeno-black"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="flex items-center gap-1 px-3 py-1.5 border border-zeno-neutral-border rounded-lg hover:bg-zeno-neutral-surface disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed text-sm font-medium"
        >
          <span>Próxima</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
