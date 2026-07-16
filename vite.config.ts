import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Always open the URL for the port Vite selected (it falls back if 5173 is busy).
    open: true,
  },
});
