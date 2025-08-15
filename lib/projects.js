// Simple projects data. Update this list with your real projects.
// Each project has: title, description, url, and optional tags.

export function getProjects() {
  return [
    {
      title: 'Landing Page + Blog (this site)',
      description: 'Minimal personal landing page with a blog, dark/light theme, and static posts.',
      url: 'https://github.com/Praneel7015/landing-page',
      tags: ['Next.js', 'Static Site', 'CSS','JavaScript']
    },
    // Add more projects below. Example:
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
      tags: ['Java','CLI','RPG']
    },

  ];
}
