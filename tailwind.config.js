/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './_layouts/**/*.html',
    './**/*.md',
    './static/**/*.js',
    './node_modules/flyonui/dist/*.js'  
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('flyonui')                    
  ]
};
