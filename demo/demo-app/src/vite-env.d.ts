/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string;
  readonly VITE_LOGIN_URI: string;
  readonly VITE_LOGOUT_URI: string;
  readonly VITE_REQUEST_SAME_ORIGIN: boolean;
  readonly VITE_DEV_LOGIN: string;
  readonly VITE_DEV_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
