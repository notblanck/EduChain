/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        body: '#0a0e1a',
        surface: '#1a1f2e',
        primary: '#4169E1',
        'primary-gradient-start': '#5B9FE3',
        'primary-gradient-end': '#4F75FF',
        gray: {
          50: '#ffffff',
          400: '#94a3b8',
          500: '#64748b'
        },
        border: '#1e293b',
        status: {
          issued: '#10b981',
          verified: '#3b82f6',
          pending: '#f59e0b',
          revoked: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};

