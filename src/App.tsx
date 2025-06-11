import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./styles.css";

const Products = lazy(() => import('./pages/products/Products'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/products" replace />} />
      <Route path="/products" element={
        <Suspense fallback={<div className="h-full flex items-center justify-center">در حال بارگذاری ...</div>}>
          <Products />
        </Suspense>
      } />
    </Routes>
  )
}

export default App;