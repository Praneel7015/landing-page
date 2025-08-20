---
title: 'Day 4 of the AWS Builder Challenge #2,"Global Distribution-Making Your Website Accessible Worldwide" '
date: "2025-08-20"
---
![Making Your Website Accessible Worldwide](https://prod-assets.cosmic.aws.dev/a/31WYdSWGUMPkjkHDCZjca9N6tUS/free.webp)

[Link to the Article!](https://builder.aws.com/content/31WVAaZfhzKOqUjmfAbHfVcQs7n/global-distribution-making-your-website-accessible-worldwide)


Today's challenge focused on solving the problem of website speed across long distances. I liked the example they used of data traveling between Tokyo and Mexico City,it made the concept of Content Delivery Networks (CDNs) much easier to visualize.

The guide walked through setting up CloudFront to distribute website content worldwide. The steps were very clear and straightforward: creating the distribution, connecting it to my S3 bucket, and configuring the root object to serve index.html. Everything worked as expected without any complications.

Once deployed, I tested my global URL, and the site loaded properly: [db28xe55djgls.cloudfront.net](https://db28xe55djgls.cloudfront.net). Direct access to the S3 bucket we created in [Day 2](/blog/posts/aws-day-two) still returned `Access Denied`, which confirmed the security setup was correct.

Overall, this was a smooth process. CloudFront handled the global delivery setup, and the integration with S3 remained secure without any extra work.

### Checklist for today
- [x] Created global distribution  
- [x] Connected it securely to private storage  
- [x] Verified website loads through CloudFront  
- [x] Confirmed S3 bucket remains private  

Thanks to [Ana](https://builder.aws.com/community/@ana) for another solid guide, and thanks for reading!
