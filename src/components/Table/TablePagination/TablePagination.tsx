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
  const getPageNumbers = () => {
    const range: number[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 4) {
        range.push(1, 2, 3, 4, 5, -1, totalPages); // -1 = ellipsis
      } else if (currentPage >= totalPages - 3) {
        range.push(1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages);
      }
    }

    return range;
  };

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4 bg-gray-50" dir="rtl">
      <button
        className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        قبلی
      </button>

      {getPageNumbers().map((page, idx) =>
        page === -1 ? (
          <span key={idx} className="px-2 py-1 text-sm text-gray-500">...</span>
        ) : (
          <button
            key={idx}
            className={`px-3 py-1 text-sm rounded ${page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        بعدی
      </button>
    </div>
  );
}
