// ==========================================
// CART STORE — Shared singleton via window
// ==========================================
// Mục tiêu: tất cả MFE dùng CHUNG 1 instance store.
// Vì mỗi MFE import file này riêng, nếu để create()
// chạy bình thường → mỗi app có 1 store khác nhau.
// → Trick: gắn store vào window, lần sau reuse.
// ==========================================

import { create } from "zustand";

if (!window.__cartStore) {
  window.__cartStore = create((set) => ({
    items: [],

    addItem: (product) =>
      set((state) => ({ items: [...state.items, product] })),

    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

    clear: () => set({ items: [] }),
  }));
}

export const useCartStore = window.__cartStore;
