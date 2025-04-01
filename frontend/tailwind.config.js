/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Scan all JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {
      // Add custom colors for your app
      colors: {
        orange: {
          500: '#f97316', // Primary orange color used in buttons and text
          600: '#ea580c', // Darker shade for hover states
        },
        gray: {
          100: '#f3f4f6', // Light gray for backgrounds
          200: '#e5e7eb', // Slightly darker gray for buttons
          300: '#d1d5db', // Border color
          400: '#9ca3af', // Text color
          600: '#4b5563', // Darker text for light mode
          700: '#374151', // Dark gray for dark mode buttons
          800: '#1f2937', // Darker background for headers in dark mode
          900: '#111827', // Darkest background for dark mode
        },
      },
      // Add custom font sizes if needed
      fontSize: {
        '5xl': '3rem', // For the large heading on Home page
        'lg': '1.125rem', // For paragraph text
      },
      // Add custom spacing for consistent padding/margins
      spacing: {
        4: '1rem', // Used in padding/margins (e.g., p-4)
        6: '1.5rem', // Used in margins (e.g., mt-6)
      },
      // Add custom shadows for cards and buttons
      boxShadow: {
        'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Used in headers
      },
      // Add custom border radius
      borderRadius: {
        'md': '0.375rem', // Used in buttons and cards
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Keep this for dark mode support
};