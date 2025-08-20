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

# **Some Issues I Faced :** 

## Invalidate the CloudFront Cache

to clear any cached errors,

1. In your CloudFront distribution, click the Invalidations tab.
2. Click Create invalidation.
3. In the object paths field, enter /* to clear the cache for all files.
4. Click Create invalidation.

## Fix url mismatch

A mismatch between the "clean" URL your browser requests (/countdown) and the actual filename stored in your S3 bucket (countdown.html). When CloudFront receives the request for /countdown, it passes it directly to S3, which then correctly reports that it can't find an object with that exact name, resulting in the "Access Denied" error (because the object doesn't exist to be accessed).

To fix this, Make a CloudFront Function Code

1. In the AWS Console, navigate to CloudFront, then select Functions from the left-hand menu.
2. Click on the name of the function you created (e.g., `url-rewrite-function`)
3. Make sure the code in the editor is exactly this:
  ```
  function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '.html';
    }

    return request;
  }
  ```
4. Navigate back to your CloudFront distribution.

5. Click on the Behaviors tab.

6. Select the checkbox next to the behavior with the path pattern Default (*) and click Edit.

7. Scroll down to the bottom to the Function associations section.

8. Under Viewer request - Function type, ensure CloudFront Function is selected.

9. Under Function ARN/Name, make sure the function you created (e.g., url-rewrite-function) is selected from the dropdown menu. It should look like this:

10. Click Save changes.


The site should work flawlessly now!

It was hard to update it since i have to keep doing the same steps everytime i make changes, But thats a problem for future me to fix :P

Im sure ill learn about something until then, Ill leave here some links to help anyone who wants to do the same thing.

[https://docs.aws.amazon.com/AmazonS3/latest/userguide/static-website-hosting.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/static-website-hosting.html)

[How to create a static export of your Next.js application](https://nextjs.org/docs/pages/guides/static-exports)


Thanks for reading the update!

