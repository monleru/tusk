import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // SVG подключаются как React-компоненты: import Logo from '...svg?react'
      include: '**/*.svg?react',
      svgrOptions: {
        exportType: 'default',
        titleProp: true,
        ref: true,
        // исходники экспортированы из Figma (маски, градиенты, clip-path) —
        // оптимизацию не гоняем, чтобы рендер был 1:1 с оригиналом
        svgo: false,
      },
    }),
  ],
});
