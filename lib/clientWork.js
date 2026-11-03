// Client work data. Add new entries here using the same structure as projects.
// Each item has: title, description, url, and optional tags.

export function getClientWork() {
  return [
    {
      title: "Shri Lakshmi Venkateshwara Astro Center",
      url: "https://astro-site-one-rouge.vercel.app",
      description:
        "Bilingual (English + Kannada) astrologer website. Next.js 16 static export with a Sanity Studio the client publishes from; a webhook triggers a GitHub Action that builds the site to a deploy branch, with nightly content backups so it can be moved to any host, including cPanel.",
      tags: ["Next.js 16", "TypeScript", "Sanity", "GitHub Actions", "i18n", "SEO"],
    },
    {
      title: "Luxury Car Care",
      url: "https://lux-car-care.vercel.app",
      description:
        "Production website for a car wash and detailing shop in Bidar, Karnataka, with service packages, a before/after drag-slider gallery and a serverless booking form.",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Web3Forms", "SEO"],
    },
    {
      title: "WashLog (Luxury Car Care)",
      url: "https://wash.sindhole.com",
      description:
        "Vehicle tracking app for the same car wash. Workers log a car in about 30 seconds on Android (plate OCR, photo, package, payment); the owner gets a web dashboard with daily revenue, date-range reports, CSV export, a rate table editor and an end-of-day email.",
      tags: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "Android", "OCR"],
    },
    {
      title: "Sindhole Polymers",
      url: "https://polymers.sindhole.com",
      description:
        "Motion-led marketing website for an authorised Greentech uPVC profile dealer in Bidar, built for fabricators, contractors and homeowners across North Karnataka, with validated enquiry forms, file uploads and spam protection.",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GSAP", "Resend", "Turnstile"],
    },
    {
      title: "Shrikaa Intellect Innovations",
      // The repo is private and the site isn't deployed yet; add a url once one is public.
      url: null,
      description:
        "Rebuilt website for an affordable PUC, CET, NEET and JEE coaching institute in Bengaluru: results gallery, donation page, contact form and local SEO landing pages for each program.",
      tags: ["HTML", "CSS", "JavaScript", "Static Website", "Local SEO"],
    },
    {
      title: "Utsaaha Lifestyle",
      url: "https://praneel7015.github.io/utsaaha-website/",
      description:
        "Clothing and crafts website for Utsaaha, a women's empowerment initiative under Sankalp. It showcases women artisans, their collections and exhibitions, with filterable product grids and a page on the cause.",
      tags: ["HTML", "CSS", "JavaScript", "Static Website", "Responsive Design"],
    },
    {
      title: "GS Law Firm",
      url: "https://sunitha.sindhole.com",
      description:
        "Website for a solo-advocate practice in Hyderabad in English, Telugu and Hindi. Bar Council of India compliant copy enforced by a lint step, a rate-limited enquiry form, legal resource guides, localized SEO and structured data, and a CI QA suite covering metadata, links and routes.",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "next-intl", "Resend", "SEO"],
    },
    {
      title: "Sri Panchamukhi Astro Centre Website",
      url: "https://vishwanathguruji.vercel.app/",
      description:
        "Marketing website with services, pujas, gallery, testimonials and a Markdown blog the client keeps adding to. Includes dynamic service, blog and area landing pages, multi-schema JSON-LD and a generated sitemap.",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO"],
    },
    {
      title: "Sanmargaha Website",
      url: "https://sanmargaha.com",
      description:
        "Responsive static multi-page website for Sanmargaha Educational Services with modular navigation and footer scripts, course filtering, contact flow, and lightweight dependency-free frontend architecture.",
      tags: ["HTML", "CSS", "JavaScript", "Static Website", "Responsive Design"],
    },
    {
      title: "Sankalp Learning Ghost Theme",
      url: "https://sankalplearning.com",
      description:
        "Custom Ghost theme with reusable Handlebars partials, homepage and static templates, post and taxonomy layouts, and bundled frontend assets for a clean and maintainable publishing experience.",
      tags: ["Ghost CMS", "Handlebars", "Theme Development", "CSS", "JavaScript"],
    },
  ];
}
