/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				majormono: ["Major Mono Display", "monospace"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backgroundImage: {
				'hero-bkg': "url('/hero-mobile.jpg')",
				'hero-bkg-dark': "url('/hero-mobile-dark.jpg')",
				'hero-bkg-desktop': "url('/hero-desktop-light.jpg')",
				'hero-bkg-desktop-dark': "url('/hero-desktop-dark.jpg')",
			},
			colors: {},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
