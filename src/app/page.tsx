import { getProducts } from "@/actions/product";
import { Header } from "@/components/layout/Header";
import { Toolbar } from "@/components/layout/Toolbar";
import { ProductTable } from "@/components/layout/ProductTable";
import { Pagination } from "@/components/layout/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const search = params.search || "";

  const response = await getProducts(page, pageSize, search);
  const products = response?.data || [];
  const pagination = response?.pagination || { total: 0, currentPage: 1, totalPages: 1, pageSize: 10 };

  const filteredProducts = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    : products;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Header />
      
      <div className="bg-zeno-white rounded-2xl shadow-xs border border-zeno-neutral-border p-6 space-y-6">
        <Toolbar />
        <ProductTable products={filteredProducts} />
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
}
