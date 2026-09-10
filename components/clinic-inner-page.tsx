'use client'

import Image from 'next/image'
import { Fragment, type ReactNode } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'

import { PHONE, PHONE_TEL } from '@/lib/site'
import { ClinicShell } from './clinic-shell'
import {
  CareSection,
  CtaSection,
  FaqSection,
  HoursSection,
  InsuranceSection,
  LocationsSection,
  PathwaySection,
  ProvidersSection,
  ResourcesSection,
  SelfPaySection,
  StorySection,
  TrustStrip,
  insurancePlans,
} from './sections'

type PageKind = 'services' | 'new-patients' | 'providers' | 'insurance' | 'resources' | 'about' | 'contact'

/** Blocks a page can be built from: the shared homepage sections, plus the three that are page-specific. */
type Block =
  | 'trust' | 'care' | 'pathway' | 'story' | 'providers' | 'insurance' | 'resources' | 'faq' | 'hours' | 'locations' | 'selfPay'
  | 'content' | 'highlight' | 'cta' | 'innerCta'

/**
 * Every page opens with its own hero and closes on a call to action; in between it
 * draws a different selection of homepage sections, in a different order, so no two
 * pages read the same way. 'content' is the page's own copy, and pages alternate
 * between the light and dark closing CTA.
 */
const layouts: Record<PageKind, Block[]> = {
  services: ['care', 'content', 'story', 'pathway', 'faq', 'cta'],
  'new-patients': ['pathway', 'content', 'selfPay', 'trust', 'care', 'hours', 'resources', 'innerCta'],
  providers: ['providers', 'content', 'story', 'care', 'insurance', 'cta'],
  insurance: ['trust', 'insurance', 'selfPay', 'content', 'highlight', 'faq', 'innerCta'],
  resources: ['resources', 'content', 'faq', 'hours', 'care', 'story', 'cta'],
  about: ['story', 'content', 'providers', 'highlight', 'locations', 'pathway', 'cta'],
  contact: ['locations', 'content', 'hours', 'faq', 'trust', 'providers', 'innerCta'],
}

const pageHighlights: Record<PageKind, { label: string; value: string; note: string; details: string[] }> = {
  services: { label: 'Care that keeps moving', value: 'Same-day', note: 'appointments available for everyday and ongoing care', details: ['Preventive visits', 'Chronic condition support', 'Telehealth when you need it'] },
  'new-patients': { label: 'Your first visit', value: 'Same-day', note: 'appointments available, and no referral needed', details: ['Call to book', 'Clear next steps', 'A team that follows up'] },
  providers: { label: 'The Mission difference', value: '1 team', note: 'working together around your whole health', details: ['Internal medicine', 'Family medicine', 'Physician assistants'] },
  insurance: { label: 'Coverage support', value: 'Most plans', note: 'accepted with help before your visit', details: ['Medicare Part B', 'Medi-Cal', 'Commercial plans'] },
  resources: { label: 'Between visits', value: 'One call', note: 'for refills, records, and appointments', details: ['Refill requests', 'Records requests', 'Appointment booking'] },
  about: { label: 'Our promise', value: 'More human', note: 'care built around time, trust, and context', details: ['Listen closely', 'Explain plainly', 'Keep showing up'] },
  contact: { label: 'Reach Mission', value: PHONE, note: 'Monday to Friday, 9am–5pm', details: ['Call our team', 'Visit a neighborhood clinic', 'Telehealth available'] },
}

