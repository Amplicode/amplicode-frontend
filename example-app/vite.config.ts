import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": "http://localhost:8080",
      "/login": "http://localhost:8080",
      "/logout": "http://localhost:8080"
    }
  }
});
