/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"very-dark-gray": "hsl(0, 0%, 17%)",
				"dark-gray": "hsl(0, 0%, 59%)"
			},
		},
	},
	plugins: [],
};
