import Table, { SortTableState, TableColumn } from "../../Table/Table";
import { useGetProducts } from "../../../hooks/queries/useGetProducts";
import TableError from "../../Table/TableError/TableError";
import { ProductModel } from "../../../api/types/products";
import { useState } from "react";

interface ProductsTableProps {
  searchText: string;
}

const dataLimitPerPage = 10;

const productsTableColumns: TableColumn[] = [
  {
    key: 'title',
    label: 'عنوان',
    sortable: true,
  },
  {
    key: 'description',
    label: 'توضیحات',
    sortable: true,
  },
  {
    key: 'price',
    label: 'قیمت'
  }
]

export default function ProductsTable({ searchText }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortTableState>(null);
  const { data, error, refetch } = useGetProducts(currentPage, dataLimitPerPage, searchText, sort);


  if (error) {
    return <TableError message={error.message} onCta={refetch} />;
  }

  const totalPages = Math.ceil(data.total / dataLimitPerPage);

  const renderRow = (product: ProductModel) => {
    return (
      <>
        <td className="px-4 py-2">{product.title}</td>
        <td className="px-4 py-2">{product.description}</td>
        <td className="px-4 py-2">{product.price}</td>
      </>
    );
  }

  return (
    <>
      <Table<ProductModel>
        data={data.products}
        columns={productsTableColumns}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sort={sort}
        onSortChange={setSort}
        renderRow={renderRow}
      />
    </>
  );
}