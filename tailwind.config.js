module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        accent: '#f59e0b',
        success: '#16a34a',
        danger: '#dc2626',
        ink: '#0f172a',
        soft: '#f8fafc'
      },
      boxShadow: {
        card: '0 8px 25px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
