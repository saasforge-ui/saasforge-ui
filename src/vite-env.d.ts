/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_KOFI_PRODUCT_URL?: string;
  readonly VITE_KOFI_ULTIMATE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
