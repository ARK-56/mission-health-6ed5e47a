/**
 * The service list, kept free of React imports so route files can read it on the
 * server for static params and metadata. Icons are named here and mapped to
 * components in sections.tsx.
 *
 * `intro` and `points` are scaffolding drawn from the intake and from copy already
 * approved on the site — they carry no clinical claims the practice has not made.
 * They are placeholders for the practice's own service copy.
 */
export type Service = {
  slug: string
  icon: 'stethoscope' | 'heart' | 'shield' | 'woman' | 'family' | 'labs' | 'video' | 'dot'
  title: string
  /** One-line summary used on the service cards. */
  text: string
  /** Card call to action. */
  link: string
  /** Opening line on the service's own page. */
  intro: string
  points: string[]
}

export const services: Service[] = [
  {
    slug: 'primary-care',
    icon: 'stethoscope',
    title: 'Primary care',
    text: 'Thoughtful, continuous care for adults through every season of life.',
    link: 'Explore primary care',
    intro: 'Continuous care for adults, with a provider who knows your history and follows through between visits.',
    points: ['No referral needed to be seen', 'Same-day appointments available', 'In-person or telehealth visits'],
  },
  {
    slug: 'preventive-care',
    icon: 'heart',
    title: 'Preventive care & physicals',
    text: 'Annual wellness visits, screenings, and a clear plan for staying well.',
    link: 'See preventive care',
    intro: 'Annual wellness visits and screenings, turned into a plan you can actually keep up with.',
    points: ['Annual wellness visits', 'Preventive screenings', 'Labs drawn on site'],
  },
  {
    slug: 'chronic-disease-management',
    icon: 'shield',
    title: 'Chronic disease management',
    text: 'Partner with a care team that listens, adjusts, and keeps you moving forward.',
    link: 'Manage your health',
    intro: 'Ongoing support for the conditions that need regular attention, with a team that adjusts the plan as things change.',
    points: ['Diabetes and hypertension care', 'Medication management', 'Care coordination and referrals'],
  },
  {
    slug: 'womens-health',
    icon: 'woman',
    title: 'Women’s health',
    text: 'Personalized support through menopause and every stage beyond.',
    link: 'View women’s health',
    intro: 'Personalized care through menopause and every stage beyond, with time to talk things through.',
    points: ['Unrushed appointments', 'Labs drawn on site', 'Telehealth follow-ups'],
  },
  {
    slug: 'family-care',
    icon: 'family',
    title: 'Family care',
    text: 'Care for the adults in one family — partners, parents, and the people who count on you.',
    link: 'Care for your family',
    intro: 'One practice for the adults in your family — partners, parents, and the people who count on you.',
    points: ['Coordinated care across adult family members', 'Adults only — we do not provide paediatric care', 'Same-day appointments available'],
  },
  {
    slug: 'labs-and-vaccinations',
    icon: 'labs',
    title: 'On-site labs & vaccinations',
    text: 'Bloodwork and immunizations handled in the clinic, without a second trip.',
    link: 'See what we offer',
    intro: 'Bloodwork and immunizations handled in the clinic, so there is no second trip to a separate lab.',
    points: ['Blood draws on site', 'Vaccinations', 'Results reviewed with your provider'],
  },
  {
    slug: 'telehealth',
    icon: 'video',
    title: 'Telehealth',
    text: 'Many follow-ups and everyday care needs can be handled by video visit.',
    link: 'Ask about telehealth',
    intro: 'Many follow-ups and everyday care needs can be handled by video, without coming in.',
    points: ['Follow-up visits', 'Everyday care needs', 'Call the office to arrange one'],
  },
  {
    slug: 'dot-physicals',
    icon: 'dot',
    title: 'DOT physicals',
    text: 'Department of Transportation medical examinations for commercial drivers.',
    link: 'Book a DOT physical',
    intro: 'Department of Transportation medical examinations for commercial drivers.',
    points: ['DOT medical examination', 'Self-pay rate: $200', 'Call the office to book'],
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
