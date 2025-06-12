interface TableRowsSkeletonProps {
  rows: number;
  colomns: number;
}

export default function TableRowsSkeleton({ rows, colomns }: TableRowsSkeletonProps) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={`skeleton-${rowIndex}`} className="animate-pulse">
      {Array.from({ length: colomns }).map((_, colIndex) => (
        <td key={colIndex} className="px-4 py-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  ));
}