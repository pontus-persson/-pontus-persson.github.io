// postcss.config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: {
    'postcss-preset-env': {},
    tailwindcss,
    // tailwindcss: {},
    autoprefixer: {},
  }
}

// module.exports = {
//   plugins: [
//     tailwindcss
//   ],
// };