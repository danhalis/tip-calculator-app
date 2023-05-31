/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    fontFamily: {
      "monospace": ['"Space Mono"']
    },
    extend: {
      screens: {
        // Disable hover style if it's a touch screen
        // https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-56282
        'betterhover': {'raw': '(hover: hover)'},
      }
    }
  },
}
