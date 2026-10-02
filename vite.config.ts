import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  build: { assetsInlineLimit: 0 },
  plugins: [
    // Karten (PNG) beim Build verlustarm auf eine 8-Bit-Palette reduzieren; die Originale in assets/ bleiben unverändert.
    // public/ (App-Icons) bleibt unberührt, sonst passen die Prüfsummen im Service-Worker-Cache nicht mehr.
    ViteImageOptimizer({ test: /\.png$/i, includePublic: false, png: { palette: true, quality: 80, effort: 10 } }),
    // Offline-Betrieb: Service Worker legt beim ersten Aufruf die gesamte App inkl. aller Karten in den Cache.
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Fantasie-Game',
        short_name: 'Fantasie',
        description: 'Karten ziehen und eigene Geschichten erzählen.',
        lang: 'de',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f6efe2',
        theme_color: '#f6efe2',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,png,webmanifest}'],
        navigateFallback: 'index.html',
      },
    }),
    // Text-Dateien vorab als .gz und .br ablegen (PNGs sind bereits komprimiert).
    compression({ algorithms: ['gzip', 'brotliCompress'], include: /\.(html|js|css|json|svg|webmanifest)$/i, threshold: 0 }),
  ],
  test: { include: ['src/**/*.test.ts'] },
});
