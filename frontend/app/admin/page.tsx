"use client";
import { useEffect, useState } from "react";
import { getItems, buyItem } from "../lib/api";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [paymentType, setPaymentType] = useState("Cash");
  const [cashAmount, setCashAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    return matchSearch && matchCategory;
  });

  const handleBuy = async () => {
    if (!selected) return;
    setLoading(true);
    const amount = paymentType === "Cash" ? parseFloat(cashAmount) : selected.price;
    const result = await buyItem(selected.id, paymentType, amount);
    setMessage(result);
    setLoading(false);
    setSelected(null);
    getItems().then(setItems);
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: "#1a1a2e", color: "white", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>🏧 Vend-O-Buddy</h1>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.7 }}>Smart Vending Machine System</p>
        </div>
        <a href="/admin" style={{ background: "#e94560", color: "white", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontSize: "13px" }}>Admin Panel →</a>
      </div>

      {/* SEARCH & FILTER */}
      <div style={{ padding: "20px 40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", width: "280px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" }}
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <span style={{ padding: "10px 0", fontSize: "13px", color: "#666" }}>{filtered.length} items</span>
      </div>

      {/* MESSAGE */}
      {message && (
        <div style={{ margin: "0 40px 16px", padding: "12px 16px", background: message.includes("successful") ? "#d4edda" : "#f8d7da", borderRadius: "8px", color: message.includes("successful") ? "#155724" : "#721c24", fontSize: "14px" }}>
          {message} <button onClick={() => setMessage("")} style={{ marginLeft: "12px", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>✕</button>
        </div>
      )}

      {/* ITEMS GRID */}
      <div style={{ padding: "0 40px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: item.quantity < 2 ? "2px solid #ff6b6b" : "1px solid #eee", position: "relative" }}>
            {item.quantity < 2 && <span style={{ position: "absolute", top: "8px", right: "8px", background: "#ff6b6b", color: "white", fontSize: "9px", padding: "2px 6px", borderRadius: "10px", fontWeight: "bold" }}>LOW STOCK</span>}
            <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase" }}>{item.category}</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e", marginBottom: "8px", lineHeight: "1.3" }}>{item.name}</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#e94560", marginBottom: "4px" }}>Rs. {item.price}</div>
            <div style={{ fontSize: "11px", color: item.quantity < 2 ? "#ff6b6b" : "#666", marginBottom: "12px" }}>Stock: {item.quantity}</div>
            <button
              onClick={() => { setSelected(item); setMessage(""); }}
              disabled={item.quantity === 0}
              style={{ width: "100%", padding: "8px", background: item.quantity === 0 ? "#ccc" : "#1a1a2e", color: "white", border: "none", borderRadius: "8px", cursor: item.quantity === 0 ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600" }}
            >
              {item.quantity === 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {/* PAYMENT MODAL */}
      {selected && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", width: "360px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ margin: "0 0 4px", color: "#1a1a2e" }}>💳 Payment</h2>
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>{selected.name} — Rs. {selected.price}</p>

            {/* Payment Tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {["Cash", "Card", "NFC"].map((p) => (
                <button key={p} onClick={() => setPaymentType(p)}
                  style={{ flex: 1, padding: "8px", border: "2px solid", borderColor: paymentType === p ? "#e94560" : "#eee", background: paymentType === p ? "#fff0f3" : "white", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: paymentType === p ? "600" : "400", color: paymentType === p ? "#e94560" : "#666" }}>
                  {p === "Cash" ? "💵" : p === "Card" ? "💳" : "📱"} {p}
                </button>
              ))}
            </div>

            {paymentType === "Cash" && (
              <input
                type="number"
                placeholder="Enter cash amount"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
              />
            )}
            {paymentType === "Card" && (
              <input
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
              />
            )}
            {paymentType === "NFC" && (
              <div style={{ textAlign: "center", padding: "16px", background: "#f0f9ff", borderRadius: "8px", marginBottom: "16px", fontSize: "14px", color: "#0369a1" }}>
                📱 Tap your device to pay Rs. {selected.price}
              </div>
            )}

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: "12px", background: "#f5f5f5", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
              <button onClick={handleBuy} disabled={loading} style={{ flex: 1, padding: "12px", background: "#e94560", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                {loading ? "Processing..." : "Confirm Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}