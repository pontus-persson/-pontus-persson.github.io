// postcss.config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: {
    'postcss-preset-env': {},
    tailwindcss,
    // feather,
    // tailwindcss: {},
    autoprefixer: {},
  }
}

// module.exports = {
//   plugins: [
//     tailwindcss
//   ],
// };