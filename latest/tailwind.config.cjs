/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@fileverse-dev/ddoc/tailwind')],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@fileverse-dev/ddoc/dist/**/*.{js,mjs}',
    './node_modules/@fileverse/ui/dist/**/*.{js,mjs}',
  ],
};
