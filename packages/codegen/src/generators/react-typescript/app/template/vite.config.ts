import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = '<%= portNumber %>';
const SERVER_URL = 'http://localhost';

// Do not inline or change this variable as it can be changed by Amplicode Studio code generation.
const AMPLICODE_ENDPOINTS = 'graphql';

export default defineConfig({
  assetsInclude: ['**/*.graphql'],
  plugins: [react()],
  server: {
    proxy: {
      [`^/(${AMPLICODE_ENDPOINTS})`]: `${SERVER_URL}:${PORT}`,
    }
  }
});