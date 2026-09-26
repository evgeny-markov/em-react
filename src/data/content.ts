export const site = {
  name: 'Евгений Марков',
  brandShort: 'ЕМ',
  role: 'Frontend-разработчик · Middle',
  focus: 'Vue.js / Nuxt · TypeScript · интерфейсы и анимации',
  availability: 'Полная занятость · удалённо',
  telegramUrl: 'https://t.me/evgeniy_markov',
  hhUrl: 'https://hh.ru/resume/e952357aff068bca3e0039ed1f4b575a7a6c65',
  heroLead:
    'Собираю понятные интерфейсы: от промо и лендингов до SPA/SSR, кабинетов и админок. 6+ лет коммерческого опыта.',
  about:
    'Frontend-разработчик с 6+ годами коммерческого опыта (2019 — н.в.). Специализация — Vue 3, Nuxt 2/3/4, TypeScript, SPA и SSR-приложения, лендинги, личные кабинеты и админ-панели. Работал в digital-агентствах и продуктовой студии: от вёрстки и jQuery до приложений с GraphQL, headless CMS и командным CI. Веду фичи end-to-end — от дизайна и UI-сценариев до API и поддержки в production. С конца 2024 системно использую AI-агентов: ускоряю черновики, финально отвечаю за качество UI.',
  stats: [
    { value: '6+', label: 'лет коммерческого опыта' },
    { value: '80+', label: 'frontend-проектов в портфеле' },
    { value: '50+', label: 'продуктов в студии' },
    { value: '2024', label: 'AI-assisted workflow' },
  ],
} as const;

export const experience = [
  {
    role: 'Frontend-разработчик (Middle)',
    company: 'Yeniseimedia',
    period: 'Июнь 2021 — Июль 2026 · 5 лет 2 мес.',
    summary:
      'Продуктовая digital-студия. Клиентские и внутренние продукты: AI/EdTech, медиа, ad tech, HR CRM, кабинеты и рекламные лендинги.',
    points: [
      '50+ frontend-проектов: лендинги, SPA/SSR, кабинеты и админки — с нуля и в развитии',
      'UI end-to-end: дизайн, состояния интерфейса, ограничения макетов → стабильный production',
      'Миграции legacy (Gulp/Pug/jQuery) → Vue 3, Vite, Nuxt 3/4, TypeScript',
      'SSR/SPA на Nuxt, дашборды Quasar + GraphQL/Apollo, кабинеты с JWT и REST',
      'SCSS (BEM, mobile-first), GSAP; Docker Compose локально, релизы через GitLab CI команды',
      'С 2024 — AI-агенты в ежедневной разработке с human-review до production-уровня',
    ],
  },
  {
    role: 'Frontend-разработчик (Middle)',
    company: 'Ninelines',
    period: 'Февраль 2020 — Июнь 2021 · 1 год 5 мес.',
    summary:
      'Digital-агентство. Спецпроекты и промо-сайты для медиа-брендов и рекламодателей.',
    points: [
      '30+ промо-сайтов и спецпроектов на шаблоне агентства',
      'Pixel-perfect вёрстка, mobile-first, кроссбраузерность',
      'GSAP, scroll-эффекты, Swiper/Slick, Video.js, Barba.js',
      'Сборка Gulp 4 + Webpack + Pug + SCSS, pre-commit quality gates',
    ],
  },
  {
    role: 'Junior Frontend-разработчик',
    company: 'Vide Infra Group',
    period: 'Апрель 2019 — Июнь 2019 · 3 мес.',
    summary:
      'Digital-агентство. Первая коммерческая позиция: адаптивная вёрстка и клиентский JavaScript по макетам.',
    points: [
      'Вёрстка и доработка UI: HTML/Twig, SCSS, адаптив, кроссбраузерность',
      'Клиентский JavaScript на jQuery: меню, попапы, слайдеры, формы',
      'Корпоративные и eCommerce-сайты на стеке агентства (Blendid / Webpack)',
    ],
  },
] as const;

export const projects = [
  {
    name: 'MiraiTech',
    meta: 'Корпоративный сайт',
    href: 'https://miraitech.co',
  },
  {
    name: 'PNB Agency',
    meta: 'Сайт агентства',
    href: 'https://pnb.agency',
  },
  {
    name: 'Adness',
    meta: 'Маркетинговый сайт · ad tech',
    href: 'https://adness.co',
  },
  {
    name: 'Adxad',
    meta: 'Маркетинговый сайт · ad tech',
    href: 'https://adxad.com',
  },
  {
    name: 'Autopodpiska',
    meta: 'Промо-лендинг',
    href: 'https://autopodpiska.ru',
  },
  {
    name: 'Этика ИИ',
    meta: 'Портал Альянса · ethics.a-ai.ru',
    href: 'https://ethics.a-ai.ru',
  },
  {
    name: 'Гид по ИИ',
    meta: 'Портал Альянса · guide.a-ai.ru',
    href: 'https://guide.a-ai.ru',
  },
  {
    name: 'Рейтинг вузов',
    meta: 'Портал Альянса · rating.a-ai.ru',
    href: 'https://rating.a-ai.ru',
  },
  {
    name: 'МЦК',
    meta: 'Портал Альянса · mck.a-ai.ru',
    href: 'https://mck.a-ai.ru',
  },
] as const;

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML5', 'SCSS / BEM', 'Tailwind', 'Vite'],
  },
  {
    title: 'API & данные',
    items: ['GraphQL', 'Apollo Client', 'REST', 'Axios', 'Strapi', 'Pinia', 'JWT'],
  },
  {
    title: 'UI & motion',
    items: ['GSAP', 'Swiper', 'Quasar', 'Chart.js', 'Vue Flow', 'Responsive'],
  },
  {
    title: 'Quality',
    items: ['ESLint', 'Stylelint', 'Oxlint', 'Vitest', 'Husky', 'lint-staged', 'vue-tsc'],
  },
  {
    title: 'DevOps',
    items: ['Docker Compose', 'GitLab CI', 'npm', 'pnpm', 'Git'],
  },
  {
    title: 'Практика',
    items: [
      'UI end-to-end',
      'Design / UI review',
      'AI-assisted frontend',
      'Code review',
      'SEO / PWA',
      'i18n',
    ],
  },
] as const;

export const navLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#experience', label: 'Опыт' },
  { href: '#work', label: 'Проекты' },
  { href: '#skills', label: 'Навыки' },
  { href: '#contact', label: 'Контакт' },
] as const;
