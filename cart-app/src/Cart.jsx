import { useEffect, useState } from "react";
import { EVENTS, on } from "./eventBus";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 🔥 Subscribe to CART_ADD event
    const off = on(EVENTS.CART_ADD, (product) => {
      setItems((prev) => [...prev, product]);
    });

    return off; // cleanup khi unmount
  }, []);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20, border: "2px solid orange", borderRadius: 8 }}>
      <h2>🛒 Cart (from cart-app)</h2>
      <p>
        Items: <strong>{items.length}</strong> | Total:{" "}
        <strong>${total}</strong>
      </p>
      {items.length === 0 ? (
        <p style={{ color: "gray" }}>Cart is empty</p>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.name} — ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
