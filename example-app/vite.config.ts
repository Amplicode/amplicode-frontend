import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = "8080";
const SERVER_URL = "http://localhost";
const LOGIN_BASE_URL = "login";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      [`^/(graphql|${LOGIN_BASE_URL}|logout)`]: `${SERVER_URL}:${PORT}`
    }
  }
});
