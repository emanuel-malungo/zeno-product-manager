export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  user: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface PaginatedResponse<T> {
  statusText: string;
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}
