// export default function TableLoading() {
//   return (
//     <div className="py-12 text-center text-gray-500 animate-pulse">
//       Loading...
//     </div>
//   );
// }
import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const ROWS = 5;
const COLUMNS = 4;

const SkeletonInput = ({ width = 80, height = 20 }) => (
  <div
    className="bg-gray-300 animate-pulse rounded"
    style={{ width, height, minWidth: 20 }}
  />
);

const TableLoading = () => {
  // simulate header skeletons
  const headers = Array.from({ length: COLUMNS });
  const rows = Array.from({ length: ROWS });

  // For pagination skeleton, we render a few squares and the prev/next icons
  const paginationItems = Array.from({ length: 5 });

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <div
          className="bg-gray-300 animate-pulse rounded h-7 w-10"
        />
        {paginationItems.map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 animate-pulse rounded h-7 w-8"
          />
        ))}
        <div
          className="bg-gray-300 animate-pulse rounded h-7 w-10"
        />
      </div>
      <div className="p-4 bg-white rounded shadow max-w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((_, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <SkeletonInput width={80} height={16} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {headers.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <SkeletonInput height={20} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination skeleton */}
        <div className="mt-4 flex items-center justify-end space-x-2 select-none">
          <div className="p-1 rounded cursor-not-allowed text-gray-400">
            <LeftOutlined />
          </div>
          {paginationItems.map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 animate-pulse rounded h-6 w-6"
            />
          ))}
          <div className="p-1 rounded cursor-not-allowed text-gray-400">
            <RightOutlined />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableLoading;