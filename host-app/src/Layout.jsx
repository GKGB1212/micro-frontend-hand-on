import { Link, Outlet } from "react-router-dom";
import { useCartStore } from "./cartStore";

export default function Layout() {
  const cartCount = useCartStore((state) => state.items.length);

  const linkStyle = {
    padding: "8px 16px",
    textDecoration: "none",
    color: "white",
    background: "#333",
    borderRadius: 6,
  };

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <header
        style={{
          padding: 20,
          background: "#222",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <h1 style={{ margin: 0, marginRight: 20 }}>🏪 ShopMart</h1>
        <nav style={{ display: "flex", gap: 12, flex: 1 }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/cart" style={linkStyle}>
            Cart 🛒 <strong>({cartCount})</strong>
          </Link>
        </nav>
      </header>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
