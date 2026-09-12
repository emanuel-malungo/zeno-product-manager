import { fetchApi } from "@/utils/api.utils";
import { env } from "@/utils/env.utils";
import { Product, PaginatedResponse, CreateProductDto, UpdateProductDto } from "@/types/product.types";

/**
 * Serviço isolado para abstrair as interações da API de Produtos.
 * Mantém os componentes e actions limpos da lógica do fetch e do envio de credenciais.
 */
export const ProductsService = {
  /**
   * Obtém a lista paginada de produtos do utilizador
   */
  async getProducts(page = 1, pageSize = 10, userId = env.API_USER_ID): Promise<PaginatedResponse<Product>> {
    return fetchApi<PaginatedResponse<Product>>(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      params: { user: userId, page, pageSize },
      cache: "no-store", // SSR para garantir dados sempre recentes
    });
  },

  /**
   * Obtém os detalhes completos de um produto específico
   */
  async getProductById(id: string, userId = env.API_USER_ID): Promise<Product> {
    return fetchApi<Product>(`${env.NEXT_PUBLIC_API_URL}/api/products/by-id`, {
      params: { id, user: userId },
      cache: "no-store",
    });
  },

  /**
   * Cria um novo produto
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    return fetchApi<Product>(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      params: { user: data.user || env.API_USER_ID },
      body: JSON.stringify(data),
    });
  },

  /**
   * Cria múltiplos produtos de uma só vez (Bulk)
   */
  async createMultipleProducts(products: CreateProductDto[], userId = env.API_USER_ID): Promise<Product[]> {
    return fetchApi<Product[]>(`${env.NEXT_PUBLIC_API_URL}/api/users/products`, {
      method: "POST",
      params: { userId },
      body: JSON.stringify(products),
    });
  },

  /**
   * Atualiza os dados de um produto existente
   */
  async updateProduct(id: string, data: UpdateProductDto, userId = env.API_USER_ID): Promise<Product> {
    return fetchApi<Product>(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "PATCH",
      params: { id, user: userId },
      body: JSON.stringify(data),
    });
  },

  /**
   * Elimina um produto
   */
  async deleteProduct(id: string, userId = env.API_USER_ID): Promise<void> {
    return fetchApi<void>(`${env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "DELETE",
      params: { id, user: userId },
    });
  },
};
