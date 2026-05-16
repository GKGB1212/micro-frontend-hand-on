import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "./Layout";
import Home from "./pages/Home";

const ProductList = lazy(() => import("product_app/ProductList"));
const Cart = lazy(() => import("cart_app/Cart"));

const withBoundary = (name, Component) => (
  <ErrorBoundary name={name}>
    <Suspense fallback={<div>⏳ Loading {name}...</div>}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="products"
            element={withBoundary("Products", ProductList)}
          />
          <Route path="cart" element={withBoundary("Cart", Cart)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
