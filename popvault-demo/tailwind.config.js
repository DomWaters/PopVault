/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        vault: {
          ink: '#11131A',
          card: '#171A24',
          panel: '#1F2330',
          line: '#2A2F3F',
          mute: '#8A8FA3',
          text: '#EDEFF5',
          purple: '#7C6CF0',
          purpledark: '#5A4DD0',
          mint: '#3FE0B0',
          coral: '#FF7A59',
          amber: '#FFC55C',
          danger: '#FF6B6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
