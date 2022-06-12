module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#5d5b5c',
        'red-rgba': 'rgba(70, 0, 70, 0.7)',
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
