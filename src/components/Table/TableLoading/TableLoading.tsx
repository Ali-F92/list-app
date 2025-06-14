import TableRowsSkeleton from "./TableRowsSkeleton/TableRowsSkeleton";

export default function TableLoading() {
  return (
    <div className="w-full h-full flex flex-col rounded-2xl shadow-sm overflow-hidden bg-white border border-gray-200" dir="rtl">
      <div className="max-h-[calc(100%-60px)] overflow-auto grow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4" colSpan={4}>
                <span className="text-sm text-gray-400">در حال بارگذاری...</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <TableRowsSkeleton rows={5} colomns={4} />
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 px-4 py-4 bg-gray-50" dir="rtl">
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            ))}
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}