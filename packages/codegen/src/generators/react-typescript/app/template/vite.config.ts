import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const PORT = "<%= portNumber %>";
const SERVER_URL = "http://localhost";
const LOGIN_BASE_URL = "login";
const BASE_URL = process.env.BASE_URL ?? "/";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      [`^/(graphql|${LOGIN_BASE_URL}|logout)`]: `${SERVER_URL}:${PORT}`,
    },
    base: `${BASE_URL}`
  }
});
