import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      tsconfigPath: "./tsconfig.json",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "@flizpay-de/banks",
      fileName: "@flizpay-de/banks",
    },
    rollupOptions: {
      external: (id) => id.endsWith(".schema.json"),
      output: {
        globals: {
          "@/lib/schemas/bankFields.schema.json": "BankFieldsSchema",
          "@/lib/schemas/banks.schema.json": "BanksSchema"
        }
      }
    },
  },
});
