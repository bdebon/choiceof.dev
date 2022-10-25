const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      animation: {
        popup: 'ring 1.5s linear -1ms infinite alternate, slidein 1s ease-in-out',
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        ring: {
          '0%, 50%': {
            transform: 'rotate(0)',
          },
          '1%, 10%, 20%, 30%, 40%': {
            transform: 'rotate(2deg)',
          },
          '5%, 15%, 25%, 35%, 45%': {
            transform: 'rotate(-2deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
