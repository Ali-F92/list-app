import { TablePagination } from "./TablePagination/TablePagination";
import CaretUpFilled from "@ant-design/icons/CaretUpFilled";
import CaretDownFilled from "@ant-design/icons/CaretDownFilled";

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

export default function Table<T extends { id: any }>({ data, columns, totalPages, currentPage, onPageChange, sort, onSortChange, renderRow }: TableProps<T>) {

  const onSortHandler = (key: string) => {
    if (sort && sort.key === key) {
      onSortChange(sort.type === 'asc' ? null : { ...sort, type: 'asc' });
    } else {
      onSortChange({
        key,
        type: 'desc',
      })
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col rounded-2xl shadow-sm overflow-hidden bg-white border border-gray-200" dir="rtl">
        <div className="max-h-[calc(100%-60px)] overflow-auto grow">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 py-1 text-right font-medium text-gray-700 whitespace-nowrap"
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => onSortHandler(col.key)}
                        className={
                          `flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors cursor-pointer ${col.key === sort?.key ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`
                        }
                      >
                        <span>{col.label}</span>
                        <span className="flex flex-col items-center justify-center ml-2">
                          <CaretUpFilled
                            className={`text-xs ${col.key === sort?.key && sort.type === "asc" ? "text-blue-600!" : "text-gray-400!"}`}
                          />
                          <CaretDownFilled
                            className={`text-xs ${col.key === sort?.key && sort.type === "desc" ? "text-blue-600!" : "text-gray-400!"}`}
                          />
                        </span>
                      </button>
                    ) : (
                      <div className="px-4 py-2">
                        {col.label}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {renderRow(item)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}