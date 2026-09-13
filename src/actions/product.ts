"use server";

import { revalidatePath } from "next/cache";
import { Product, PaginatedResponse } from "@/types";

const BASE_URL = "https://backend-nodejs-q65c.onrender.com";
const USER_ID = "6aa55e5a5e3e39b9db0ce4bf";

export async function getProducts(page = 1, pageSize = 10, search = ""): Promise<PaginatedResponse<Product> | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/products?user=${USER_ID}&page=${page}&pageSize=${pageSize}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    // API doesn't support search natively based on the provided endpoints, we might have to filter on client or see if API does it.
    // The instructions don't mention a search endpoint. "GET /api/products?user=USER_ID — listar todos os produtos query (opcionais): { page: number; pageSize: number; // default 10 }"
    // If the API doesn't have a search param, and the UI has a "Buscar por nome, descrição...", we might need to filter manually if possible, or maybe the API does support it undocumented? 
    // Let's just return the data. We'll handle search if needed, but pagination is server-side so local search is tricky.
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);

  try {
    const res = await fetch(`${BASE_URL}/api/products?user=${USER_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, stock, user: USER_ID }),
    });
    if (!res.ok) throw new Error("Failed to create product");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);

  try {
    const res = await fetch(`${BASE_URL}/api/products?id=${id}&user=${USER_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, stock }),
    });
    if (!res.ok) throw new Error("Failed to update product");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/products?id=${id}&user=${USER_ID}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete product" };
  }
}
