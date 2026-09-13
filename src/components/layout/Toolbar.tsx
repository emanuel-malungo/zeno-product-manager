"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTransition } from "react";

export function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const search = searchParams.get("search") || "";
  const pageSize = searchParams.get("pageSize") || "10";

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function handlePageSizeChange(newSize: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", newSize);
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zeno-neutral-muted" />
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nome, descrição..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-zeno-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange bg-zeno-white transition-all placeholder:text-zeno-neutral-muted"
          />
        </div>
        
        <button className="flex items-center gap-2 px-3 py-2 border border-zeno-neutral-border rounded-xl text-sm font-medium text-zeno-neutral-secondary hover:bg-zeno-neutral-surface transition-colors cursor-pointer whitespace-nowrap">
          <SlidersHorizontal size={16} />
          <span>Filtros</span>
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-zeno-neutral-secondary self-end md:self-auto">
        <span>Mostrar</span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          className="px-3 py-1.5 border border-zeno-neutral-border rounded-xl font-medium bg-zeno-white text-zeno-black focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange cursor-pointer text-sm"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>por página</span>
      </div>
    </div>
  );
}
