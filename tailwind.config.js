module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      colors: {
        textBlack: '#333333',
        textGray: '#756F86',
        borderColor: '#DBE2EA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
