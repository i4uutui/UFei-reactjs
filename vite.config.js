import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// css自动补全
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	build: {
		cssCodeSplit: true,
		emptyOutDir: true,
		sourcemap: false,
		assetsDir: 'assets', // 默认 assets
		outDir: 'dist',      // 默认 dist
		rollupOptions: {
			output: {
				compact: true,
				entryFileNames: "static/js/[name]-[hash].js",
				chunkFileNames: "static/js/[name]-[hash].js",
				assetFileNames: "static/[ext]/[name].[ext]",
			}
		}
	},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
		postcss: {
			plugins: [
				autoprefixer({
					// css自动补全 自动添加前缀
					overrideBrowserslist: [
						"Android 4.1",
						"iOS 7.1",
						"Chrome > 31",
						"ff > 31",
						"ie >= 8",
						//'last 2 versions', // 所有主流浏览器最近2个版本
					],
					grid: true,
				}),
			],
		},
	},
	// server:{
	// 	port: 8012,
	// 	host: "192.168.130.40"
	// }
})
