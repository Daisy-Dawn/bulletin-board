import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                black: '#17181c',
                Blue: '#2d78db',
                darkerGrey: '#27292d',
                lightGrey: '#4b535b',
                lighterBlue: '#4b79d5',
                royalBlue: '#2869b6',
                lighterGrey: '#32353c',
                lineGrey: '#565758',
                primary: '#ff5fa9',
                red: '#f44336',
                yellow: '#ffc107',
            },
        },
    },
    plugins: [],
} satisfies Config
