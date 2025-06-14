import { startTransition, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import SearchBox from "../../components/SearchBox/SearchBox";
import TableError from "../../components/Table/TableError/TableError";
import TableLoading from "../../components/Table/TableLoading/TableLoading";
import { useDebounce } from "../../hooks/use-debounce";
import ProductsTable from "./components/ProductsTable/ProductsTable";
import { useSyncSearchParam } from "../../hooks/use-sync-search-param";


export default function Products() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchText, setSearchText] = useState<string>(initialSearch);
  const debouncedSearchText = useDebounce(searchText, 700);

  useSyncSearchParam('search', debouncedSearchText);

  const searchTextchangeHandler = (value: string) => {
    startTransition(() => {
      setSearchText(value);
    });
  }

  return (
    <>
      <div className="flex flex-col h-full p-2" dir="rtl">
        <SearchBox searchText={searchText} onSearchTextchange={searchTextchangeHandler} placeholder="عنوان محصول ..." classes="max-w-sm" />

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
                  <ProductsTable searchText={debouncedSearchText} key={debouncedSearchText} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </div>
    </>
  );
}
