---
title: "Get Your Free Domain with the GitHub Student Developer Pack (and connect it to AWS Amplify)"
date: "2025-08-21"
---

This guide provides a Step‑by‑step instructions to redeem a one‑year student domain (e.g., .me, .tech) via the GitHub Student Developer Pack and point it to your Amplify site.

![YES](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZ1MGhlbWd2YnIyeGFvb2J3OG15aXQycjFjeWI5N29ydW43dzV5bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DffShiJ47fPqM/giphy.gif)

**DISCLOSURE:** I am not affiliated with Amazon, AWS, GitHub, .TECH, Namecheap, Name.com, or any related companies. This is a student guide based on publicly available information.

## Who this is for?
This works if you're a current student and can verify your status for the GitHub Student Developer Pack. Verification typically requires two-factor authentication on your GitHub account and dated proof of enrollment. 

## What you'll do in this guide
1. Enroll in the GitHub Student Developer Pack.  
2. Filter the offers to “Domains” and pick a provider.  
3. Redeem a one-year domain.  
4. Connect that domain to your AWS Amplify app.

> Offers change over time and by region. Always review the current terms on the pack page before redeeming.  

## Step 1 : Enroll in the GitHub Student Developer Pack
1. Go to [GitHub Student Developer Pack](https://education.github.com/pack) and sign in with your GitHub account. If you haven’t enrolled before, follow the prompts to apply as a student.  
2. Ensure two-factor authentication (2FA) is enabled on your GitHub account. If you enable 2FA after applying, sign out and back in before reapplying.  
3. Submit dated student proof that clearly shows your name, school name, and current enrollment (ID, transcript, schedule, or enrollment letter).  

Approval can take time. You’ll see the offers once your status is verified.  

## Step 2 : Filter to domain offers
1. On the pack page, scroll to **All offers**.  
2. Use **Filter: Domains** to see providers such as:  
   - **Namecheap** - often includes a free `.me` domain for one year and SSL.  
   - **.TECH Domains** - one free `.tech` domain for a year via the pack.  
   - **Name.com** - student pricing for a range of TLDs with security add-ons.  

Read each offer’s terms and renewal pricing; it’s free for the first year, then standard rates apply.

## Step 3 : Redeem your domain
1. Click the offer link on the pack page and connect your GitHub account when prompted.  
2. Search for an available domain, add it to cart, and check out.  
3. Create a registrar account if needed and complete required contact details. Some providers require a payment method even for a free first year; that’s normal for domain ownership and renewals.  

Keep your registrar login handy you’ll need it to manage DNS.

## Step 4 : Point the domain to AWS Amplify
You have two common paths. The exact screens can vary, so rely on the Amplify docs if wording changes.

**Option A: Keep DNS at your registrar (add CNAME records)**  
1. In AWS Amplify Console, open your app → **Hosting** → **Custom domains** → **Add domain** and enter your root domain (example.com).  
2. Choose subdomains (for example, `www`), then view the DNS records Amplify shows you.  
3. In your registrar’s DNS settings, create the CNAMEs exactly as shown by Amplify. Propagation can take time.  

**PREFERED Option B: Move DNS to Route 53 (nameserver change)**  
1. Create a hosted zone in Route 53 for your domain and note the four NS records.  
2. At your registrar, replace their nameservers with the Route 53 nameservers.  
3. Back in Amplify, add the domain; Amplify can create the necessary records automatically.  

Amplify provisions HTTPS certificates and handles the CDN edge. If you get stuck, use the Amplify custom-domain guides and troubleshooting pages.  

## Notes on renewals and limits
1. Most student domain offers are free for the first year only; renewal is at standard registrar rates. Check your registrar dashboard for pricing and renewal dates.  
2. If your Student Pack eligibility lapses, your existing domain continues as long as you pay the registrar’s renewal price. The offer cannot usually be “re-redeemed.”  

**DISCLOSURE:** I am not affiliated with Amazon, AWS, GitHub, .TECH, Namecheap, Name.com, or any related companies. This guide is informational only.

Thanks for reading!
