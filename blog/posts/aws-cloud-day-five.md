---
title: 'Day 5 of AWS Builder Challenge #2,"Professional Deployment-GitHub, Amplify, and Modern Web Development" '
date: "2025-08-21"
---

![Professional Deployment](https://prod-assets.cosmic.aws.dev/a/31ZXZWyG4hafGKT1tJoh7zrCUkz/free.webp)

[Link to the Article!](https://builder.aws.com/content/31ZX81MJtym9PTFGBkPh42RbEsl/professional-deployment-github-amplify-and-modern-web-development)

### Update to Success  
If you read [my previous post](blog/posts/aws-day-five), you’ll know I was dealing with the challenge of converting my Next.js project into static files and manually uploading them to S3 + CloudFront. Today’s article introduced **Amazon Amplify**, which removes all of that hassle.  

No more conversion scripts or manual uploads. Amplify connects directly to GitHub, builds the app, and deploys it automatically with every change. I even wrote a small [deploy.md file](https://github.com/Praneel7015/landing-page/blob/main/deploy.md) earlier to handle my manual workflow-but with Amplify, it’s no longer needed.

Okay now Back to Day 5. 

### Day 5  
This article really hit home because it solved the exact problem I ran into yesterday. I appreciated that it explained the basics clearly, including what Git and GitHub is, why they matter, and how to set up a repository. Even if you were completely new, you could follow along step by step.  

The big **aha! moment** was Amplify. Setting it up was straightforward: I tried deploying my static website, and it worked out of the box. To take it further, I customized error handling by adding a redirect rule for my custom 404 page:  
1. Under Hosting → Rewrites and Redirects, click "Manage Redirects"
2. Change `"target": "/index.html"` to `"target": "/404.html"`
3. Click Save Changes

Now my custom error page loads properly with no redirect issues.  

Looking back, I've realized how much I've grown as a developer since starting this journey. I'm glad I first went through the S3 + CloudFront manual setup. If I had gone straight to Amplify, I wouldn’t have learned about buckets, deployment scripts, or their limitations. That context makes me appreciate Amplify even more.  

For now, I won’t be deleting my manual setup, it feels wrong to remove it after everything we've been through. It deserves to stay.  

**Bonus** : 
In my next blog, I’ll explain how you can get a **free domain** (if you’re a student) using the GitHub Student Developer Pack to customize your site even further.  

### Checklist  
- [x] Created GitHub account and repository  
- [x] Uploaded website files to GitHub  
- [x] Deployed website using Amplify + GitHub integration  
- [x] Tested automatic deployment with a code change  
- [ ] Cleaned up original CloudFront distribution (intentionally skipped)  

Thanks for reading!


