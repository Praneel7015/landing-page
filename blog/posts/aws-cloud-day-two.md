---
title: 'Day 2 of AWS Builder Challenge #2,"Private Cloud Storage-Creating Your Secure S3 Bucket" '
date: "2025-08-17"
---
![Creating Your Secure S3 Bucket img](https://prod-assets.cosmic.aws.dev/a/31LGGuXpkIsrEWC4VofAucGvopF/free.webp)

[Link to the Article!](https://builder.aws.com/content/31LBao2glVIot2xaFzKReDlLqrv/private-cloud-storage-creating-your-secure-s3-bucket)

The article mentioned this step would take around 30 minutes, once again It took me longer.

The instructions were once again detailed, which helped in not making mistakes. Today was focused on S3 (Simple Storage Service) and buckets. This is an important part of AWS since it handles storage for website files. The guide also explained buckets in a way that connected to real-world security problems.

The “Tea App” incident came to mind here. It is a women's dating safety app that had its Firebase bucket set to public. Because of that, sensitive information such as selfies and driver's licenses was exposed. This shows why keeping storage private by default is important. From a cybersecurity point of view, AWS setting buckets to block public access automatically is the right approach.

After creating the bucket, uploading a file, and moving it into an images folder, things worked as expected. When I tested the object URL, it showed “Access Denied,” which confirmed the permissions were correct. 

For reference, here is the file I uploaded: [my image.](https://mywebpageps.s3.eu-north-1.amazonaws.com/images/image11.jpg)

The in-detail guide (credits to [Ana](https://builder.aws.com/community/@ana) for the wonderful guide) made sure I did not miss anything.

Once Again, Another Great Guide and cant wait for more!

Thanks for reading!