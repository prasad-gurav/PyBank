/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        // Configure your fonts  here
        poppins : ['Poppins','sans-serif'],
        josefin : ['Unbounded', 'cursive'],
        lato :['Lato', 'sans-serif'],
        manrope : ['Manrope', 'sans-serif']
      },
      colors: {
        // Configure your color palette here
        'orange': '#EF6820',
        'yellow':'#F8BF28',
        'mirage':'#182230',
        'whitewall':'#F3EFEE'

      },
    },
  },
  plugins: [
    
  ],
}

