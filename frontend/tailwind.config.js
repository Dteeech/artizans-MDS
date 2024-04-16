import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fbf3ff',
              100: '#f6e2ff',
              200: '#eecbff',
              300: '#e2a2ff',
              400: '#d067ff',
              500: '#bf2dff',
              600: '#af06ff',
              700: '#9b00f8',
              800: '#8500cc',
              900: '#6c02a1',
              950: '#4b007b',
              foreground: '#FFFFFF',
              DEFAULT: '#d067ff'
            }
          }
        },
        dark: {
          colors: {
            primary: {
              50: '#fbf3ff',
              100: '#f6e2ff',
              200: '#eecbff',
              300: '#e2a2ff',
              400: '#d067ff',
              500: '#bf2dff',
              600: '#af06ff',
              700: '#9b00f8',
              800: '#8500cc',
              900: '#6c02a1',
              950: '#4b007b',
              foreground: '##0E0E10',
              DEFAULT: '#d067ff'
            }
          }
        }
      }
    })]
}
