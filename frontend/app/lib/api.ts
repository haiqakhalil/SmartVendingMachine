const BASE = "http://localhost:8080/api";

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Transaction {
  id: number;
  itemName: string;
  amount: number;
  paymentType: string;
  purchasedAt: string;
}

export interface RestockLog {
  id: number;
  itemName: string;
  quantityAdded: number;
  restockedAt: string;
}

// Items
export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${BASE}/items`, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not fetch items");
  return res.json();
}

export async function addItem(item: Omit<Item, "id">): Promise<Item> {
  const res = await fetch(`${BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateItem(id: number, item: Partial<Item>): Promise<Item> {
  const res = await fetch(`${BASE}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(id: number): Promise<void> {
  await fetch(`${BASE}/items/${id}`, { method: "DELETE" });
}

// Buy
export async function buyItem(itemId: number, paymentType: string, amountGiven: number): Promise<string> {
  const res = await fetch(`${BASE}/vending/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, paymentType, amountGiven }),
  });
  return res.text();
}

// Transactions
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE}/transactions`, { cache: "no-store" });
  return res.json();
}

// Restock
export async function restockItem(itemId: number, quantityAdded: number): Promise<string> {
  const res = await fetch(`${BASE}/restock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, quantityAdded }),
  });
  return res.text();
}

export async function getRestockLogs(): Promise<RestockLog[]> {
  const res = await fetch(`${BASE}/restock/logs`, { cache: "no-store" });
  return res.json();
}

// Login
export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/operators/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.text();
}