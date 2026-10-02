import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  build: { assetsInlineLimit: 0 },
  plugins: [
    // Karten (PNG) beim Build verlustarm auf eine 8-Bit-Palette reduzieren; die Originale in assets/ bleiben unverändert.
    ViteImageOptimizer({ test: /\.png$/i, png: { palette: true, quality: 80, effort: 10 } }),
    // Text-Dateien vorab als .gz und .br ablegen (PNGs sind bereits komprimiert).
    compression({ algorithms: ['gzip', 'brotliCompress'], include: /\.(html|js|css|json|svg)$/i, threshold: 0 }),
  ],
  test: { include: ['src/**/*.test.ts'] },
});
