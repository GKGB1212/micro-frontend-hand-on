import { useState } from "react";
import { useCartStore } from "./cartStore";

const products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "MacBook Pro", price: 2499 },
  { id: 3, name: "AirPods Pro", price: 249 },
];

export default function ProductList() {
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product) => {
    addItem(product);
    setMessage(`✅ Added ${product.name} to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ padding: 20, border: "2px solid blue", borderRadius: 8 }}>
      <h2>🛍️ Product List (from product-app)</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong> — ${p.price}
            <button onClick={() => handleAddToCart(p)} style={{ marginLeft: 12 }}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
