## Landing + Blog (Next.js Pages Router)

A simple personal landing page with a blog, built on the Next.js Pages Router tutorial and customized to my liking.

### Why I made this
- I started from the official Next.js Pages Router Tutorial and then modified the layout, styling, and structure to fit my needs (landing page, dark/light theme toggle, Linktree-style links, and a blog under `/blog`).

### How to use (fork + run)
1. Fork this repository on GitHub.
2. Clone your fork locally:

	```bash
	git clone https://github.com/<your-username>/<your-fork-name>.git
	cd <your-fork>
	```

3. Install dependencies and run the dev server:

	 - Node.js 18+ recommended
	 - Install and run:

	 ```
	 npm install
	 npm run dev
	 ```

4. Open http://localhost:3000

### Customize it
- Profile image: replace `public/images/profile.jpg`.
- Name and site title: edit `components/layout.js` (`name` and `siteTitle`).
- Landing page intro and links: edit `pages/index.js`.
- Favicon: replace `public/favicon.ico`.
- Theme colors: adjust CSS variables in `styles/global.css`.

### Write blog posts (Markdown)
- Posts live as Markdown files in the `posts/` folder (not `pages/posts`).
- Each post needs front matter at the top:

	```
	---
	title: "My Post Title"
	date: "2025-08-15"
	---

	Your content here in Markdown.
	```

- The blog index is at `/blog`. Each markdown file becomes a post at `/posts/[id]`, where `[id]` is the filename (without `.md`).

### Deploy
- Build with `npm run build` and deploy to your host of choice (I Used Vercel). Importing the repo into Vercel auto-detects Next.js.

### Attribution
- Based on the official [Next.js Pages Router Tutorial](https://nextjs.org/learn) and then customized.
