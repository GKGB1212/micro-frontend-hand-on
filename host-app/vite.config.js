import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ============================================================
// VITE CONFIG — HOST APP (SHELL)
// ============================================================
// App này đóng vai trò HOST. Nó CONSUME các remote app
// (product_app, cart_app) qua Module Federation.
// Host không expose gì cả, chỉ "tiêu thụ".
// ============================================================

export default defineConfig({
  plugins: [
    react(),
    federation({
      // Tên host (chỉ để định danh, không quan trọng vì host không expose)
      name: "host_app",

      // QUAN TRỌNG: khai báo danh sách remote sẽ consume.
      //   key   = tên alias dùng khi import
      //   value = URL FULL trỏ đến remoteEntry.js của remote
      // Production: thay localhost bằng domain thật (vd https://product.shopmart.com)
      remotes: {
        product_app: "http://localhost:5174/assets/remoteEntry.js",
        cart_app: "http://localhost:5175/assets/remoteEntry.js",
      },

      // BẮT BUỘC khai báo shared deps GIỐNG remote.
      // Federation runtime sẽ negotiate version để dùng chung.
      // Nếu host khai báo React 18 và remote khai báo React 17 → conflict.
      shared: ["react", "react-dom", "zustand"],
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
