# Личный сайт

Одностраничный лендинг-портфолио frontend-разработчика: React + Vite + TypeScript + SCSS, анимации GSAP и canvas-фон «полёт в космосе».

## Стек

- **React 19** + **TypeScript**
- **Vite 8**
- **SCSS** (BEM, mobile-first, Stylelint)
- **GSAP** + **@gsap/react** (появления, меню, ScrollTrigger)
- Шрифт **Montserrat** (Google Fonts)

## Требования

- Node.js `^20.19.0` или `>=22.12.0`
- npm (в проекте только npm)

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

### Полезные команды

| Команда | Описание |
|--------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр сборки |
| `npm run lint:style` | Stylelint для SCSS |

Контент (имя, тексты, проекты, контакты): `src/data/content.ts`.

## Сборка для выкладки

```bash
npm install
npm run build
```

Готовые файлы появятся в папке **`dist/`**:

```
dist/
├── index.html
├── favicon.svg
└── assets/
    ├── index-….css
    └── index-….js
```

## GitHub Pages

После пуша в `main` сайт собирается и публикуется Actions-воркфлоу.

1. В репозитории: **Settings → Pages → Source → GitHub Actions**
2. Дождись успешного workflow **Deploy to GitHub Pages**

Сайт: [https://evgeny-markov.github.io/em-react/](https://evgeny-markov.github.io/em-react/)
