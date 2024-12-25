import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Text Vision Docs',
  description: '',
  base: '/TextVision',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Домой', link: '/' },
      { text: 'Проект', link: '/about' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Проект', link: '/about' },
          { text: 'Рекомендации', link: '/ocr-recomendations' },
          { text: 'Тех стек', link: '/tech-stack' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ap73MKa/TextVision' },
    ],
  },
})
