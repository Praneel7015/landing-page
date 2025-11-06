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

## 8) Video embed

You can include videos in your Markdown posts. This project converts Markdown to HTML with `remark` and `remark-html` (sanitization is disabled in the pipeline), so raw HTML is allowed in your `.md` files. Below are practical patterns.

### Video embeds

- YouTube / external embed (responsive):

```
<div class="video-container">
	<iframe
		src="https://www.youtube.com/embed/VIDEO_ID"
		title="Descriptive video title"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>
```

Replace `VIDEO_ID` with the YouTube ID. The `.video-container` class already exists in `styles/global.css` and makes embeds responsive and nicely framed.

- Native HTML5 video (self-hosted):

```
<video controls src="/videos/my-video.mp4">
	Your browser does not support the video element.
</video>
```

Place your MP4 (or WebM) file inside the `public/videos/` folder and reference it with an absolute path (`/videos/...`). The `controls` attribute provides built-in play/pause/seek UI.

Result:

<div class="video-container">
	<iframe
		src="https://www.youtube.com/embed/aqz-KE-bpKQ"
		title="Sample video (Big Buck Bunny)"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>

## 9) Audio implementation

You can include audio in Markdown posts or use a React component on pages. Both approaches are supported.

- Inline HTML audio (inside Markdown):

```
<audio controls>
	<source src="/audio/my-audio.mp3" type="audio/mpeg" />
	Your browser does not support the audio element.
</audio>
```

Put `my-audio.mp3` inside `public/audio/` and reference it as `/audio/my-audio.mp3`.

- React component (for pages/components):

Import the small player at `components/AudioPlayer.js` and use it like this:

```javascript
import AudioPlayer from '../../components/AudioPlayer';

export default function SamplePage(){
	return <AudioPlayer src="/audio/my-audio.mp3" title="Sample track" />;
}
```

Notes & accessibility:
- Provide a descriptive `title` or nearby caption so screen reader users know what the audio is.
- Offer multiple formats (MP3 and OGG) for broader compatibility.
- Keep files in `public/` so they are served statically; reference them with absolute paths starting with `/`.

Result:

<audio controls>
	<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
	Your browser does not support the audio element.
</audio>

