import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path";
import dts from "vite-plugin-dts"

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "react-18-amazon-chime-js-sdk",
			formats: ["es", "umd"],
			fileName: (format) => `react-18-amazon-chime-js-sdk.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM"
				},
			},
		},
	},
})
