import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const {
	VITE_STATIC_FONT_URL_WOFF,
	VITE_STATIC_FONT_URL_SEMI_WOFF,
	VITE_STATIC_FONT_URL_BOLD_WOFF,
	VITE_STATIC_FONT_URL_WOFF2,
	VITE_STATIC_FONT_URL_SEMI_WOFF2,
	VITE_STATIC_FONT_URL_BOLD_WOFF2,
} = process.env;

export default ({ mode }) => {
	console.log('### Mode:', mode);
	return defineConfig({
		build: {
			emptyOutDir: mode !== 'watch', // watch모드 시작시, dist 미삭제
			lib: {
				entry: resolve(__dirname, 'src/index.tsx'),
				name: '@encarpkg/design',
				// 적절한 확장자가 추가됩니다.
				fileName: 'index',
			},

			rollupOptions: {
				// 라이브러리에 포함하지 않을 디펜던시를 명시해주세요
				external: ['react', 'react-dom', 'axios'],
				output: {
					// 라이브러리 외부에 존재하는 디펜던시를 위해
					// UMD(Universal Module Definition) 번들링 시 사용될 전역 변수를 명시할 수도 있습니다.
					globals: {
						react: 'React',
					},
				},
				plugins: [
					typescript({
						tsconfig: './tsconfig.json',
					}),
				],
			},
		},
		resolve: {
			alias: {
				'@encarpkg/design/icons': resolve(__dirname, 'src/assets/scss/spr.scss'), // SCSS 파일의 경로를 설정
			},
		},
		css: {
			modules: {
				generateScopedName: '[name]__[hash:base64:5]',
			},
			preprocessorOptions: {
				scss: {
					additionalData: `
					$pretendardUrlWoff: '${VITE_STATIC_FONT_URL_WOFF}';
					$pretendardUrlWoff2: '${VITE_STATIC_FONT_URL_WOFF2}';
					$pretendardUrlSemiWoff: '${VITE_STATIC_FONT_URL_SEMI_WOFF}';
					$pretendardUrlSemiWoff2: '${VITE_STATIC_FONT_URL_SEMI_WOFF2}';
					$pretendardUrlBoldWoff: '${VITE_STATIC_FONT_URL_BOLD_WOFF}';
					$pretendardUrlBoldWoff2: '${VITE_STATIC_FONT_URL_BOLD_WOFF2}';
					`,
				},
			},
		},
		plugins: [
			tsconfigPaths(),
		],
	});
};
