# SQL Testing App

A modern, full-stack React application built with Vike and ElysiaJS, featuring server-side rendering, TypeScript, and a robust development environment.

## 🚀 Tech Stack

- **Framework**:
  - [Vike](https://vike.dev/) (ReactJS)
  - [ElysiaJS](https://elysiajs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: [Node.js](https://nodejs.org/) (LTS version)
- **Package Manager**: [Bun](https://bun.sh/) (v1.2.0)
- **UI Libraries**:
  - [Material UI](https://mui.com/material-ui/getting-started/)
  - [TailwindCSS](https://tailwindcss.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/) (Prisma Postgres)
- **Development Tools**:
  - ESLint with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
  - [Commitizen](https://commitizen-tools.github.io/commitizen/) for standardized commits
  - [Husky](https://typicode.github.io/husky/) for git hooks
  - [dotenvx](https://dotenvx.com/) for secure environment variable management

---

## ✨ Features

- 🎯 Server-side rendering (SSR)
- ⚡️ Hot Module Replacement (HMR)
- 🛠️ Type-safe API endpoints with ElysiaJS
- 🎨 Modern UI with Material UI and TailwindCSS
- 🎯 Strict ESLint configuration
- 📝 Conventional commits with Commitizen

---

## 🛠️ Development Setup

### Environment Setup

Create a `.env.keys` file in the root directory for secure environment variable encryption:

```bash
# .env.keys
DOTENV_PRIVATE_KEY=""
DOTENV_PRIVATE_KEY_PRODUCTION=""
```

Important: The `.env.keys` file should be kept secure and never committed to version control. Make sure it's included in your `.gitignore` file.

### Installation

Clone the repository:

```bash
git clone https://github.com/jirapat-su/SQL-Testing-App.git
cd SQL-Testing-App
```

Install dependencies:

```bash
bun install
```

---

## 🧹 Linting and Code Quality

This project uses ESLint with @antfu/eslint-config for code quality and consistency. The following commands are available:

```bash
# Run linting
bun lint

# Fix linting issues automatically
bun lint:fix
```

---

## 💻 Development Commands

Start the development server:

```bash
bun dev
```

Your application will be available at: http://localhost:3000

## 🔗 API Documentation

The application includes interactive API documentation powered by [Elysia Swagger](https://elysiajs.com/plugins/swagger.html). Once the development server is running, you can access the API docs at:

http://localhost:3000/api/docs

This provides a complete overview of all available endpoints, request/response schemas, and allows you to test API calls directly from the browser.

---

## 🏗️ Building for Production

Create a production build:

```bash
bun build
```

The build output will be in the `dist` directory.

---

## 🚀 Deployment

This project is configured for deployment on Vercel:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjirapat-su%2FSQL-Testing-App&project-name=sql-testing-app&repository-name=sql-testing-app)

---

Built with ❤️ using [Vike](https://vike.dev/) and modern web technologies.
