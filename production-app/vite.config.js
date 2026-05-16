import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ============================================================
// VITE CONFIG — PRODUCT APP (REMOTE)
// ============================================================
// App này đóng vai trò REMOTE trong Module Federation.
// Nó EXPOSE component ra ngoài để host-app có thể consume
// qua HTTP lúc runtime (không phải import như npm package).
// ============================================================

export default defineConfig({
  plugins: [
    react(),

    // --------------------------------------------------------
    // MODULE FEDERATION PLUGIN
    // --------------------------------------------------------
    // Plugin này biến app thành 1 "remote" có thể được app
    // khác (host) tải qua mạng lúc runtime.
    // --------------------------------------------------------
    federation({
      // Tên định danh của remote. Host sẽ tham chiếu bằng tên này.
      // LƯU Ý: dùng "_" không dùng "-" vì JS không cho "-" trong identifier.
      name: "product_app",

      // Tên file "manifest" sinh ra sau khi build.
      // Host sẽ fetch file này đầu tiên để biết remote có gì.
      // Đường dẫn cuối cùng: dist/assets/remoteEntry.js
      filename: "remoteEntry.js",

      // Danh sách module mà remote cho phép host import.
      //   key   = tên public (host import bằng tên này)
      //   value = đường dẫn file thật trong source
      // Ví dụ host sẽ viết: import ProductList from "product_app/ProductList"
      exposes: {
        "./ProductList": "./src/ProductList.jsx",
      },

      // Dependency dùng CHUNG giữa host và remote.
      // Nếu không khai báo: mỗi app sẽ load React riêng → bundle x2,
      // gây lỗi "Invalid hook call" vì 2 instance React khác nhau.
      // Federation runtime sẽ tự negotiate version giữa host và remote.
      shared: ["react", "react-dom", "zustand"],
    }),
  ],

  // --------------------------------------------------------
  // DEV SERVER (chạy khi: npm run dev)
  // --------------------------------------------------------
  // LƯU Ý QUAN TRỌNG: vite-plugin-federation KHÔNG hoạt động
  // đầy đủ ở dev mode. Để test federation thật, phải build +
  // preview. Đây là limitation lớn so với Webpack MF.
  // --------------------------------------------------------
  server: {
    port: 5174, // Port cố định để host biết URL fetch remoteEntry
    strictPort: true, // Báo lỗi nếu port bị chiếm (không tự nhảy port khác)
  },

  // --------------------------------------------------------
  // PREVIEW SERVER (chạy khi: npm run preview)
  // --------------------------------------------------------
  // Đây là môi trường TEST federation chuẩn:
  //   1. npm run build  → sinh ra dist/ chứa remoteEntry.js
  //   2. npm run preview → serve dist/ ở port này
  // --------------------------------------------------------
  preview: {
    port: 5174,
    strictPort: true,
  },

  // --------------------------------------------------------
  // BUILD CONFIG
  // --------------------------------------------------------
  // Federation chỉ khai báo "expose cái gì". Còn output bundle
  // ra hình thù nào là việc của build config bên dưới.
  // Federation YÊU CẦU build phải có 1 số đặc tính cụ thể:
  // --------------------------------------------------------
  build: {
    // BẮT BUỘC. Federation cần dynamic import() và ESM hiện đại
    // để fetch remote module qua mạng. Nếu để mặc định (target
    // ~ES2019) sẽ lỗi "Cannot use import statement" lúc runtime.
    target: "esnext",

    // TUỲ CHỌN. Tắt minify để đọc được remoteEntry.js khi học.
    // Production: nên BẬT minify (xoá dòng này) để giảm bundle size.
    minify: false,

    // QUAN TRỌNG. Mặc định Vite tách CSS thành nhiều file nhỏ
    // theo từng component. Khi host load remote, federation
    // KHÔNG tự fetch các file CSS này → component render mất style.
    // Gộp CSS vào 1 file để federation runtime inject đúng cách.
    cssCodeSplit: false,
  },
});
