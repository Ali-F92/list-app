import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import { getPaginationPageNumbers } from "./utils/get-pagination-page-numbers";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4 bg-gray-50" dir="rtl">
      <button
        className={`p-2 rounded-full transition flex items-center justify-center w-8 h-8
          ${currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-100 text-blue-600 shadow-sm"}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <RightOutlined className="text-sm" />
      </button>

      {getPaginationPageNumbers(currentPage, totalPages).map((page, idx) =>
        page === -1 ? (
          <span key={idx} className="px-2 py-1 text-sm text-gray-400">...</span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm rounded-full transition font-medium
              ${page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700 shadow-sm"}`}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`p-2 rounded-full transition flex items-center justify-center w-8 h-8
          ${currentPage === totalPages || totalPages === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-100 text-blue-600 shadow-sm"}`}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <LeftOutlined className="text-sm" />
      </button>
    </div>
  );
}
