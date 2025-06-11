import { Suspense, useState } from "react";
import ProductsTable from "./ProductsTable/ProductsTable";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import SearchBox from "../../components/SearchBox/SearchBox";
import TableError from "../../components/Table/TableError/TableError";
import TableLoading from "../../components/Table/TableLoading/TableLoading";

export default function Products() {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <div className="flex flex-col h-full p-2" dir="rtl">
        <SearchBox searchText={searchText} setSearchText={setSearchText} placeholder="عنوان محصول ..." classes="max-w-sm" />

        <div className="flex-1 mt-2 overflow-y-auto">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary, error }) => (
                  <TableError message={error.message} onCta={resetErrorBoundary} />
                )}
              >
                <Suspense fallback={<TableLoading />}>
                  <ProductsTable searchText={searchText} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </div>
    </>
  );
}