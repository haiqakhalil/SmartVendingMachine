"use client";

import { useEffect, useState } from "react";
import {
  getItems,
  getTransactions,
  getRestockLogs,
  restockItem,
  deleteItem,
  login,
  Item,
  Transaction,
  RestockLog,
} from "../lib/api";
import Link from "next/link";

type Tab = "items" | "transactions" | "restock";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState<Item[]>([]);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [logs, setLogs] = useState<RestockLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (loggedIn) loadAll();
  }, [loggedIn]);

  async function loadAll() {
    setLoading(true);
    try {
      const [i, t, l] = await Promise.all([getItems(), getTransactions(), getRestockLogs()]);
      setItems(i);
      setTxns(t);
      setLogs(l);
    } catch {
      showToast("Data load fail hua!", false);
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleLogin() {
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await login(username, password);
      if (res.toLowerCase().includes("successful")) {
        setLoggedIn(true);
      } else {
        setLoginError(res);
      }
    } catch {
      setLoginError("Backend se connect nahi ho saka!");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleRestock(itemId: number, qty: number) {
    try {
      const msg = await restockItem(itemId, qty);
      showToast(msg);
      loadAll();
    } catch {
      showToast("Restock fail!", false);
    }
  }

  async function handleDelete(itemId: number, name: string) {
    if (!confirm(`"${name}" delete karna hai?`)) return;
    try {
      await deleteItem(itemId);
      showToast(`${name} delete ho gaya`);
      loadAll();
    } catch {
      showToast("Delete fail!", false);
    }
  }

  function fmtTime(dt: string) {
    return new Date(dt).toLocaleString("en-PK", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function stockClass(qty: number) {
    if (qty === 0) return "bg-red-50 text-red-700 border border-red-200";
    if (qty < 2) return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  // ── Login Screen ──
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
          <div className="text-2xl mb-1">🔐</div>
          <h1 className="font-semibold text-gray-900 text-lg mb-1">Admin Login</h1>
          <p className="text-sm text-gray-400 mb-6">Vend-O-Buddy admin panel</p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {loginError}
            </div>
          )}

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loggingIn || !username || !password}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {loggingIn ? "Checking..." : "Login"}
          </button>

          <Link href="/" className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-4">
            ← Shop pe wapas jao
          </Link>
        </div>
      </div>
    );
  }

  // ── Admin Panel ──
  const TABS: { k: Tab; label: string }[] = [
    { k: "items", label: "Items" },
    { k: "transactions", label: "Transactions" },
    { k: "restock", label: "Restock" },
  ];

  const totalRevenue = txns.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <span className="font-semibold text-gray-900">Admin Panel</span>
            <div className="hidden sm:flex gap-1 ml-2">
              {TABS.map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    tab === t.k
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadAll}
              className="text-sm text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="text-sm text-gray-400 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Mobile tabs */}
        <div className="sm:hidden flex border-t border-gray-100">
          {TABS.map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                tab === t.k ? "text-emerald-700 border-b-2 border-emerald-600" : "text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-28 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* ── Items Tab ── */}
            {tab === "items" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5 mb-2">{item.category}</div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-emerald-700">Rs.{item.price}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${stockClass(item.quantity)}`}>
                            {item.quantity} left
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none ml-2"
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {items.length === 0 && (
                  <div className="text-center py-16 text-gray-400 text-sm">Koi item nahi</div>
                )}
              </div>
            )}

            {/* ── Transactions Tab ── */}
            {tab === "transactions" && (
              <div>
                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Total revenue", val: `Rs.${totalRevenue.toLocaleString()}` },
                    { label: "Transactions", val: txns.length },
                    { label: "Avg. sale", val: `Rs.${txns.length ? Math.round(totalRevenue / txns.length) : 0}` },
                  ].map((m) => (
                    <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                      <div className="text-xs text-gray-400 mb-1">{m.label}</div>
                      <div className="text-xl font-semibold text-gray-900">{m.val}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Item</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Amount</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Payment</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {txns.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-10 text-gray-400">
                            Koi transaction nahi
                          </td>
                        </tr>
                      ) : (
                        txns.map((t) => (
                          <tr key={t.id} className="border-b border-gray-50 last:border-0">
                            <td className="px-4 py-3 font-medium text-gray-800">{t.itemName}</td>
                            <td className="px-4 py-3 text-emerald-700 font-medium">Rs.{t.amount}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full border ${
                                  t.paymentType === "Cash"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : t.paymentType === "Card"
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                              >
                                {t.paymentType}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-400">{fmtTime(t.purchasedAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Restock Tab ── */}
            {tab === "restock" && (
              <div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-4 py-3 ${
                        idx !== items.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="font-medium text-gray-900 text-sm truncate">{item.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${stockClass(item.quantity)}`}>
                          {item.quantity} left
                        </span>
                      </div>
                      <div className="flex gap-1.5 ml-3 shrink-0">
                        {[5, 10, 20].map((qty) => (
                          <button
                            key={qty}
                            onClick={() => handleRestock(item.id, qty)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                          >
                            +{qty}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {logs.length > 0 && (
                  <>
                    <h2 className="text-sm font-medium text-gray-500 mb-3">Restock history</h2>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      {logs.map((log, idx) => (
                        <div
                          key={log.id}
                          className={`flex items-center justify-between px-4 py-3 ${
                            idx !== logs.length - 1 ? "border-b border-gray-50" : ""
                          }`}
                        >
                          <span className="text-sm text-gray-800">{log.itemName}</span>
                          <span className="text-sm font-medium text-emerald-600">+{log.quantityAdded} added</span>
                          <span className="text-xs text-gray-400">{fmtTime(log.restockedAt)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>

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