/** Career listings — content aligned with mandate / advisory focus for Ananya Realty */

export const careerJobs = [
  {
    slug: 'closing-manager',
    title: 'Closing Manager',
    category: 'Manager',
    type: 'Full Time',
    location: 'Maharashtra, Mumbai',
    posted: 'February 2026',
    highlights: [
      'Immediate joiners will be preferable',
      'Minimum 2 years of experience | Full time | Mumbai, Maharashtra, India.',
    ],
    companyDescription:
      'Ananya Realty Advisory LLP is a results-driven real estate mandate and advisory firm dedicated to delivering exceptional transaction support, strategic guidance, and personalized service. We specialize in comprehensive advisory solutions for developers and industry partners — ensuring clarity, compliance, and value in every deal. At Ananya Realty, our expertise, integrity, and commitment to client success set us apart.',
    roleDescription: null,
    responsibilities: [
      'Lead and oversee real estate transactions from contract execution through final closing.',
      'Manage closing and funding processes to ensure accuracy, compliance, and timely completion.',
      'Coordinate with clients, agents, legal teams, and other stakeholders to deliver a smooth closing experience.',
      'Conduct site visits and support deal closures as required.',
      'Ensure all documentation and processes adhere to regulatory and company standards.',
    ],
    requirements: [
      'Minimum 2 years of experience in residential real estate sales.',
      'Strong knowledge of real estate closings and funding processes.',
      'Excellent communication and interpersonal skills.',
      'Ability to work efficiently in an on-site, team-based environment.',
    ],
    preferredSkills: [
      'Prior leadership or management experience.',
      'Strong sourcing, site visit, and closing capabilities.',
      'Local market knowledge of Mumbai Metropolitan Region.',
      "Bachelor's degree in Sales, Business, or a related field.",
      'Previous experience in a similar role.',
    ],
  },
  {
    slug: 'sourcing-manager',
    title: 'Sourcing Manager',
    category: 'Manager',
    type: 'Full Time',
    location: 'Maharashtra, Mumbai',
    posted: 'February 2026',
    highlights: ['Immediate joiners will be preferable'],
    companyDescription:
      'Ananya Realty Advisory LLP is a results-driven real estate mandate and advisory firm dedicated to delivering exceptional transaction support, strategic guidance, and personalized service. We specialize in comprehensive advisory solutions for developers and industry partners — ensuring clarity, compliance, and value in every deal. At Ananya Realty, our expertise, integrity, and commitment to client success set us apart.',
    roleDescription: null,
    responsibilities: [
      'Identify and source land parcels, residential, commercial, or mixed-use properties aligned with business objectives.',
      'Conduct market research to evaluate locations, pricing trends, demand-supply dynamics, and growth potential.',
      'Build and maintain strong relationships with landowners, brokers, channel partners, and local authorities.',
      'Coordinate with legal, finance, and project teams to support due diligence and deal structuring.',
      'Assist in negotiation of commercial terms and support successful acquisition of viable real estate projects.',
      'Conduct site visits and assess preliminary feasibility of potential opportunities.',
    ],
    requirements: [
      'Minimum 2 years of experience in residential real estate sales or sourcing.',
      'Strong sourcing, site visit, and closing capabilities.',
      'Excellent communication and interpersonal skills for cross-functional collaboration.',
      'Ability to work efficiently in an on-site, team-oriented environment.',
    ],
    preferredSkills: [
      'Prior leadership or management experience.',
      'Local market knowledge of Mumbai Metropolitan Region.',
      "Bachelor's degree in Sales, Business, or a related field.",
      'Previous experience in a similar sourcing or acquisition role.',
    ],
  },
];

export function getJobBySlug(slug) {
  return careerJobs.find((j) => j.slug === slug) ?? null;
}
