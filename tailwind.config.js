const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['"Noto Sans Mono"', 'monospace'],
      'test': ['"Noto Sans Mono"', 'monospace']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.blueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
    },
    extend: {
      // colors: colors,
      // colors: {
      //   transparent: 'transparent',
      //   current: 'currentColor',
      //   black: colors.black,
      //   white: colors.white,
      //   gray: colors.trueGray,
      //   indigo: colors.indigo,
      //   red: colors.rose,
      //   yellow: colors.amber,
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
