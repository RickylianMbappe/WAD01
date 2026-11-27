import { useEffect, useMemo, useState } from "react";
import { menuItems } from "../data/menuItems.js";

const STORAGE_KEY = "ricofeer:keranjang";

function readCart() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const cart = JSON.parse(stored);
    if (!Array.isArray(cart)) return [];

    return cart.filter(
      (item) =>
        Number.isInteger(item.id) &&
        Number.isInteger(item.qty) &&
        item.qty > 0 &&
        menuItems.some((menuItem) => menuItem.id === item.id),
    );
  } catch (error) {
    console.warn("Gagal membaca keranjang:", error);
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn("Gagal menyimpan keranjang:", error);
    }
  }, [cart]);

  const count = useMemo(
    () => cart.reduce((total, item) => total + item.qty, 0),
    [cart],
  );

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const menuItem = menuItems.find(({ id }) => id === item.id);
        return sum + (menuItem ? menuItem.price * item.qty : 0);
      }, 0),
    [cart],
  );

  function addItem(id) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...currentCart, { id, qty: 1 }];
    });
  }

  function removeOne(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  function removeItem(id) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  return { cart, count, total, addItem, removeOne, removeItem };
}
