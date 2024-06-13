import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/commons/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      lemonGreen: '#CEF169',
      darkGreen: '#24424D',
      lightGreen: '#80CF8B',
      lightPurple: '#CEC4F4',
      white: '#FEFEFE',
      lightWhite: '#EBECEF',
      orange: '#EF7709',
      darkGrey: '#626262'
    }
  },
  plugins: []
};
export default config;
