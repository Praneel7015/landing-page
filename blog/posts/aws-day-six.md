---
title: 'Day 6 of AWS Builder Challenge #2,"Contact Form-Making Your Website Interactive" '
date: "2025-08-22"
---
![Contact Form](https://prod-assets.cosmic.aws.dev/a/31cIvAPbMtQdGG3dRcUpcUgZDGo/free.webp)

[Link to the Article!](https://builder.aws.com/content/31c6EGIZUe9a5eLwMKBv2TuDn2l/contact-form-making-your-website-interactive)

Today was rough. Complicated, intense, and at times it felt like I'd forgotten how to read. None of this is the fault of the guide I've been following, it's just me trying to keep up with a lot of new concepts at once.  

This was my first time using **AWS Lambda** and **SNS**. The explanations were helpful, but it still took me a while to wrap my head around what was happening.  

Creating the SNS topic itself was simple enough. I copied the **Topic ARN** into a text file so I wouldn’t lose it later.  
One odd thing: when I subscribed my email, it unsubscribed me twice before it finally stuck. After that, it worked fine and I was able to confirm the subscription.  

Steps 3 and 4 (permissions and writing the Lambda function) were alright, though I was extra cautious here. I didn't want to break anything.  
Adding the code and deploying it went smoothly the first time, which was a small relief.  

## Running into Problems

The first real issue came when I tried to generate the **Function URL**. I got this error:

`The statement id (FunctionURLAllowPublicAccess) provided already exists.
Please provide a new statement id, or remove the existing statement.`

Opening a new instance of the page and redoing the process fixed it somehow.  

Step 6 was trickier because I'm using **Next.js**, while the sample code was plain HTML and CSS. I had to adapt it to match my setup. That worked out, but I noticed the sample code hard-coded environment variables directly into the project—which isn't a good practice. I tried to be "smart" about it, and that’s where I made a mistake.  

## The Mistake

When testing everything, I realized something was off. Instead of hardcoding, I used **Amplify's hosting environment variables** and stored my `NEXT_PUBLIC_CONTACT_LAMBDA_URL` there.  
The problem? I had accidentally added a `.` at the start of the variable Effectively making it `.NEXT_PUBLIC_CONTACT_LAMBDA_URL`. This meant the value wasn't being picked up correctly. That tiny typo caused a failure and I had to redeploy Amplify after fixing it. Once corrected, everything worked as expected.  

## What I Learned

- Double-check everything, even the smallest details.  
- Environment variables should never be hardcoded.  
- Being cautious is fine, but I shouldn't get too confident just because a few things work the first time. Mistakes happen, and catching them early is part of learning.  

My Checklist for today:

- [x] Created SNS topic and confirmed email subscription  
- [x] Created IAM role with proper permissions  
- [x] Created Lambda function with contact form code  
- [x] Configured Function URL  
- [x] Added contact form to my Next.js project  
- [x] Connected the form to Lambda via environment variable  
- [x] Tested complete flow from form to email   

That wraps up Day 6. It was messy, but I came out of it with a working contact form and a few lessons on patience and attention to detail. 

Tomorrow will be the last day of the challenge, as the blog mentions:

`Tomorrow on Day 7, you'll document your journey and share your success! You'll write about your experience, take screenshots of what you built, and share your website with friends and family. It's time to celebrate what you've accomplished this week!`

I think its time to look back and see what I have learned over these past six days. From the basics of AWS services to creating a functional contact form, each step has been an adventure in itself. I can't wait to reflect on all the progress I’ve made and share it with you all tomorrow.

Thanks for reading! 

