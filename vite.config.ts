
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	createStyleImportPlugin,
	ElementPlusResolve,
  } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createStyleImportPlugin({
			resolves:[
				ElementPlusResolve(),
			],
			libs: [
				{
					libraryName: "element-plus",
					esModule: true,
					ensureStyleFile: true,
					resolveStyle: name => {
						return `element-plus/lib/theme-chalk/${name}.css`;
					}
				},
			],
		}),
	],

	/**
	 * 在生产中服务时的基本公共路径。
	 * @default '/'
	 */
	base: "./",
	/**
	 * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
	 * @default 'dist'
	 */
	// outDir: 'dist',
	server: {
		// hostname: '0.0.0.0',
		host: "localhost",
		port: 3001,
		// // 是否自动在浏览器打开
		// open: true,
		// // 是否开启 https
		// https: false,
		// // 服务端渲染
		// ssr: false,
		proxy: {
			"/api": {
				target: "http://localhost:3333/",
				changeOrigin: true,
				ws: true,
				rewrite: pathStr => pathStr.replace("/api", ""),
			},
		},
	},
	resolve: {
		// 导入文件夹别名
		alias: {
			"@": "/src",
			views: "/src/views",
			components: "/src/components",
			utils: "/src/utils",
			less: "/src/less",
			assets: "/src/assets",
			com: "/src/components",
			store: "/src/store",
			mixins: "/src/mixins",
		},
	},
});
