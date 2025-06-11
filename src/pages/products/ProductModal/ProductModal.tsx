import { ProductModel } from "../../../api/types/products";

interface ProductModalProps {
  product: ProductModel
}

export default function ProductModal({ product }: ProductModalProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="w-32 h-32 rounded-md shadow-md shrink-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.category} • {product.brand}</p>
          <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
        </div>
      </div>

      <div dir="rtl" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">

          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">قیمت:</span>
            <span>${product.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">تخفیف:</span>
            <span>٪ {product.discountPercentage}</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">امتیاز:</span>
            <span>{product.rating}/5</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">گارانتی:</span>
            <span>{product.warrantyInformation}</span>
          </div>

          <div className="flex items-center justify-between col-span-1 sm:col-span-2 sm:justify-center sm:gap-2 pt-1">
            <span className="text-gray-600 font-medium">سیاست بازگشت:</span>
            <span>{product.returnPolicy}</span>
          </div>

        </div>
      </div>
    </div>
  );
}