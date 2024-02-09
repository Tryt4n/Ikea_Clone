import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1200,
    viewportHeight: 1400,
    experimentalRunAllSpecs: true,
  },
});
