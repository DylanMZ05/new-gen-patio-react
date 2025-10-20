import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      // Activa el análisis solo cuando corras: ANALYZE=1 npm run build
      process.env.ANALYZE
        ? visualizer({
            filename: "stats.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: true,
          })
        : undefined,
    ].filter(Boolean),

    define: {
      // A algunos paquetes todavía les sirve esta clave para purgar código dev
      "process.env.NODE_ENV": JSON.stringify(mode),
    },

    // Solo afecta a dev, pero ayuda a tree-shaking real en libs modulares
    optimizeDeps: {
      include: ["framer-motion", "react-router-dom", "react-helmet-async"],
    },

    build: {
      target: "es2020",
      // Mantené sourcemaps solo cuando los necesites
      sourcemap: !isProd ? true : false,
      minify: "esbuild",
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      chunkSizeWarningLimit: 900,

      // Eliminar ruido en prod
      terserOptions: undefined, // (usamos esbuild)
      rollupOptions: {
        treeshake: "recommended",
        output: {
          // Split inteligente de vendors pesados para que se descarguen bajo demanda
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "router-vendor": ["react-router-dom"],
            "motion-vendor": ["framer-motion"],
            "helmet-vendor": ["react-helmet-async"],
          },
          // nombres con hash para mejor cache
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      // Purgar console/debugger del JS final (via esbuild)
      esbuild: {
        drop: isProd ? ["console", "debugger"] : [],
        legalComments: "none",
      },
    },
  };
});
