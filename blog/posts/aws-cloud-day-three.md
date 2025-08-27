---
title: 'Day 3 of the AWS Builder Challenge #2,"Web Content-Building Your Personal Website Files" '
date: "2025-08-19"
---
![Building Your Personal Website Files](https://prod-assets.cosmic.aws.dev/a/31TrDCjeYPfUqFxel8lprTlXpOM/free.webp)

[Link to the Article!](https://builder.aws.com/content/31ThrABgcO4mtCqmNsgAdYOUaEa/web-content-building-your-personal-website-files)

Today’s challenge was to set up the actual website files. The article suggested around 30 minutes. For me, this step was straightforward since I already have experience with HTML and CSS. Customizing the template didn’t take much effort.

For someone new, the guide is detailed enough to walk through each part. Replacing the placeholders with personal information, editing the fun facts, and adding a photo is explained clearly. Previewing the website locally was simple.
![image1.png](/images/aws-3-1.png)
![image2.png](/images/aws-3-2.png)
![image3.png](/images/aws-3-3.png)

To personalize it further, I added a toggle for dark mode and light mode. That gave me a chance to adjust the project a little beyond the provided template.
![image4.png](/images/aws-3-4.png)
![image5.png](/images/aws-3-5.png)
![image6.png](/images/aws-3-6.png)

Uploading the files to S3 was also smooth. Accessing my bucket, verifying “Block Public Access” was still enabled, and then adding the files worked without issues. Testing the object URL gave me an “Access Denied” result, which means the security settings are correct. 

For reference, here is the uploaded file: [index.html](https://mywebpageps.s3.eu-north-1.amazonaws.com/index.html)

Heres my checklist for today:

- [x] Downloaded website template from GitHub
- [x] Customized index.html with your information
- [x] Added your profile photo (optional)
- [x] Tested website locally in your computer
- [x] Uploaded all files to private S3 bucket
- [x] Verified files are private (Access Denied when accessing directly)

The instructions were simple to follow and very clear. Credits to [Ana](https://builder.aws.com/community/@ana) for the detailed guide.

Thanks for reading!
