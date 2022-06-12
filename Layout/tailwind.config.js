module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      colors: {
        'red-rgba': 'rgba(70, 0, 70, 0.7)',
      },
      fontFamily: {
        'sans-pro': ['Source Sans Pro', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
