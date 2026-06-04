const BASE = "http://localhost:8080/api";

export const getItems = async () => {
  const res = await fetch(`${BASE}/items`);
  return res.json();
};

export const buyItem = async (itemId: number, paymentType: string, amountGiven: number) => {
  const res = await fetch(`${BASE}/vending/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, paymentType, amountGiven }),
  });
  return res.text();
};

export const getTransactions = async () => {
  const res = await fetch(`${BASE}/transactions`);
  return res.json();
};

export const addItem = async (item: any) => {
  const res = await fetch(`${BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const deleteItem = async (id: number) => {
  await fetch(`${BASE}/items/${id}`, { method: "DELETE" });
};

export const restockItem = async (itemId: number, quantityAdded: number) => {
  const res = await fetch(`${BASE}/restock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, quantityAdded }),
  });
  return res.text();
};

export const operatorLogin = async (username: string, password: string) => {
  const res = await fetch(`${BASE}/operators/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.text();
};