# Felipe Antunes — Personal Portfolio

Personal portfolio built with React, TypeScript and Tailwind CSS. Supports English and Portuguese via i18n, and is automatically deployed to GitHub Pages via CI/CD.

🔗 **[feantuns.github.io/home](https://feantuns.github.io/home/)**

---

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) — internationalization (EN / PT)
- [GitHub Actions](https://github.com/features/actions) — CI/CD pipeline deploying to GitHub Pages

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Deployment

Every push to `main` triggers the GitHub Actions pipeline, which builds the project and deploys it to GitHub Pages automatically.

## License

MIT
