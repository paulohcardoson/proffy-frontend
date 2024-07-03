/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"background": "rgb(var(--color-background) / <alpha-value>)", // prettier-ignore
				"primary-lighter": "rgb(var(--color-primary-lighter) / <alpha-value>)",
				"primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
				"primary": "rgb(var(--color-primary) / <alpha-value>)", // prettier-ignore
				"primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
				"primary-darker": "rgb(var(--color-primary-darker) / <alpha-value>)",
				"secundary": "rgb(var(--color-secundary) / <alpha-value>)", // prettier-ignore
				"secundary-dark": "rgb(var(--color-secundary-dark) / <alpha-value>)",
				"title-in-primary": "rgb(var(--color-title-in-primary) / <alpha-value>)", // prettier-ignore
				"text-in-primary": "rgb(var(--color-text-in-primary) / <alpha-value>)",
				"text-title": "rgb(var(--color-text-title) / <alpha-value>)",
				"text-complement": "rgb(var(--color-text-complement) / <alpha-value>)",
				"text-base": "rgb(var(--color-ext-base) / <alpha-value>)",
				"line-in-white": "rgb(var(--color-line-in-white) / <alpha-value>)",
				"input-background": "rgb(var(--color-input-background) / <alpha-value>)", // prettier-ignore
				"button-text": "rgb(var(--color-button-text) / <alpha-value>)",
				"box-base": "rgb(var(--color-box-base) / <alpha-value>)",
				"box-footer": "rgb(var(--color-box-footer) / <alpha-value>)",
			},
			fontFamily: {
				poppins: "Poppins",
				archivo: "Archivo",
			},
		},
	},
	plugins: [],
};
