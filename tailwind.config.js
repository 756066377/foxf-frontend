/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Material Design 3 调色板
        mocha: {
          light: '#E8DEF8',  // Secondary Container
          DEFAULT: '#6750A4', // Primary
          dark: '#1D192B',   // On Secondary Container
        },
        cream: {
          light: '#FFFBFE',  // Surface
          DEFAULT: '#F3EDF7', // Surface Container Low
          dark: '#E6E0E9',   // Surface Container Highest
        },
        accent: {
          red: '#B3261E',    // Error
          yellow: '#FFB74D',  // Warning
        },
        // Neumorphism 调色板
        neu: {
          base: '#E0E5EC',     // 主背景色
          light: '#FFFFFF',    // 亮部阴影
          dark: '#A3B1C6',     // 暗部阴影
          text: {
            primary: '#475569',   // 主要文本
            secondary: '#64748B', // 次要文本
            accent: '#334155',    // 强调文本
          }
        },
        'primary-focus': '#4338CA',
        'secondary-focus': '#4F46E5',
        'accent-focus': '#6D28D9',
      },
      // 添加自定义间距
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      // 添加自定义字体大小
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
        'tiny': ['0.6875rem', { lineHeight: '1rem' }],
      },

      // 添加自定义阴影
      boxShadow: {
        'soft': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
        'medium': '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
        'neu-flat': '-2px -2px 5px rgba(255, 255, 255, 0.6), 2px 2px 5px rgba(163, 177, 198, 0.6)',
        'neu-pressed': 'inset -2px -2px 5px rgba(255, 255, 255, 0.6), inset 2px 2px 5px rgba(163, 177, 198, 0.6)',
        'neu-convex': '-6px -6px 12px rgba(255, 255, 255, 0.8), 6px 6px 12px rgba(163, 177, 198, 0.8)',
        'neu-concave': 'inset -6px -6px 12px rgba(255, 255, 255, 0.8), inset 6px 6px 12px rgba(163, 177, 198, 0.8)',
      },

      // 添加自定义动画
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade': 'fade 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // 添加自定义过渡
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6750A4",          // Primary
          "primary-content": "#FFFFFF",   // On Primary
          "secondary": "#625B71",         // Secondary
          "secondary-content": "#FFFFFF", // On Secondary
          "accent": "#7D5260",           // Tertiary
          "neutral": "#1D192B",          // On Secondary Container
          "base-100": "#FFFBFE",         // Surface
          "base-200": "#F3EDF7",         // Surface Container Low
          "base-300": "#E6E0E9",         // Surface Container Highest
          "info": "#1B72C0",
          "success": "#386A20",
          "warning": "#FFB74D",
          "error": "#B3261E",

          // 添加 Material Design 特定的颜色
          "--md-sys-color-surface-container": "#EFE7F4",
          "--md-sys-color-surface-bright": "#FEF7FF",
          "--md-sys-color-outline": "#79747E",
          "--md-sys-color-outline-variant": "#CAC4D0",
        },
        neumorphism: {
          "primary": "#E0E5EC",          // 主背景色
          "primary-content": "#475569",   // 主要文本色
          "secondary": "#D1D5DB",         // 次要背景色
          "secondary-content": "#64748B", // 次要文本色
          "accent": "#334155",           // 强调色
          "neutral": "#A3B1C6",          // 中性色
          "base-100": "#E0E5EC",         // 基础背景色
          "base-200": "#D1D5DB",         // 次级背景色
          "base-300": "#BFC9D9",         // 深色背景色
          "info": "#60A5FA",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",

          // Neumorphism 特定变量
          "--neu-shadow-color": "163, 177, 198",
          "--neu-highlight-color": "255, 255, 255",
          "--neu-shadow-opacity": "0.6",
          "--neu-highlight-opacity": "0.8",
          "--neu-shadow-distance": "5px",
          "--neu-border-radius": "16px",
        }
      }
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
} 