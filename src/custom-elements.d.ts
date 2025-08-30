// TypeScript declarations for custom elements used in the project
// Enables JSX support for `swiper-container` and `swiper-slide`

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'swiper-container': any;
			'swiper-slide': any;
		}
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'swiper-container': any;
			'swiper-slide': any;
		}
	}
}

declare module 'react/jsx-runtime' {
	export namespace JSX {
		interface IntrinsicElements {
			'swiper-container': any;
			'swiper-slide': any;
		}
	}
}

export {};


