import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../back-end/public",
    emptyOutDir: true,
    target: "esnext",
  },
  server: {
    port: 4445, // Change this to your desired port
  },
});
