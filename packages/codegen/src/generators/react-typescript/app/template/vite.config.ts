import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = '<%= portNumber %>';
const SERVER_URL = 'http://localhost';

export default defineConfig({
  assetsInclude: ['**/*.graphql'],
  plugins: [react()],
  server: {
    proxy: {
      '^/(graphql|login|logout)': `${SERVER_URL}:${PORT}`
    }
  }
});
