module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#5d5b5c'
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
