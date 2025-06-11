interface TableErrorProps {
  message: string;
  onCta: () => void;
}

export default function TableError({ message, onCta }: TableErrorProps) {
  return (
    <div className="w-full h-full flex flex-col rounded-2xl shadow-sm overflow-hidden bg-white border border-gray-200" dir="rtl">
      <div className="max-h-[calc(100%-60px)] overflow-auto grow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4" colSpan={4}>
                <span className="text-lg text-red-600">خطا</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="text-center pt-14">
                <div className="text-red-400">{message}</div>
                <button
                  className="mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:opacity-65 shadow"
                  onClick={onCta}
                >
                  تلاش مجدد
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