const pageData: Record<PageKind, { eyebrow: string; title: string; intro: string; sections: { title: string; body: string; items?: string[] }[] }> = {
  services: { eyebrow: 'Care for every chapter', title: 'Primary care that keeps up with your life.', intro: 'From annual checkups to ongoing support, our care teams make it easier to understand your health and act on what matters.', sections: [{ title: 'Everyday care, thoughtfully done', body: 'Longer visits and practical guidance for every adult patient.', items: ['Annual wellness visits', 'Preventive screenings', 'Same-day sick visits', 'Women’s health', 'Family care for adults', 'Telehealth visits', 'DOT physicals'] }, { title: 'Support for the long term', body: 'When health needs become more complex, you deserve a partner who sees the full picture.', items: ['Diabetes and hypertension care', 'Medication management', 'On-site labs and vaccinations', 'Care coordination and referrals'] }] },
  'new-patients': { eyebrow: 'Start with Mission', title: 'A simpler first step toward better health.', intro: 'We take the mystery out of primary care. Here is what to expect before, during, and after your first visit.', sections: [{ title: 'Three ways we make it easier', body: 'Call for a time that works, tell us what you need, and meet with a clinician who has time to listen.', items: ['Same-day appointments available', 'No referral needed to be seen', 'Call the office to book', 'Leave with a clear, shared care plan'] }, { title: 'What to bring', body: 'Bring your photo ID, insurance card, medication list, and any questions you have been carrying with you.' }] },
  providers: { eyebrow: 'People who listen', title: 'Meet the humans behind your care.', intro: 'My ambition is to build Mission Primary Care into a trusted and respected healthcare organization recognized for exceptional patient care, accessibility, and clinical excellence. Through a patient-centered approach, I aim to improve health outcomes, strengthen our communities, and create a lasting positive impact on the lives of the people we serve.', sections: [{ title: 'Care teams, not quick handoffs', body: 'You can expect continuity, context, and a provider who remembers what matters to you.', items: ['Internal medicine', 'Family medicine', 'General practice', 'Emergency medicine'] }, { title: 'Care in your language', body: 'Between them, our clinicians speak English, Spanish, Hindi, Urdu, Punjabi, Farsi, Gujarati, and Tagalog.' }] },
  insurance: { eyebrow: 'Coverage made clearer', title: 'Care that works with your plan.', intro: 'We are contracted with Medicare Part B, Medi-Cal, and a range of commercial plans and medical groups.', sections: [{ title: 'Plans and groups we work with', body: 'Coverage varies by plan and service. Call our team to confirm your specific plan.', items: [...insurancePlans] }, { title: 'Paying without insurance', body: 'We see self-pay patients, and our rates are published up front: $200 for a first visit, $100 once you are an established patient, and $200 for a DOT physical.' }] },
  resources: { eyebrow: 'Useful, understandable health info', title: 'Tools for feeling more informed.', intro: 'Good care continues between visits. Our team is a phone call away for the things you need in between.', sections: [{ title: 'Prescription refills', body: 'Call the office to request a refill, or ask your pharmacy to send the request to us directly.' }, { title: 'Medical records', body: 'Call the office and we will send you a medical records release form to complete.' }] },
  about: { eyebrow: 'Why Mission exists', title: 'Primary care with more humanity in it.', intro: 'We believe healthcare works better when people have time, context, and a team they can trust.', sections: [{ title: 'Built around your real life', body: 'Mission brings thoughtful clinical care together with the warmth of a familiar practice.', items: ['Longer, unrushed visits', 'No referral needed', 'Connected care teams', 'Clear next steps'] }, { title: 'Our promise', body: 'We will listen closely, explain plainly, and keep showing up for your health.' }] },
  contact: { eyebrow: 'We are here to help', title: 'Let’s find the right care for you.', intro: 'Whether you are ready to book or simply have a question, our team is happy to help.', sections: [{ title: 'Talk with Mission', body: `Call ${PHONE} Monday through Friday, 9am–5pm. We close for lunch between 12:30pm and 1:30pm.`, items: [`Phone: ${PHONE}`, 'Fax: 510-796-7797', 'Email: mpc3755@gmail.com'] }, { title: 'When we are closed', body: 'Leave a voicemail for non-urgent matters and we will return your call. For urgent or emergency care, go to the nearest emergency room or call 911.' }] },
}

const additionalSections: Record<PageKind, { title: string; body: string; items?: string[] }[]> = {
  services: [{ title: 'Visits that fit your schedule', body: 'Choose in-person or telehealth care with appointment times designed around real work and life schedules.', items: ['Weekday availability', 'Telehealth follow-ups', 'Convenient lab visits'] }, { title: 'Prevention with a plan', body: 'We turn screenings and health goals into a practical plan you can actually keep up with.' }, { title: 'Specialist coordination', body: 'When you need more support, we help connect referrals, records, and next steps.' }, { title: 'Care through adulthood', body: 'From early adulthood through your senior years, our clinicians support you and the adults in your life.' }, { title: 'Your care, in context', body: 'We consider your routines, family history, medications, and priorities—not just a single symptom.' }],
  'new-patients': [{ title: 'Before you arrive', body: 'Have your medication list handy and think about what you hope to accomplish at the visit.' }, { title: 'During your visit', body: 'Your provider listens first, reviews your history, and makes space for every question.' }, { title: 'After you leave', body: 'Receive a clear plan, recommended follow-ups, and a straightforward way to reach your care team.' }, { title: 'For the adults in your life', body: 'We can coordinate care for partners, parents, and the other adults who count on you.' }, { title: 'Need help choosing?', body: 'Call the office and our team can help you pick the right visit type before you book.' }],
  providers: [{ title: 'Our clinical approach', body: 'We pair evidence-based medicine with careful listening, shared decisions, and practical follow-through.' }, { title: 'A familiar face', body: 'Continuity matters. We work to make your care feel connected across visits and seasons of life.' }, { title: 'More than a visit', body: 'Your care team reviews results, answers questions, and stays engaged after you return home.' }, { title: 'Inclusive by design', body: 'Every patient deserves care that respects identity, culture, access, and lived experience.' }, { title: 'Choose your fit', body: 'Tell us what you value in a provider and we will help you find a clinician who feels right.' }],
  insurance: [{ title: 'Before your appointment', body: 'We verify benefits where possible and explain likely costs before care begins.' }, { title: 'Self-pay welcome', body: 'If you are paying out of pocket, you will find our rates on this page. Call the office and our team will confirm what your visit includes.' }, { title: 'Understanding your benefits', body: 'We can help you make sense of deductibles, copays, preventive coverage, and referrals.' }, { title: 'Care without surprises', body: 'You should know what comes next. We communicate openly about recommendations and costs.' }, { title: 'Questions about a bill?', body: 'Call the office and our team will review your statement with you.' }],
  resources: [{ title: 'Guides you can use', body: 'Ask your care team for plain-language information on preparing, recovering, and making decisions with confidence.' }, { title: 'Booking a visit', body: 'Call the office during opening hours and we will find you the earliest available appointment.' }, { title: 'Medication support', body: 'Keep an updated medication list and ask your care team about interactions or changes.' }, { title: 'Healthy routines', body: 'Small, sustainable habits often matter most. Start with guidance that fits your daily life.' }, { title: 'When to call', body: 'If something changes or you are unsure what to do next, your care team can help you decide.' }],
  about: [{ title: 'Why primary care matters', body: 'A trusted primary care relationship can make every other part of healthcare easier to navigate.' }, { title: 'Care in your language', body: 'Our team speaks English, Spanish, Hindi, Urdu, Punjabi, Farsi, Gujarati, and Tagalog.' }, { title: 'Listening is clinical care', body: 'Understanding what is happening in your life helps us make better recommendations.' }, { title: 'Rooted in community', body: 'Mission is designed to be a steady, welcoming presence for the neighborhoods we serve.' }, { title: 'The future of family practice', body: 'We are building a healthier model around time, trust, teamwork, and clear communication.' }],
  contact: [{ title: 'Call us', body: `Our team is available Monday through Friday, 9am–5pm at ${PHONE}. Same-day appointments are available.` }, { title: 'Visit in person', body: 'Our clinics offer welcoming spaces, primary care, on-site labs, and support in one place.' }, { title: 'Urgent concerns', body: 'For emergencies, call 911. For urgent matters when we are closed, go to the nearest emergency room.' }, { title: 'Send a fax', body: 'Records and referrals can be faxed to 510-796-7797.' }, { title: 'Email us', body: 'For general, non-medical questions, email mpc3755@gmail.com. Please do not send medical information by email.' }],
}

