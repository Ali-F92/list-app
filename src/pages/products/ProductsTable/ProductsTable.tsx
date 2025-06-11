import Table, { SortTableState, TableColumn } from "../../../components/Table/Table";
import { useGetProducts } from "../../../hooks/queries/useGetProducts";
import { ProductModel } from "../../../api/types/products";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import ProductModal from "../ProductModal/ProductModal";
import { useSearchParams } from "react-router";

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
    key: 'category',
    label: 'دسته بندی',
    sortable: true,
  },
  {
    key: 'price',
    label: 'قیمت'
  },
  {
    key: 'discountPercentage',
    label: 'درصد تخفیف'
  },
  {
    key: 'action',
    label: '',
  }
]

export default function ProductsTable({ searchText }: ProductsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  
  const [sort, setSort] = useState<SortTableState>(null);
  const [modalData, setModalData] = useState<ProductModel | null>(null);
  const { data } = useGetProducts(pageFromUrl, dataLimitPerPage, searchText.trim(), sort);

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(data.total / dataLimitPerPage);

  const renderRow = (product: ProductModel) => {
    return (
      <>
        <td className="px-4 py-4">{product.title}</td>
        <td className="px-4 py-4">{product.category}</td>
        <td className="px-4 py-4">{product.price}</td>
        <td className="px-4 py-4">{product.discountPercentage}</td>
        <td className="px-4 py-4">
          <button
            onClick={() => setModalData(product)}
            className="text-blue-600 hover:underline text-sm cursor-pointer"
          >
            جزئیات
          </button>
        </td>
      </>
    );
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    setSearchParams(newParams);
  }, [searchText]);

  return (
    <>
      <Table<ProductModel>
        data={data.products}
        columns={productsTableColumns}
        totalPages={totalPages}
        currentPage={pageFromUrl}
        onPageChange={setPage}
        sort={sort}
        onSortChange={setSort}
        renderRow={renderRow}
      />
      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        closeOnOverlayClick={true}
        overlayClassName="backdrop-blur-sm"
        modalClassName="max-w-md"
      >
        <ProductModal product={modalData!} />
      </Modal>
    </>
  );
}