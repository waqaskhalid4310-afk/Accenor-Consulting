// Real client logos from /public/images/clients
export const clients = [
  {
    id: "achievers",
    name: "Achievers",
    logoSrc: "/images/clients/achievers.jpg",
    placeholder: false,
    alt: "Achievers logo",
  },
  {
    id: "ecom-scalers",
    name: "Ecom Scalers",
    logoSrc: "/images/clients/ecom$calers.jpg",
    placeholder: false,
    alt: "Ecom Scalers logo",
  },
  {
    id: "revision-aps",
    name: "Revision ApS",
    logoSrc: "/images/clients/revision_aps.jpg",
    placeholder: false,
    alt: "Revision ApS logo",
  },
  {
    id: "shine-travels",
    name: "Shine Travels",
    logoSrc: "/images/clients/shine_travels.jpg",
    placeholder: false,
    alt: "Shine Travels logo",
  },
  {
    id: "sps",
    name: "SPS",
    logoSrc: "/images/clients/sps.jpg",
    placeholder: false,
    alt: "SPS logo",
  },
  {
    id: "tech-baba",
    name: "Tech Baba",
    logoSrc: "/images/clients/tech_baba.jpg",
    placeholder: false,
    alt: "Tech Baba logo",
  },
  {
    id: "dr_tech_store",
    name: "Dr Tech Store",
    logoSrc: "/images/clients/dr_tech_store.jpg",
    placeholder: false,
    alt: "Dr Tech Store logo",
  }
];

// Home carousel uses the full set (one continuous row).
export const homeClientLogos = clients;

export const clientsHero = {
  eyebrow: "Our Clients",
  title: "Businesses that trust Accenor with their financial work.",
  description:
    "Accenor supports local and international clients with accounting, taxation, registration and advisory.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Our Clients" },
  ],
};

export const clientsAudiences = {
  eyebrow: "Who we support",
  title: "Local and international relationships.",
  description:
    "Engagements range from a first tax return to ongoing remote bookkeeping for companies abroad. Support is shaped around each client's situation.",
  items: [
    {
      title: "Local businesses",
      description:
        "Bookkeeping, tax and registration support for clients across Pakistan.",
    },
    {
      title: "International clients",
      description:
        "Remote multi-currency bookkeeping and back-office support from Rawalpindi.",
    },
    {
      title: "Startups & growing SMEs",
      description:
        "Setup, records and reporting as the business finds its rhythm.",
    },
    {
      title: "Established companies",
      description:
        "Reconciliation, reporting and process improvement for ongoing operations.",
    },
  ],
};

export const clientsCta = {
  title: "Ready to work with Accenor?",
  description:
    "Tell us about your situation and we will explain how we can help.",
  primaryCta: { label: "Contact Us", href: "/contact-us" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
};
