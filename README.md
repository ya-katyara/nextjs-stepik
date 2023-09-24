This is a [Next.js](https://nextjs.org/) and Typescript project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This project is the result of studying React + Next.js course. It includes the following features and components:
- Mobile-ready layout
- React Hooks (built-in and custom)
- Higher Order Components
- CSS Grid
- Server Side Rendering
- Context API
- React Hook Form
- Animations with Framer Motion
- Accessibility functions and ARIA attributes
- Base Docker container config (docker-compose)
- Husky pre-commit linting hook
- Github Actions workflow for package publishing

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Run `npm run prepare` to use Husky pre-commit hook

Fix css files formatting issues using `npm run lint`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy
Use the following commands to get static pages generated to be uploaded to a dedicated server or CDN:
```bash
npm run build
npm run export
```
To run the project locally using Docker:
```bash
docker-compose up -d
```
Alternatively the image is located in the registry
```bash
docker pull ghcr.io/ya-katyara/nextjs-stepik/nextjs-stepik:develop
```