export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to ShopMart 👋</h2>
      <p>Click nav để xem Products hoặc Cart.</p>
      <p style={{ color: "gray", fontSize: 14 }}>
        💡 Mỗi route load 1 app khác nhau qua Module Federation.
      </p>
    </div>
  );
}
