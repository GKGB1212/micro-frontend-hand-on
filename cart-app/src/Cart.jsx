import { useState } from 'react'

export default function Cart() {
  const [items, setItems] = useState([])

  return (
    <div style={{ padding: 20, border: '2px solid orange', borderRadius: 8 }}>
      <h2>🛒 Cart (from cart-app)</h2>
      <p>Items in cart: <strong>{items.length}</strong></p>
      {items.length === 0 ? (
        <p style={{ color: 'gray' }}>Cart is empty</p>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item.name} — ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
