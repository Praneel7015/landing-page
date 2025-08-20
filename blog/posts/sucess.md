---
title: "Success"
date: "2025-08-20"
---

If you are reading this, I have successfully manage to deploy my website on **Amazon S3 + CloudFront**.

![free](/images/breaking-free.png)

The shift to **Amazon Web Services** was a great decision. I’m now able to host my static websites for free and also get full CDN support.

It was a bit challenging to switch from **Next.js** to a static S3 setup, but I’m sure this will be worth it in the long run. Learning that Next.js has a built-in static export feature was really awesome, and the process of generating the files turned out to be pretty straightforward.

I first modified the `next.config.js` file as follows:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
```
Then, I ran the following command:

`pnpm build`

This generated all the static files inside the /out folder. From there, I just uploaded them to my S3 bucket and connected everything through a CloudFront distribution.

The site works flawlessly now!

It is hard to update it since its now ill have to keep doing the same steps everytime i make changes, But thats a problem for future me :P

Im sure ill learn about something until then, Ill leave here some links to help anyone who wants to do the same thing.

[https://docs.aws.amazon.com/AmazonS3/latest/userguide/static-website-hosting.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/static-website-hosting.html)

[How to create a static export of your Next.js application](https://nextjs.org/docs/pages/guides/static-exports)


Thanks for reading the update!

