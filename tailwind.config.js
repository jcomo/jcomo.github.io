module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Source Sans Pro"', 'sans-serif'],
                serif: ['"Merriweather"', 'serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
