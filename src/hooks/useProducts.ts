import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsService } from "@/service/products.service";
import { CreateProductDto, UpdateProductDto } from "@/types/product.types";
import { env } from "@/utils/env.utils";

// Objeto de chaves padronizadas para garantir que todas as invalidações e queries
// sejam uniformes. Padrão recomendado pela documentação do React Query.
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (page: number, pageSize: number) => [...productKeys.lists(), page, pageSize] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

/**
 * Hook para listar produtos com paginação.
 */
export function useProducts(page = 1, pageSize = 10, userId = env.API_USER_ID) {
  return useQuery({
    queryKey: productKeys.list(page, pageSize),
    queryFn: () => ProductsService.getProducts(page, pageSize, userId),
    // `keepPreviousData` é útil para UX ao paginar, mas no v5 mudou para `placeholderData: keepPreviousData`.
    // No entanto, para simplificar e focar no essencial, deixamos as options padrão.
  });
}

/**
 * Hook para obter os detalhes de um produto único.
 */
export function useProduct(id: string, userId = env.API_USER_ID) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => ProductsService.getProductById(id, userId),
    enabled: !!id, // Apenas faz fetch se tiver um ID válido
  });
}

/**
 * Hook para criar um produto.
 * Invalida automaticamente a cache da lista ao concluir.
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => ProductsService.createProduct(data),
    onSuccess: () => {
      // Força a atualização de todas as listas de produtos
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

/**
 * Hook para atualizar um produto.
 * Invalida tanto a lista quanto os detalhes do produto alterado.
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, userId }: { id: string; data: UpdateProductDto; userId?: string }) =>
      ProductsService.updateProduct(id, data, userId || env.API_USER_ID),
    onSuccess: (data, variables) => {
      // Invalida a lista para refletir as alterações gerais
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      // Invalida os detalhes específicos deste produto
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });
}

/**
 * Hook para eliminar um produto.
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId?: string }) =>
      ProductsService.deleteProduct(id, userId || env.API_USER_ID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}
