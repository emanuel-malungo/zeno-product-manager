"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import logo from "@/assets/images/logo-zeno-product-manager.png";
import { ProductModal } from "@/components/ui/ProductModal";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-1.5 rounded-xl bg-white border border-zeno-neutral-border shadow-xs flex items-center justify-center">
          <Image src={logo} alt="Zeno Logo" width={44} height={44} className="rounded-lg object-contain" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zeno-black tracking-tight">Produtos</h1>
          <p className="text-zeno-neutral-secondary text-sm">
            Gerencie os produtos da sua loja. Aqui você pode visualizar, editar, adicionar ou remover produtos.
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-zeno-orange hover:bg-zeno-orange-bright transition-colors text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium shadow-sm cursor-pointer active:scale-[0.98]"
      >
        <Plus size={20} />
        Novo Produto
      </button>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}