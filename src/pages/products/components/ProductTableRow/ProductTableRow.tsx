import { ProductModel } from "../../../../api/types/products";

interface ProductTableRowProps {
  product: ProductModel,
  onDetailsClick: (product: ProductModel) => void
}

export default function ProductTableRow({ product, onDetailsClick }: ProductTableRowProps) {
  return (
    <>
      <td className="px-4 py-4">{product.title}</td>
      <td className="px-4 py-4">{product.category}</td>
      <td className="px-4 py-4">{product.price}</td>
      <td className="px-4 py-4">{product.discountPercentage}</td>
      <td className="px-4 py-4">
        <button
          onClick={() => onDetailsClick(product)}
          className="text-blue-600 hover:underline text-sm cursor-pointer focus:outline-none"
        >
          جزئیات
        </button>
      </td>
    </>
  );
}