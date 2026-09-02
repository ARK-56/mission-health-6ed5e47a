'use client'

import Image from 'next/image'
import { Fragment, type ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'

import { ClinicShell } from './clinic-shell'
import {
  CareSection,
  CtaSection,
  FaqSection,
  InsuranceSection,
  PathwaySection,
  ProvidersSection,
  ResourcesSection,
  ShopSection,
  StorySection,
  Testimonial,
  TrustStrip,
} from './sections'

type PageKind = 'services' | 'new-patients' | 'providers' | 'insurance' | 'resources' | 'wellness-shop' | 'about' | 'contact'

/** Blocks a page can be built from: the shared homepage sections, plus the three that are page-specific. */
type Block =
  | 'trust' | 'care' | 'pathway' | 'story' | 'providers' | 'insurance' | 'resources' | 'shop' | 'testimonial' | 'faq'
  | 'content' | 'highlight' | 'cta' | 'innerCta'

/**
 * Every page opens with its own hero and closes on a call to action; in between it
 * draws a different selection of homepage sections, in a different order, so no two
 * pages read the same way. 'content' is the page's own copy, and pages alternate
 * between the light and dark closing CTA.
 */
const layouts: Record<PageKind, Block[]> = {
  services: ['care', 'content', 'story', 'pathway', 'testimonial', 'faq', 'cta'],
  'new-patients': ['pathway', 'content', 'trust', 'care', 'resources', 'faq', 'innerCta'],
  providers: ['providers', 'content', 'story', 'testimonial', 'care', 'insurance', 'cta'],
  insurance: ['trust', 'insurance', 'content', 'highlight', 'faq', 'pathway', 'innerCta'],
  resources: ['resources', 'content', 'faq', 'care', 'shop', 'story', 'cta'],
  'wellness-shop': ['shop', 'content', 'highlight', 'testimonial', 'trust', 'care', 'innerCta'],
  about: ['story', 'content', 'providers', 'highlight', 'testimonial', 'pathway', 'cta'],
  contact: ['content', 'faq', 'trust', 'providers', 'resources', 'story', 'innerCta'],
}

const pageHighlights: Record<PageKind, { label: string; value: string; note: string; details: string[] }> = {
  services: { label: 'Care that keeps moving', value: 'Same-week', note: 'appointments for everyday and ongoing care', details: ['Preventive visits', 'Chronic condition support', 'Virtual care when you need it'] },
  'new-patients': { label: 'Your first visit', value: '45 min', note: 'to talk through your health, goals, and questions', details: ['Simple online forms', 'Clear next steps', 'A team that follows up'] },
  providers: { label: 'The Mission difference', value: '1 team', note: 'working together around your whole health', details: ['Family medicine', 'Internal medicine', 'Nurse practitioners'] },
  insurance: { label: 'Coverage support', value: 'Most plans', note: 'accepted with help before your visit', details: ['Benefits checks', 'Self-pay options', 'Transparent estimates'] },
  resources: { label: 'Between visits', value: '24/7', note: 'access to practical tools and your care team', details: ['Health guides', 'Secure messages', 'Refill requests'] },
  'wellness-shop': { label: 'Clinician selected', value: '3 essentials', note: 'to support everyday health habits', details: ['Practical tools', 'Simple routines', 'Thoughtful guidance'] },
  about: { label: 'Our promise', value: 'More human', note: 'care built around time, trust, and context', details: ['Listen closely', 'Explain plainly', 'Keep showing up'] },
  contact: { label: 'Reach Mission', value: 'Here for you', note: 'when you are ready to take the next step', details: ['Call our team', 'Book online', 'Visit a neighborhood clinic'] },
}

const pageData: Record<PageKind, { eyebrow: string; title: string; intro: string; sections: { title: string; body: string; items?: string[] }[] }> = {
  services: { eyebrow: 'Care for every chapter', title: 'Primary care that keeps up with your life.', intro: 'From annual checkups to ongoing support, our care teams make it easier to understand your health and act on what matters.', sections: [{ title: 'Everyday care, thoughtfully done', body: 'Same-week appointments, longer visits, and practical guidance for the whole family.', items: ['Annual wellness visits', 'Preventive screenings', 'Same-day sick visits', 'Women’s health', 'Pediatric primary care', 'Virtual visits'] }, { title: 'Support for the long term', body: 'When health needs become more complex, you deserve a partner who sees the full picture.', items: ['Diabetes and hypertension care', 'Medication management', 'Behavioral health support', 'Care coordination and referrals'] }] },
  'new-patients': { eyebrow: 'Start with Mission', title: 'A simpler first step toward better health.', intro: 'We take the mystery out of primary care. Here is what to expect before, during, and after your first visit.', sections: [{ title: 'Three ways we make it easier', body: 'Choose a time that works, tell us what you need, and meet with a clinician who has time to listen.', items: ['Book online in a few minutes', 'Complete forms securely before you arrive', 'Leave with a clear, shared care plan'] }, { title: 'What to bring', body: 'Bring your photo ID, insurance card, medication list, and any questions you have been carrying with you.' }] },
  providers: { eyebrow: 'People who listen', title: 'Meet the humans behind your care.', intro: 'Our physicians, nurse practitioners, and care teams bring clinical expertise and a genuinely personal approach to every visit.', sections: [{ title: 'Care teams, not quick handoffs', body: 'You can expect continuity, context, and a provider who remembers what matters to you.', items: ['Maya Chen, MD — Family medicine', 'Jordan Ellis, DO — Internal medicine', 'Nia Williams, FNP-C — Family nurse practitioner'] }, { title: 'A team around you', body: 'Our care coordinators help connect your visits, labs, prescriptions, and referrals so you do not have to do it alone.' }] },
  insurance: { eyebrow: 'Coverage made clearer', title: 'Care that works with your plan.', intro: 'We accept most major insurance plans and will help you understand your benefits before your visit.', sections: [{ title: 'Common plans we accept', body: 'Coverage varies by location and service. Call our team to confirm your specific plan.', items: ['Aetna', 'Cigna', 'UnitedHealthcare', 'Blue Cross Blue Shield', 'Humana', 'Kaiser Permanente'] }, { title: 'No insurance? No problem.', body: 'Our team can explain self-pay visit options and help you find the right next step.' }] },
  resources: { eyebrow: 'Useful, understandable health info', title: 'Tools for feeling more informed.', intro: 'Good care continues between visits. Explore practical resources made to help you ask better questions and build healthier routines.', sections: [{ title: 'Patient resources', body: 'Helpful guides for the moments when you need a little more clarity.', items: ['Preparing for your annual physical', 'Understanding common lab results', 'Building a medication list', 'Questions to ask at your next visit'] }, { title: 'Patient portal', body: 'Message your care team, review visit notes, request refills, and keep your health information close at hand.' }] },
  'wellness-shop': { eyebrow: 'Mission Wellness Shop', title: 'Small tools for better everyday health.', intro: 'Clinician-informed essentials selected to support the habits that make a difference over time.', sections: [{ title: 'Featured wellness essentials', body: 'Shop practical products that fit naturally into your care plan.', items: ['Mission Daily Wellness Kit — $38', 'At-Home Blood Pressure Cuff — $64', 'Recovery Essentials — $29'] }, { title: 'Thoughtfully selected', body: 'Our products are educational and supportive. They do not replace diagnosis, treatment, or advice from your clinician.' }] },
  about: { eyebrow: 'Why Mission exists', title: 'Primary care with more humanity in it.', intro: 'We believe healthcare works better when people have time, context, and a team they can trust.', sections: [{ title: 'Built around your real life', body: 'Mission brings modern access and thoughtful clinical care together, without losing the warmth of a familiar practice.', items: ['Longer, unrushed visits', 'Easy online access', 'Connected care teams', 'Clear next steps'] }, { title: 'Our promise', body: 'We will listen closely, explain plainly, and keep showing up for your health.' }] },
  contact: { eyebrow: 'We are here to help', title: 'Let’s find the right care for you.', intro: 'Whether you are ready to book or simply have a question, our team is happy to help.', sections: [{ title: 'Talk with Mission', body: 'Call 1-800-555-0140 Monday through Friday, 8am–6pm, or send us a message.', items: ['Phone: 1-800-555-0140', 'Email: hello@missionprimarycare.com', '200 Mission Street, Suite 100'] }, { title: 'Find a location', body: 'Our neighborhood clinics offer primary care, labs, and virtual visits in one connected experience.' }] },
}

const additionalSections: Record<PageKind, { title: string; body: string; items?: string[] }[]> = {
  services: [{ title: 'Visits that fit your schedule', body: 'Choose in-person or virtual care with appointment times designed around real family schedules.', items: ['Early morning availability', 'Virtual follow-ups', 'Convenient lab visits'] }, { title: 'Prevention with a plan', body: 'We turn screenings and health goals into a practical plan you can actually keep up with.' }, { title: 'Specialist coordination', body: 'When you need more support, we help connect referrals, records, and next steps.' }, { title: 'Care for every age', body: 'From childhood through older adulthood, our clinicians support the people and families in your life.' }, { title: 'Your care, in context', body: 'We consider your routines, family history, medications, and priorities—not just a single symptom.' }],
  'new-patients': [{ title: 'Before you arrive', body: 'Complete a few secure forms, share your medication list, and tell us what you hope to accomplish.' }, { title: 'During your visit', body: 'Your provider listens first, reviews your history, and makes space for every question.' }, { title: 'After you leave', body: 'Receive a written plan, recommended follow-ups, and a clear way to reach your care team.' }, { title: 'For the whole family', body: 'We can coordinate care for partners, children, parents, and the people who count on you.' }, { title: 'Need help choosing?', body: 'Our patient team can help you select the right visit type before you book.' }],
  providers: [{ title: 'Our clinical approach', body: 'We pair evidence-based medicine with careful listening, shared decisions, and practical follow-through.' }, { title: 'A familiar face', body: 'Continuity matters. We work to make your care feel connected across visits and seasons of life.' }, { title: 'More than a visit', body: 'Your care team reviews results, answers questions, and stays engaged after you return home.' }, { title: 'Inclusive by design', body: 'Every patient deserves care that respects identity, culture, access, and lived experience.' }, { title: 'Choose your fit', body: 'Tell us what you value in a provider and we will help you find a clinician who feels right.' }],
  insurance: [{ title: 'Before your appointment', body: 'We verify benefits where possible and explain likely costs before care begins.' }, { title: 'Transparent self-pay', body: 'If you are paying out of pocket, our team outlines visit options and estimates clearly.' }, { title: 'Understanding your benefits', body: 'We can help you make sense of deductibles, copays, preventive coverage, and referrals.' }, { title: 'Care without surprises', body: 'You should know what comes next. We communicate openly about recommendations and costs.' }, { title: 'Questions about a bill?', body: 'Our billing team is available to review statements and help resolve questions.' }],
  resources: [{ title: 'Guides you can use', body: 'Find plain-language information for preparing, recovering, and making decisions with confidence.' }, { title: 'Your secure portal', body: 'Review your care plan, send a message, request a refill, or keep track of upcoming visits.' }, { title: 'Medication support', body: 'Keep an updated medication list and ask your care team about interactions or changes.' }, { title: 'Healthy routines', body: 'Small, sustainable habits often matter most. Start with guidance that fits your daily life.' }, { title: 'When to call', body: 'If something changes or you are unsure what to do next, your care team can help you decide.' }],
  'wellness-shop': [{ title: 'Chosen with care', body: 'Every item is selected for usefulness, quality, and how naturally it fits into everyday routines.' }, { title: 'Build a better routine', body: 'Use simple tools to support hydration, movement, sleep, recovery, and self-awareness.' }, { title: 'Ask your clinician', body: 'Bring questions about products to your next visit so your care plan stays connected.' }, { title: 'Thoughtful gifting', body: 'Give practical wellness support to someone you love without adding complexity.' }, { title: 'A helpful starting point', body: 'Products are educational tools—not replacements for diagnosis or individualized medical advice.' }],
  about: [{ title: 'Why primary care matters', body: 'A trusted primary care relationship can make every other part of healthcare easier to navigate.' }, { title: 'Modern access, familiar care', body: 'We combine digital convenience with the warmth and continuity of a family practice.' }, { title: 'Listening is clinical care', body: 'Understanding what is happening in your life helps us make better recommendations.' }, { title: 'Rooted in community', body: 'Mission is designed to be a steady, welcoming presence for the neighborhoods we serve.' }, { title: 'The future of family practice', body: 'We are building a healthier model around time, trust, teamwork, and clear communication.' }],
  contact: [{ title: 'Book your visit', body: 'Choose an appointment online or call our team for help finding the right kind of care.' }, { title: 'Call us', body: 'Our patient team is available Monday through Friday, 8am–6pm at 1-800-555-0140.' }, { title: 'Send a message', body: 'For general questions, email hello@missionprimarycare.com and we will follow up.' }, { title: 'Visit in person', body: 'Our clinics offer welcoming spaces, primary care, labs, and support in one place.' }, { title: 'Urgent concerns', body: 'For emergencies, call 911. For time-sensitive questions, contact your care team directly.' }],
}

const imageByPage: Record<PageKind, string> = { services: '/clinic-care.png', 'new-patients': '/clinic-care.png', providers: '/clinic-team.png', insurance: '/clinic-care.png', resources: '/clinic-wellness.png', 'wellness-shop': '/clinic-wellness.png', about: '/clinic-team.png', contact: '/clinic-care.png' }

const imageAlt: Record<string, string> = {
  '/clinic-care.png': 'A Mission clinician talking with a patient during a visit',
  '/clinic-team.png': 'The Mission Primary Care team together in the clinic',
  '/clinic-wellness.png': 'Mission wellness essentials arranged on a table',
}

export function ClinicInnerPage({ kind }: { kind: PageKind }) {
  const data = pageData[kind]
  const highlight = pageHighlights[kind]
  const panels = [...data.sections, ...additionalSections[kind]].slice(0, 7)

  return (
    <ClinicShell className={`inner-page inner-page-${kind}`}>
      {({ openBooking, addToCart }) => {
        const blocks: Record<Block, ReactNode> = {
          trust: <TrustStrip />,
          care: <CareSection />,
          pathway: <PathwaySection />,
          story: <StorySection />,
          providers: <ProvidersSection />,
          insurance: <InsuranceSection />,
          resources: <ResourcesSection />,
          shop: <ShopSection onAdd={addToCart} />,
          testimonial: <Testimonial />,
          faq: <FaqSection />,
          cta: <CtaSection onBook={openBooking} />,
          content: <section className="section care-section inner-content"><div className="shell inner-content-grid">{panels.map((section) => <article className="inner-panel" key={section.title}><p className="eyebrow">Mission care</p><h2>{section.title}</h2><p>{section.body}</p>{section.items && <ul>{section.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>}</article>)}</div></section>,
          highlight: <section className="highlight-band"><div className="shell highlight-inner"><div><p className="eyebrow">{highlight.label}</p><strong>{highlight.value}</strong><p>{highlight.note}</p></div><div className="highlight-details">{highlight.details.map((detail) => <span key={detail}><Check size={15} />{detail}</span>)}</div></div></section>,
          innerCta: <section className="inner-cta"><div className="shell"><p className="eyebrow">Your health is personal</p><h2>Let’s make a plan that feels right.</h2><button className="button button-light" onClick={openBooking}>Find your appointment <ArrowRight size={16} /></button></div></section>,
        }

        return (
          <>
            <section className="hero inner-hero"><div className="shell hero-grid inner-hero-grid"><div className="inner-hero-content"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p><button className="button" onClick={openBooking}>Book an appointment <ArrowRight size={16} /></button></div><div className="inner-hero-image"><Image src={imageByPage[kind]} alt={imageAlt[imageByPage[kind]]} fill sizes="(max-width: 680px) 100vw, 50vw" priority /></div></div></section>
            {layouts[kind].map((block) => <Fragment key={block}>{blocks[block]}</Fragment>)}
          </>
        )
      }}
    </ClinicShell>
  )
}
