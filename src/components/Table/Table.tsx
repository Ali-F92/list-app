import { TablePagination } from "./TablePagination/TablePagination";
import CaretUpFilled from "@ant-design/icons/CaretUpFilled"
import CaretDownFilled from "@ant-design/icons/CaretDownFilled"

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export type SortTableState = null | {
  key: string;
  type: 'asc' | 'desc';
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  totalPages: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
  sort: SortTableState;
  onSortChange: (sort: SortTableState) => void;
  renderRow: (item: T) => React.ReactNode;
}

export default function Table<T>({ data, columns, totalPages, currentPage, onPageChange, sort, onSortChange, renderRow }: TableProps<T>) {

  const onSortHandler = (key: string) => {
    if (sort && sort.key === key) {
      switch (sort.type) {
        case 'desc':
          onSortChange({
            ...sort,
            type: 'asc'
          })
          break;
        case 'asc':
          onSortChange(null);
          break;
      }
    } else {
      onSortChange({
        key,
        type: 'desc',
      })
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="max-h-[calc(100%-60px)] overflow-auto relative grow-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map((col) => {
                  if (col.sortable) {
                    return (
                      <th className="px-4 py-2 text-xs font-medium text-gray-700" key={col.key}>
                        <button
                          className="flex items-center justify-between w-full cursor-pointer"
                          onClick={() => onSortHandler(col.key)}
                        >
                          <span>{col.label}</span>
                          <span className="flex flex-col items-center justify-center">
                            <CaretUpFilled className={col.key === sort?.key && sort.type === 'asc' ? 'text-sky-600!' : ''} />
                            <CaretDownFilled className={col.key === sort?.key && sort.type === 'desc' ? 'text-sky-600!' : ''} />
                          </span>
                        </button>
                      </th>
                    )
                  }
                  return (
                    <th
                      key={col.key}
                      className="px-4 py-2 text-right text-xs font-medium text-gray-700"
                    >
                      {col.label}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, id) => (
                <tr key={id}>{renderRow(item)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </>
  );
}