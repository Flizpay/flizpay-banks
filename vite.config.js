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
      staticImport: true,
      include: ["lib/**/*.ts"],
      entryRoot: "./lib",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "@flizpay-de/banks",
      fileName: "@flizpay-de/banks",
    },
    rollupOptions: {
      // Keep JSON files as external dependencies
      external: (id) => id.endsWith(".schema.json"),
      // Preserve paths structure in imports
      // preserveModules: true,
      // preserveModulesRoot: "lib",
      output: {
        paths: {
          "@/lib/schemas/bankFields.schema.json":
            "../../lib/schemas/bankFields.schema.json",
          "@/lib/schemas/banks.schema.json":
            "../../lib/schemas/banks.schema.json",
        },
        globals: {
          "@/lib/schemas/bankFields.schema.json": "BankFieldsSchema",
          "@/lib/schemas/banks.schema.json": "BankSchema",
        },
      },
    },
  },
});
