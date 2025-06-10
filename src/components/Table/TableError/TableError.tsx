interface TableErrorProps {
  message: string;
  onCta: () => void;
}

export default function TableError({message, onCta}: TableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری داده‌ها</h2>
      <p className="text-gray-700 mb-6">لطفاً صفحه را دوباره بارگذاری کنید یا بعداً تلاش کنید.</p>
      <button
        onClick={() => onCta()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        بارگذاری مجدد
      </button>
    </div>
  );
}