"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import logo from "@/assets/images/logo-zeno-product-manager.png";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "#", icon: LayoutDashboard, disabled: true },
    { label: "Produtos", href: "/", icon: Package, active: true },
    { label: "Pedidos", href: "#", icon: ShoppingCart, disabled: true },
    { label: "Clientes", href: "#", icon: Users, disabled: true },
    { label: "Configurações", href: "#", icon: Settings, disabled: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-zeno-neutral-border flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-zeno-neutral-border">
        <div className="p-1 bg-zeno-neutral-surface rounded-lg border border-zeno-neutral-border">
          <Image src={logo} alt="Zeno Logo" width={28} height={28} className="object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-zeno-black leading-tight text-base">Zeno Manager</span>
          <span className="text-[10px] uppercase font-semibold text-zeno-orange tracking-wider">Gestão</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zeno-neutral-muted">
          Menu Principal
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active || pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.disabled ? "#" : item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-zeno-orange text-white shadow-xs font-semibold"
                  : item.disabled
                  ? "text-zeno-neutral-disabled cursor-not-allowed"
                  : "text-zeno-neutral-secondary hover:bg-zeno-neutral-surface hover:text-zeno-black"
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-zeno-neutral-border">
        <div className="flex items-center justify-between p-2 rounded-xl bg-zeno-neutral-surface/60 border border-zeno-neutral-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-zeno text-white flex items-center justify-center font-bold text-xs">
              ZE
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zeno-black">Zeno Admin</span>
              <span className="text-[10px] text-zeno-neutral-muted truncate max-w-[110px]">admin@zeno.co</span>
            </div>
          </div>
          <button title="Sair" className="text-zeno-neutral-muted hover:text-red-500 transition-colors p-1 cursor-pointer">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}