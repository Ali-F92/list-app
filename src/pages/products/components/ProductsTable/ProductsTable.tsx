import { useCallback, useState } from "react";

import ProductModal from "../ProductModal/ProductModal";
import Table, { SortTableState, TableColumn } from "../../../../components/Table/Table";
import { ProductModel } from "../../../../api/types/products";
import { useGetProducts } from "../../../../hooks/queries/useGetProducts";
import Modal from "../../../../components/Modal/Modal";
import ProductTableRow from "../ProductTableRow/ProductTableRow";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortTableState>(null);
  const [modalData, setModalData] = useState<ProductModel | null>(null);
  const { data } = useGetProducts({
    page: currentPage,
    limit: dataLimitPerPage,
    searchText: searchText.trim(),
    sort
  });

  const totalPages = Math.ceil(data.total / dataLimitPerPage);

  const renderRow = useCallback((product: ProductModel) => {
    return (
      <ProductTableRow product={product} onDetailsClick={setModalData} />
    );
  }, [setModalData]);

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