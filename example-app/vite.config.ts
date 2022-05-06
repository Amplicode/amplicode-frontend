import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = "8080";
const SERVER_URL = "http://localhost";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      "^/(graphql|login|logout)": `${SERVER_URL}:${PORT}`
    }
  }
});
