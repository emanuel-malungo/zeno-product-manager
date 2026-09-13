"use client";

import { useState, useTransition } from "react";
import { Eye, Edit2, Trash2, ArrowUpDown, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { ProductModal } from "@/components/ui/ProductModal";
import { deleteProduct } from "@/actions/product";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenModal = (product: Product, mode: "view" | "edit") => {
    setSelectedProduct(product);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
      setDeletingId(id);
      startTransition(async () => {
        await deleteProduct(id);
        setDeletingId(null);
      });
    }
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    })
      .format(val)
      .replace("AOA", "Kz");
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-zeno-neutral-border">
        <table className="w-full text-left text-sm text-zeno-neutral-secondary">
          <thead className="bg-zeno-neutral-surface/50 text-xs font-semibold text-zeno-black uppercase border-b border-zeno-neutral-border">
            <tr>
              <th scope="col" className="p-4 w-10">
                <input
                  type="checkbox"
                  className="rounded border-zeno-neutral-border text-zeno-orange focus:ring-zeno-orange/20 cursor-pointer"
                />
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center gap-1.5 cursor-pointer select-none">
                  Produto
                  <ArrowUpDown size={14} className="text-zeno-neutral-muted" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center gap-1.5 cursor-pointer select-none">
                  Descrição
                  <ArrowUpDown size={14} className="text-zeno-neutral-muted" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center gap-1.5 cursor-pointer select-none">
                  Preço (Kz)
                  <ArrowUpDown size={14} className="text-zeno-neutral-muted" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center gap-1.5 cursor-pointer select-none">
                  Estoque
                  <ArrowUpDown size={14} className="text-zeno-neutral-muted" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zeno-neutral-border bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-zeno-neutral-muted">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-zeno-neutral-surface/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-zeno-neutral-border text-zeno-orange focus:ring-zeno-orange/20 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-zeno-black whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-zeno-neutral-muted max-w-xs truncate">
                    {product.description || "-"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-zeno-black whitespace-nowrap">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      <span className="font-medium text-zeno-black">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(product, "view")}
                        title="Visualizar"
                        className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleOpenModal(product, "edit")}
                        title="Editar"
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={isPending && deletingId === product._id}
                        title="Eliminar"
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isPending && deletingId === product._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        mode={modalMode}
      />
    </>
  );
}
