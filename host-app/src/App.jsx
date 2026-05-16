import { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Lazy import từ remote — federation plugin sẽ resolve các path này
const ProductList = lazy(() => import("product_app/ProductList"));
const Cart = lazy(() => import("cart_app/Cart"));

function App() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <header style={{ marginBottom: 20 }}>
        <h1>🏪 ShopMart (Host App)</h1>
        <p style={{ color: "gray" }}>
          Đây là host shell. 2 box bên dưới được load từ 2 app riêng biệt
          qua Module Federation.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <ErrorBoundary name="Product App">
          <Suspense fallback={<div>⏳ Loading Product App...</div>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary name="Cart App">
          <Suspense fallback={<div>⏳ Loading Cart App...</div>}>
            <Cart />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
