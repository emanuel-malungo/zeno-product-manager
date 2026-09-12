/**
 * Utilitário centralizado para acesso seguro às variáveis de ambiente.
 * Define fallbacks úteis para o desenvolvimento e evita a repetição de process.env.
 */
export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  API_USER_ID: process.env.API_USER_ID || '',
};