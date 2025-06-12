export function getPaginationPageNumbers(currentPage: number, totalPages: number): number[] {
  const range: number[] = [];

  // -1 is elipsis
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) range.push(i);
  } else {
    if (currentPage <= 4) {
      range.push(1, 2, 3, 4, 5, -1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      range.push(1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages);
    }
  }

  return range;
}