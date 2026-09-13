"use client";

import { useEffect, useState, useTransition } from "react";
import { X, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { createProduct, updateProduct } from "@/actions/product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  mode?: "create" | "edit" | "view";
}

export function ProductModal({ isOpen, onClose, product, mode = "create" }: ProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isView = mode === "view";
  const isEdit = mode === "edit";

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isView) {
      onClose();
      return;
    }

    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res;
      if (isEdit && product) {
        res = await updateProduct(product._id, formData);
      } else {
        res = await createProduct(formData);
      }

      if (res.success) {
        onClose();
      } else {
        setError(res.error || "Ocorreu um erro ao salvar o produto.");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-zeno-neutral-border animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-zeno-neutral-border pb-4 mb-4">
          <h2 className="text-xl font-bold text-zeno-black">
            {isView ? "Detalhes do Produto" : isEdit ? "Editar Produto" : "Criar Novo Produto"}
          </h2>
          <button
            onClick={onClose}
            className="text-zeno-neutral-muted hover:text-zeno-black transition-colors p-1 rounded-lg hover:bg-zeno-neutral-surface"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zeno-black mb-1">
              Nome do Produto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              disabled={isView}
              defaultValue={product?.name || ""}
              placeholder="Ex: Notebook UltraBook Pro"
              className="w-full px-3 py-2 border border-zeno-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange disabled:bg-zeno-neutral-surface text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zeno-black mb-1">Descrição</label>
            <textarea
              name="description"
              disabled={isView}
              rows={3}
              defaultValue={product?.description || ""}
              placeholder="Descrição sucinta do produto..."
              className="w-full px-3 py-2 border border-zeno-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange disabled:bg-zeno-neutral-surface text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zeno-black mb-1">
                Preço (Kz) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                required
                disabled={isView}
                defaultValue={product?.price ?? ""}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-zeno-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange disabled:bg-zeno-neutral-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zeno-black mb-1">
                Estoque <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                required
                disabled={isView}
                defaultValue={product?.stock ?? ""}
                placeholder="0"
                className="w-full px-3 py-2 border border-zeno-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-zeno-orange/20 focus:border-zeno-orange disabled:bg-zeno-neutral-surface text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zeno-neutral-border mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zeno-neutral-secondary hover:bg-zeno-neutral-surface rounded-lg transition-colors"
            >
              {isView ? "Fechar" : "Cancelar"}
            </button>
            {!isView && (
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium bg-zeno-orange hover:bg-zeno-orange-bright text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isEdit ? "Salvar Alterações" : "Criar Produto"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
