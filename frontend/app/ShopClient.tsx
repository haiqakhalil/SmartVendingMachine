"use client";

import { useState } from "react";
import { buyItem, Item } from "./lib/api";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  Drinks: "🥤",
  Snacks: "🍪",
  Water: "💧",
  Energy: "⚡",
};

type PaymentType = "Cash" | "Card" | "NFC";

export default function ShopClient({ initialItems }: { initialItems: Item[] }) {
  // initialItems server se aaye hain — pehle se loaded!
  const [items, setItems] = useState<Item[]>(initialItems);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<Item | null>(null);
  const [payType, setPayType] = useState<PaymentType>("Cash");
  const [cashInput, setCashInput] = useState("");
  const [buying, setBuying] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleBuy() {
    if (!modal) return;
    if (payType === "Cash") {
      const given = parseFloat(cashInput);
      if (isNaN(given) || given < modal.price) {
        showToast("Amount kam hai!", false);
        return;
      }
    }
    setBuying(true);
    try {
      const msg = await buyItem(modal.id, payType, parseFloat(cashInput) || modal.price);
      // Quantity locally update karo — page reload nahi chahiye
      setItems((prev) =>
        prev.map((i) => (i.id === modal.id ? { ...i, quantity: i.quantity - 1 } : i))
      );
      showToast(msg);
      setModal(null);
      setCashInput("");
    } catch {
      showToast("Purchase fail ho gayi!", false);
    } finally {
      setBuying(false);
    }
  }

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  function stockClass(qty: number) {
    if (qty === 0) return "bg-red-50 text-red-700 border border-red-200";
    if (qty < 2) return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  function stockLabel(qty: number) {
    if (qty === 0) return "Out of stock";
    if (qty < 2) return "Low stock";
    return `${qty} left`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏪</span>
            <span className="font-semibold text-gray-900 text-lg">Vend-O-Buddy</span>
          </div>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            Admin Panel →
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Backend down hone par message */}
        {items.length === 0 && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
            ⚠️ Items load nahi hue — Spring Boot chal raha hai? (<code>localhost:8080</code>)
          </div>
        )}

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                filter === cat
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items grid — NO skeleton, data already here */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col hover:border-gray-200 transition-colors"
            >
              <div className="text-3xl mb-2">{CATEGORY_ICONS[item.category] || "📦"}</div>
              <div className="font-medium text-gray-900 text-sm mb-0.5">{item.name}</div>
              <div className="text-xs text-gray-400 mb-3">{item.category}</div>
              <div className="flex items-center justify-between mb-3 mt-auto">
                <span className="font-semibold text-emerald-700 text-base">Rs.{item.price}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${stockClass(item.quantity)}`}>
                  {stockLabel(item.quantity)}
                </span>
              </div>
              <button
                disabled={item.quantity === 0}
                onClick={() => {
                  setModal(item);
                  setPayType("Cash");
                  setCashInput("");
                }}
                className="w-full py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {item.quantity === 0 ? "Out of stock" : "Buy now"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && items.length > 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            Is category mein koi item nahi
          </div>
        )}
      </main>

      {/* Buy Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="font-semibold text-gray-900 mb-1">{modal.name}</div>
            <div className="text-2xl font-bold text-emerald-600 mb-5">Rs.{modal.price}</div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {(["Cash", "Card", "NFC"] as PaymentType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPayType(p)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-colors ${
                    payType === p
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p === "Cash" ? "💵" : p === "Card" ? "💳" : "📲"}
                  <br />
                  <span className="text-xs">{p}</span>
                </button>
              ))}
            </div>

            {payType === "Cash" && (
              <input
                type="number"
                placeholder={`Rs.${modal.price} ya zyada dein`}
                value={cashInput}
                onChange={(e) => setCashInput(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 outline-none focus:border-emerald-400"
              />
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                disabled={buying}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 transition-colors"
              >
                {buying ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl text-sm font-medium border z-50 ${
            toast.ok
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {toast.ok ? "✅" : "❌"} {toast.msg}
        </div>
      )}
    </div>
  );
}