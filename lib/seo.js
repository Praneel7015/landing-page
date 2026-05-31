export const SITE_URL = 'https://praneel.sindhole.com';
export const SITE_NAME = 'Praneel Sindhole';
export const DEFAULT_TITLE =
  'Praneel Sindhole — FOSS, IoT & Cybersecurity Portfolio';
export const DEFAULT_DESCRIPTION =
  'Praneel Sindhole is a Computer Science student in Bangalore who builds FOSS projects, tinkers with IoT and electronics, and leads MUKTI, his college open-source club.';
export const DEFAULT_OG_IMAGE = '/og/default.png';
export const TWITTER_HANDLE = '';

export const SOCIAL_PROFILES = {
  github: 'https://github.com/Praneel7015',
  linkedin: 'https://www.linkedin.com/in/praneel-sindhole/',
  fossunited: 'https://fossunited.org/u/praneel_sindhole',
  n8n: 'https://n8n.io/creators/praneel7015/',
  mukti: 'https://mukticommunity.github.io/',
};

export function canonicalUrl(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  const withSlash = p.endsWith('/') ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

export function absoluteImage(path) {
  if (!path) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Praneel Sindhole',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    jobTitle: 'Computer Science & Engineering Student',
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Free and Open Source Software',
      'IoT',
      'Electronics',
      'Cybersecurity',
      'n8n automation',
      'Linux',
    ],
    sameAs: [
      SOCIAL_PROFILES.github,
      SOCIAL_PROFILES.linkedin,
      SOCIAL_PROFILES.fossunited,
      SOCIAL_PROFILES.n8n,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'MUKTI',
      url: SOCIAL_PROFILES.mukti,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'Praneel Sindhole',
      url: SITE_URL,
    },
  };
}
