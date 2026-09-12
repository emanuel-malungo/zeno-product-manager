/**
 * Classe personalizada para erros da API, útil para intercetar o status HTTP nos blocos catch.
 */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Wrapper padronizado para chamadas Fetch à API.
 * Adiciona automaticamente os Query Params, Headers JSON, e o tratamento de erros padronizado.
 */
export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  let url = endpoint;

  // Constrói os query parameters caso existam
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Prepara e executa a requisição
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  // Tratamento de erros de rede ou respostas negativas (ex: 400, 404, 500)
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Falha ao fazer parse do erro como JSON, mantém a mensagem padrão
    }
    throw new ApiError(response.status, errorMessage);
  }

  // Respostas 204 No Content retornam sucesso vazio sem fazer .json()
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
