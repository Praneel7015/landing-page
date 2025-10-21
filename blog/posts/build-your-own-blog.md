---
title: "Build your own blog from this template"
date: "2025-08-15"
---

This site is built with Next.js (Pages Router). You can clone it, customize it, and publish your own in minutes. Below is a quick guide to get started, based on the README.

## 1) Clone the repo

Clone the template from GitHub:

- GitHub: [https://github.com/Praneel7015/landing-page](https://github.com/Praneel7015/landing-page)

## 2) Install dependencies

- Node.js 18+ recommended
- Install packages with your preferred manager

```
npm install pnpm
pnpm install
```

## 3) Run locally

```
pnpm run dev
```

Open http://localhost:3000

## 4) Personalize your site

- Update your profile image at `public/images/profile.jpg`
- Change your name and site title in `components/layout.js` (`name` and `siteTitle`)
- Update the home page intro and your links in `pages/index.js`
- Add/change favicon at `public/favicon.ico`
- Add new posts to the `blog/posts/` folder as Markdown files with front matter:

```
---
title: "My first post"
date: "2025-08-15"
---

Write your content here in Markdown.
```

## 5) Deploy

You can deploy to Vercel or any platform that supports Next.js.

- Build your project:

```
pnpm run build
```

- Then follow your host’s instructions. On Vercel, import the repo and it will auto‑detect Next.js.

## 6) Tips

- Use the dark/light toggle in the header to preview themes.
- Tweak theme colors in `styles/global.css` by adjusting the CSS variables.
- Blog list lives at `/blog`; posts are rendered from `blog/posts/`.

## 7) Images in posts

Place images in the `public/` folder so they can be served statically, then reference them with an absolute path starting with `/`.

Example:

```
![My profile](/images/profile.jpg)
```

Result:

![My profile](/images/profile.jpg)

