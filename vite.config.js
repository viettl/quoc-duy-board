import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@/*': path.resolve(__dirname, './src/*'),
  //     // 'routes/*': path.resolve(__dirname, '/src/routes/*'),
  //     // 'stores/*': path.resolve(__dirname, '/src/stores/*'),
  //     // 'components/*': path.resolve(__dirname, '/src/components/*'),
  //     // 'features/*': path.resolve(__dirname, '/src/features/*'),
  //     // 'pages/*': path.resolve(__dirname, '/src/pages/*'),
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
