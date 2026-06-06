// Server Component — "use client" nahi hai
// Data server pe fetch hota hai, browser ko already loaded page milta hai
import { getItems, Item } from "./lib/api";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
  let items: Item[] = [];

  try {
    items = await getItems();
  } catch {
    // Backend nahi chala — empty array, error client pe dikhega
  }

  // Items pehle se ready hain, browser ko sirf render karna hai
  return <ShopClient initialItems={items} />;
}