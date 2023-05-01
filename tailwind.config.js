/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./views/**/*.hbs`, 
    `./views/*.hbs`,
    "./node_modules/flowbite/**/*.js"
  ],
  extend: {
    colors: {
      primary: {"50":"#eef2ff","100":"#e0e7ff","200":"#c7d2fe","300":"#a5b4fc","400":"#818cf8","500":"#6366f1","600":"#4f46e5","700":"#4338ca","800":"#3730a3","900":"#312e81"}
    }
  },
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'images': "url('/public/photo/bg-hero.png')",
      }
    }
  }
}

