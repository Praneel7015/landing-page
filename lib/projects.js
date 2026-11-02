// Simple projects data. Update this list with your real projects.
// Each project has: title, description, url, and optional tags.

export function getProjects() {
  return [
    {
      title: "Unravel",
      url: "https://github.com/Praneel7015/unravel",
      description:
        "Local-first, end-to-end encrypted Stoic journal for untangling worry before a big moment and recording how it actually went afterward. No streaks or gamification. Ships as an air-gapped F-Droid FOSS edition and a store edition with zero-knowledge encrypted sync, with themes that follow the local sun cycle.",
      tags: ["Flutter", "Dart", "Drift", "SQLite", "AES-256-GCM", "Argon2id", "F-Droid", "FOSS"],
    },
    {
      title: "highcortisol.xyz",
      url: "https://highcortisol.xyz",
      description:
        "Site for a hackathon collective with two build teams, Low Cortisol (calm) and High Cortisol (intense). Most of Praneel's hackathon projects are listed there.",
      tags: ["Next.js", "TypeScript", "Vercel", "MDX", "Hackathon"],
    },
    {
      title: "NammaCity",
      url: "https://github.com/Praneel7015/GooglexHackathon",
      description:
        "Multi-agent AI civic platform for Bangalore citizens to photograph local issues, auto-route complaints to 30+ government agencies, bundle similar reports, and escalate unresolved problems through a structured enforcement ladder.",
      tags: ["React", "FastAPI", "Python", "Google ADK", "Gemini 2.5 Pro", "Supabase", "Firebase", "Leaflet.js", "Hackathon"],
    },
    {
      title: "Music7015",
      url: "https://github.com/Praneel7015/music7015",
      description:
        "React Native + Expo music streaming app with lock-screen controls and a Node.js backend supporting HTTP range requests and HLS segmentation via ffmpeg.",
      tags: ["React Native", "Expo", "TypeScript", "Zustand", "NativeWind", "Express", "Docker", "ffmpeg"],
    },
    {
      title: "SecureMLOps",
      url: "https://github.com/Praneel7015/SecureMLOPS",
      description:
        "Modular Flask + React platform combining a hardened security pipeline with production-style ML training workflows, secure image inference, and a model registry.",
      tags: ["Python", "Flask", "PyTorch", "React", "Vite", "PostgreSQL", "ResNet18", "EfficientNet"],
    },
    {
      title: "Aural",
      url: "https://github.com/Praneel7015/Aural",
      description:
        "Real-time AI scam-call shield fusing synthetic voice detection, social-engineering analysis, and voice-print verification into a Trust Score (0–100) with sub-2-second latency.",
      tags: ["Python", "FastAPI", "PyTorch", "SpeechBrain", "Whisper", "Next.js 15", "TypeScript", "Gemini"],
    },
    {
      title: "Crawlxr",
      url: "https://github.com/Praneel7015/Crawlxr",
      description:
        "Decentralized blockchain-based web crawler that hashes crawled content and stores tamper-proof crawl proofs on Ethereum (Sepolia testnet) to prevent duplicate crawls.",
      tags: ["Ethereum", "Solidity", "Hardhat", "Express.js", "MongoDB", "React", "Playwright", "Blockchain"],
    },
    {
      title: "Future You Mirror",
      url: "https://future-you-mirror.vercel.app",
      description:
        "Upload a selfie and see the skin you'll have, and the one you could. Built for the YouCam Skin AI hackathon: Perfect Corp skin analysis, AI aging and skin simulation turn one photo into an aging timeline, a with-care portrait and plain-language next steps. Includes a no-key demo mode.",
      tags: ["Next.js 16", "React 19", "YouCam / Perfect Corp API", "Framer Motion", "Tailwind CSS v4", "Hackathon"],
    },
    {
      title: "Auralis",
      url: "https://github.com/nikhil-yn-aix/Auralis",
      description:
        "Behavioral scam intelligence pipeline that reconstructs phone calls as structured forensic data. Tracks intent, roles, and risk escalation across the full duration of a call with an explainable, evidence-backed verdict.",
      tags: ["FastAPI", "Gemini 2.5 Flash", "Python", "Librosa", "AWS Lambda", "React"],
    },
    {
      title: 'FlowForge',
      description: 'Visual CI/CD pipeline builder with an AI layer. Draw a pipeline as a graph and export it deterministically to GitHub Actions, GitLab CI, Jenkins, CircleCI or Bitbucket Pipelines, or generate one from a prompt or repo. Also migrates between platforms, grades pipeline health, triggers and diagnoses live runs, and opens the result as a PR.',
      url: 'https://flowforge.highcortisol.xyz',
      tags: ['React 19', 'React Flow', 'Vite', 'Node.js', 'Express', 'Groq', 'n8n', 'Vercel', 'Render']
    },
    {
      title: 'Resist.',
      description: 'Flask and a trained ONNX model that detects resistor color bands from images or manual inputs and outputs formatted resistance values, Hosted on AWS Lambda for a serverless architecture.',
      url: 'https://resist.praneel.tech/',
      tags: ['Python', 'Flask', 'YOLOv8n','ONNX', 'Deep Learning', 'Reinforced Learning', 'Resistors'],
    },
    {
      title: 'Soul Support',
      description: 'A safe space where users can share thoughts, seek support, book appointments and engage in meaningful discussions 100% anonymous, secure.',
      url: 'https://soulsupport.utkarshcode.com/',
      tags: ['Next.js', 'Website', 'CSS','JavaScript','Node.js','n8n','Mongo Compass', 'Render', 'Vercel' ]
    },
    {
      title: 'Landing Page + Blog (this site)',
      description: 'Minimal personal landing page with a blog, dark/light theme, and static posts.',
      url: 'https://github.com/Praneel7015/landing-page',
      tags: ['Next.js', 'Website', 'CSS','JavaScript','Node.js','AWS',]
    },
    {
      title: 'AWS Riot Rift Rewind',
      description: 'Animated gaming hub landing page with neon visuals, featured game showcase, and static Next.js routes ready for AWS deployment.',
      url: 'https://github.com/Praneel7015/aws-riot-rift-rewind',
      tags: ['Next.js', 'Website Page','CSS','JavaScript','Node.js','AWS','Riot-API'],
    },
    {
      title: 'n8n Gmail Calendar Agent',
      description: 'Customizable n8n AI assistant that schedules meetings and handles Gmail tasks by orchestrating Google Calendar and Gmail nodes with guarded tool usage.',
      url: 'https://github.com/Praneel7015/n8n-gmail-calendar-agent',
      tags: ['n8n', 'Automation', 'Google Calendar', 'Gmail', 'AI','Chatbot'],
    },
    {
      title: 'n8n Chatbot Google Workspace Assistant',
      description: 'Webhook-driven n8n workflow that lets an AI agent manage Gmail and Google Calendar tasks through natural language requests.',
      url: 'https://github.com/Praneel7015/n8n-chatbot-gcal-mail',
      tags: ['n8n', 'Automation', 'Google Calendar', 'Gmail', 'AI','Webhook','Chatbot'],
    },
    {
      title: 'Discord GitHub Blog Buddy',
      description: 'Self-hosted n8n workflow that turns Discord messages into AI-drafted Markdown posts and commits them to your blog repository with guardrails.',
      url: 'https://github.com/Praneel7015/n8n-discord-github-blog-buddy',
      tags: ['n8n', 'Automation', 'Discord', 'GitHub', 'AI','Chatbot'],
    },
    {
      title: 'Webhook Chatbot Interface',
      description: 'Messenger-style web UI for testing webhook-powered AI agents with live typing indicators, theme toggle, and markdown chat bubbles.',
      url: 'https://github.com/Praneel7015/webhook-chatbot-interface',
      tags: ['HTML', 'CSS', 'JavaScript', 'Chat UI', 'Webhook','Chatbot Interface'],
    },
    {
      title: 'Business Manager ADK',
      description: 'A multi-agent business manager system built with the Agent Development Kit (ADK). It features specialized agents for communication, finance, sales, inventory, and purchase, and integrates with Google APIs for email and calendar automation.',
      url: 'https://github.com/Praneel7015/business-adk',
      tags: ['Python', 'Google ADK','SQLite','API','Multi-agentic']
    },
    {
      title: 'MultiAgent CRUD System',
      description: ' An Conversational client management system built with the Google Agent Development Kit (ADK).It features a natural language interface where users can interact with a friendly Manager Agent that coordinates specialized sub-agents to handle client database operations using the Gemini 2.0 Flash model.',
      url: 'https://github.com/Praneel7015/multiagent-crud-system',
      tags: ['Python', 'Google ADK','API','SQLite','Multi-agentic']
    },
    {
      title: 'Mahabharata CLI RPG',
      description: 'A lightweight, single-file Java console RPG inspired by the epic Mahabharata. You travel abstract zones, battle spirits and shades of past warriors, gain power, and ultimately confront the Vengeful Spirit of Duryodhana.',
      url: 'https://github.com/Praneel7015/simple-java-cli-rpg',
      tags: ['Java','CLI','RPG','Encapsulation','Polymorphism','Inheritance'],
    },
    {
      title:'MY-LOSS',
      description:"MUKTI's Yearly Operating System Selector is an Interactive Quiz to Choose your favourite Operating System, Based On your Answers, Determined by Our Trained Machine Learning Model, We determine the best Operating Sytem For you.",
      url:'https://github.com/nikhil-yn-aix/MY_LOSS',
      tags:['Python','HTML','CSS','JavaScript','Flask','ML'],
    },

  ];
}