const imageByPage: Record<PageKind, string> = { services: '/clinic-care.png', 'new-patients': '/clinic-care.png', providers: '/team/zia.webp', insurance: '/clinic-care.png', resources: '/clinic-wellness.png', about: '/clinic-team.png', contact: '/clinic-care.png' }

const imageAlt: Record<string, string> = {
  '/clinic-care.png': 'A Mission clinician talking with a patient during a visit',
  '/clinic-team.png': 'The Mission Primary Care team together in the clinic',
  '/team/zia.webp': 'A member of the Mission Primary Care team at the clinic',
  '/clinic-wellness.png': 'Mission wellness essentials arranged on a table',
}

export function ClinicInnerPage({ kind }: { kind: PageKind }) {
  const data = pageData[kind]
  const highlight = pageHighlights[kind]
  const panels = [...data.sections, ...additionalSections[kind]].slice(0, 7)

  const blocks: Record<Block, ReactNode> = {
    trust: <TrustStrip />,
    care: <CareSection />,
    pathway: <PathwaySection />,
    story: <StorySection />,
    providers: <ProvidersSection />,
    insurance: <InsuranceSection />,
    resources: <ResourcesSection />,
    selfPay: <SelfPaySection />,
    locations: <LocationsSection />,
    hours: <HoursSection />,
    faq: <FaqSection />,
    cta: <CtaSection />,
    content: <section className="section care-section inner-content"><div className="shell inner-content-grid">{panels.map((section, i) => <article className="inner-panel" key={section.title} data-aos="zoom-in-up" data-aos-delay={500 + (i % 4) * 100}><p className="eyebrow">Mission care</p><h2>{section.title}</h2><p>{section.body}</p>{section.items && <ul>{section.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>}</article>)}</div></section>,
    highlight: <section className="highlight-band"><div className="shell highlight-inner"><div data-aos="fade-down"><p className="eyebrow">{highlight.label}</p><strong>{highlight.value}</strong><p>{highlight.note}</p></div><div className="highlight-details" data-aos="fade" data-aos-delay="600">{highlight.details.map((detail) => <span key={detail}><Check size={15} />{detail}</span>)}</div></div></section>,
    innerCta: <section className="inner-cta"><div className="shell" data-aos="fade-up"><p className="eyebrow">Now welcoming new patients</p><h2>Let’s make a plan that feels right.</h2><a className="button button-light" href={PHONE_TEL}><Phone size={16} /> Call {PHONE}</a></div></section>,
  }

  return (
    <ClinicShell className={`inner-page inner-page-${kind}`}>
      <section className="hero inner-hero"><div className="shell hero-grid inner-hero-grid"><div className="inner-hero-content hero-stagger"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p><a className="button" href={PHONE_TEL}><Phone size={16} /> Call {PHONE}</a></div><div className="inner-hero-image"><Image src={imageByPage[kind]} alt={imageAlt[imageByPage[kind]]} fill sizes="(max-width: 680px) 100vw, 50vw" priority /></div></div></section>
      {layouts[kind].map((block) => <Fragment key={block}>{blocks[block]}</Fragment>)}
    </ClinicShell>
  )
}
