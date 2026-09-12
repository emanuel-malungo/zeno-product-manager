import { z } from "zod";

/**
 * Esquema de validação para criação e edição de Produtos.
 * Inclui as validações essenciais: nome não vazio, preços/stocks não negativos.
 */
export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z.coerce.number().min(0, "O preço não pode ser negativo"),
  stock: z.coerce.number().int("O stock deve ser um número inteiro").min(0, "O stock não pode ser negativo"),
});

// Inferência do tipo TypeScript a partir do Zod Schema
export type ProductFormData = z.infer<typeof productSchema>;
