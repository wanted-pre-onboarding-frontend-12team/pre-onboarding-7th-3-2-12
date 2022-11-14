import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@src', replacement: path.resolve(__dirname, './src') },
			{ find: '@apis', replacement: path.resolve(__dirname, './src/apis/') },
			{ find: '@assets', replacement: path.resolve(__dirname, '.src/assets') },
			{ find: '@components', replacement: path.resolve(__dirname, '.src/components') },
			{ find: '@constants', replacement: path.resolve(__dirname, '.src/constants') },
			{ find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
			{ find: '@router', replacement: path.resolve(__dirname, './src/router') },
			{ find: '@styles', replacement: path.resolve(__dirname, './src/styles') },
			{ find: '@types', replacement: path.resolve(__dirname, './src/types') },
			{ find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
		],
	},
});
