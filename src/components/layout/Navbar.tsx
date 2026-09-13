"use client";

import { Bell, HelpCircle, Search, ChevronDown, Store } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-zeno-neutral-border px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Breadcrumb / Location */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zeno-neutral-muted font-medium">
          <span>Sistema</span>
          <span>/</span>
          <span className="text-zeno-black font-semibold">Produtos</span>
        </div>
      </div>

      {/* Center: Search input simulation */}
      <div className="hidden md:flex items-center gap-2 max-w-xs w-full bg-zeno-neutral-surface px-3 py-1.5 rounded-xl border border-zeno-neutral-border text-xs text-zeno-neutral-muted">
        <Search size={14} />
        <span>Pesquisar no sistema...</span>
      </div>

      {/* Right: Store Selector & Icons */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zeno-neutral-surface border border-zeno-neutral-border text-xs font-medium text-zeno-black cursor-pointer">
          <Store size={14} className="text-zeno-orange" />
          <span>Loja Luanda Centro</span>
          <ChevronDown size={14} className="text-zeno-neutral-muted" />
        </div>

        <div className="h-4 w-px bg-zeno-neutral-border hidden sm:block" />

        <button className="text-zeno-neutral-secondary hover:text-zeno-black p-2 rounded-lg hover:bg-zeno-neutral-surface transition-colors relative cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-zeno-orange" />
        </button>

        <button className="text-zeno-neutral-secondary hover:text-zeno-black p-2 rounded-lg hover:bg-zeno-neutral-surface transition-colors cursor-pointer">
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
