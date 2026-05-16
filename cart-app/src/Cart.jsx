import { useCartStore } from "./cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

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
        <>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                {item.name} — ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={clear} style={{ marginTop: 12 }}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}
