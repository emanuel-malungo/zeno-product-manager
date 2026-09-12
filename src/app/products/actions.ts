"use server";

import { revalidatePath } from "next/cache";
import { CreateProductDto, UpdateProductDto } from "@/types/product.types";
import { ProductsService } from "@/service/products.service";

/**
 * Server Actions para mutação de dados da página de Produtos.
 * Protege o token/userID no lado do servidor e efetua revalidação de rota (cache) pós mutação.
 */

export async function createProductAction(data: CreateProductDto) {
  try {
    const product = await ProductsService.createProduct(data);
    revalidatePath("/products");
    return product;
  } catch {
    throw new Error("Falha ao criar produto");
  }
}

export async function createMultipleProductsAction(products: CreateProductDto[]) {
  try {
    const createdProducts = await ProductsService.createMultipleProducts(products);
    revalidatePath("/products");
    return createdProducts;
  } catch {
    throw new Error("Falha ao criar produtos (em lote)");
  }
}

export async function updateProductAction(id: string, userId: string, data: UpdateProductDto) {
  try {
    const product = await ProductsService.updateProduct(id, data, userId);
    revalidatePath("/products");
    return product;
  } catch {
    throw new Error("Falha ao atualizar produto");
  }
}

export async function deleteProductAction(id: string, userId: string) {
  try {
    await ProductsService.deleteProduct(id, userId);
    revalidatePath("/products");
    return true;
  } catch {
    throw new Error("Falha ao remover produto");
  }
}
