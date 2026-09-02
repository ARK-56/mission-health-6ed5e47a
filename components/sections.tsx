'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Truck,
  UserRound,
  UsersRound,
  Video,
} from 'lucide-react'

import { AFTER_HOURS, HOURS, LOCATIONS, PHONE, PHONE_TEL } from '@/lib/site'

export const services = [
  { icon: Stethoscope, title: 'Primary care', text: 'Thoughtful, continuous care for adults through every season of life.', link: 'Explore primary care' },
  { icon: HeartPulse, title: 'Preventive care & physicals', text: 'Annual wellness visits, screenings, and a clear plan for staying well.', link: 'See preventive care' },
  { icon: ShieldCheck, title: 'Chronic disease management', text: 'Partner with a care team that listens, adjusts, and keeps you moving forward.', link: 'Manage your health' },
  { icon: UserRound, title: 'Women’s health', text: 'Personalized support through menopause and every stage beyond.', link: 'View women’s health' },
  { icon: UsersRound, title: 'Family care', text: 'Care for the adults in one family — partners, parents, and the people who count on you.', link: 'Care for your family' },
  { icon: FlaskConical, title: 'On-site labs & vaccinations', text: 'Bloodwork and immunizations handled in the clinic, without a second trip.', link: 'See what we offer' },
  { icon: Video, title: 'Telehealth', text: 'Many follow-ups and everyday care needs can be handled by video visit.', link: 'Ask about telehealth' },
  { icon: Truck, title: 'DOT physicals', text: 'Department of Transportation medical examinations for commercial drivers.', link: 'Book a DOT physical' },
]

/** Real clinicians. `languages` stands in for a bio until written ones are supplied. */
export const providers = [
  { name: 'Pacita Aducayen, MD', specialty: 'Internal medicine', languages: 'Speaks English and Tagalog.' },
  { name: 'Gautam Pareek, MD', specialty: 'Internal medicine', languages: 'Speaks English and Hindi.' },
  { name: 'Nipa Sinh, MD', specialty: 'Family medicine', languages: 'Speaks English, Hindi, and Gujarati.' },
  { name: 'Kashif Abdullah, MD', specialty: 'General practice', languages: 'Speaks English, Hindi, and Urdu.' },
  { name: 'James Keaney, MD', specialty: 'Emergency medicine', languages: 'Speaks English.' },
  { name: 'Muhammad Khan, PA-C', specialty: 'Physician assistant', languages: 'Speaks English, Urdu, Hindi, Punjabi, and Farsi.' },
  { name: 'Neil Adler, PA-C', specialty: 'Physician assistant', languages: 'Speaks English and Spanish.' },
]

export const gettingStarted = [
  ['01', 'Call the office', `Reach us at ${PHONE}, Monday to Friday, and we will find an appointment that fits.`],
  ['02', 'Meet your provider', 'Have a full visit with someone who takes a proper history and explains every recommendation.'],
  ['03', 'Stay looked after', 'Leave with a clear plan and a practice that follows up on labs, referrals, and prescriptions.'],
] as const

export const insurancePlans = [
  'Medicare Part B', 'Medi-Cal', 'Alameda Alliance', 'Brown & Toland', 'Nivano', 'Imperial Health',
  'Amada', 'UnitedHealthcare PPO', 'Hill Physicians', 'Blue Cross (select plans)', 'Alignment Health',
  'Scan', 'Aetna', 'Cigna',
]

export const faqs = [
  ['Do you accept my insurance?', 'We are contracted with Medicare Part B, Medi-Cal, and a range of commercial plans and medical groups. Call the office to confirm your specific plan before your visit.'],
  ['What should I bring to my first visit?', 'Bring your photo ID, insurance card, medication list, and any questions you want to talk through.'],
  ['Can I see a provider virtually?', 'Yes. Telehealth visits are available for many follow-ups and everyday care needs — call the office to arrange one.'],
  ['Do I need a referral?', 'No referral is needed to be seen. Call the office and our team will book you in.'],
] as const

export function TrustStrip() {
  return <section className="trust-strip"><div className="shell trust-inner"><span>In-network with these plans and more</span><div className="plan-list"><span>Medicare <span>part b</span></span><span>Medi-Cal</span><span>Alameda Alliance</span><span>UnitedHealthcare</span><span>Aetna</span><span>Cigna</span></div></div></section>
}

export function CareSection() {
  return <section className="section care-section" id="care"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Care for the whole you</p><h2>Health is not one-size-fits-all.</h2></div><p>From the everyday to the unexpected, our care teams are here to help you feel heard, understood, and cared for.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text, link }) => <article className="service-card" key={title}><div className="icon-box"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><Link href="/services">{link} <ArrowRight size={15} /></Link></article>)}</div></div></section>
}

export function PathwaySection() {
  return <section className="pathway-section" id="new-patients"><div className="shell"><div className="section-heading"><div><p className="eyebrow">A better way to begin</p><h2>New here? We make it easy.</h2></div><p>Getting primary care should feel straightforward from the first hello to your next follow-up.</p></div><div className="pathway-grid">{gettingStarted.map(([number, title, text]) => <article className="pathway-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

export function LocationsSection() {
  return <section className="pathway-section" id="locations"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Three East Bay clinics</p><h2>Find the Mission nearest you.</h2></div><p>Primary care, on-site labs, and telehealth across San Leandro, Hayward, and Fremont.</p></div><div className="pathway-grid">{LOCATIONS.map((location, index) => <article className="pathway-card" key={location.city}><span>{String(index + 1).padStart(2, '0')}</span><h3>{location.city}</h3><p>{location.street}<br />{location.region}</p><a className="text-link" href={PHONE_TEL}>{PHONE} <ArrowRight size={15} /></a></article>)}</div></div></section>
}

export function StorySection() {
  return <section className="story-section" id="about"><div className="shell story-grid"><div className="story-image"><div className="story-label"><span>01</span><span>Listen first.</span></div></div><div className="story-copy"><p className="eyebrow">The Mission difference</p><h2>More than a visit. A relationship.</h2><p>We believe great primary care is built on trust. That means unrushed conversations, care plans you understand, and a team that remembers your name.</p><div className="check-list"><span><Check size={16} /> No referral needed to be seen</span><span><Check size={16} /> Telehealth visits available</span><span><Check size={16} /> On-site labs and vaccinations</span></div><Link className="text-link" href="/about">Why patients choose Mission <ArrowRight size={17} /></Link></div></div></section>
}

export function ProvidersSection() {
  return <section className="providers-section" id="providers"><div className="shell"><div className="section-heading"><div><p className="eyebrow">People who listen</p><h2>Meet your care team.</h2></div><p>Our clinicians speak English, Spanish, Hindi, Urdu, Punjabi, Farsi, Gujarati, and Tagalog between them.</p></div><div className="provider-grid">{providers.map((provider) => <article className="provider-card" key={provider.name}><div className="provider-avatar"><UserRound size={34} /></div><p className="eyebrow">{provider.specialty}</p><h3>{provider.name}</h3><p>{provider.languages}</p><a className="text-link" href={PHONE_TEL}>Call to book <ArrowRight size={16} /></a></article>)}</div></div></section>
}

export function InsuranceSection() {
  return <section className="insurance-section" id="insurance"><div className="shell insurance-inner"><div><p className="eyebrow">Coverage made clearer</p><h2>We work with your plan.</h2><p>Mission is contracted with Medicare Part B, Medi-Cal, and a range of commercial plans and medical groups. Coverage varies by plan and service, so call our team to confirm yours before your visit.</p></div><div className="insurance-list">{insurancePlans.map((plan) => <span key={plan}>{plan}</span>)}</div></div></section>
}

export function ResourcesSection() {
  return <section className="resources-section" id="resources"><div className="shell resource-grid"><div><p className="eyebrow">Your health, in your hands</p><h2>Care that goes beyond the exam room.</h2><p>Our team is a phone call away for the things you need between visits.</p><a className="button button-outline" href={PHONE_TEL}>Call {PHONE} <ArrowRight size={17} /></a></div><div className="resource-list"><div><span className="resource-number">01</span><span><strong>Book a visit</strong><small>Call the office during opening hours and we will find you a time.</small></span><ChevronRight /></div><div><span className="resource-number">02</span><span><strong>Request a refill</strong><small>Call the office, or ask your pharmacy to send the request to us.</small></span><ChevronRight /></div><div><span className="resource-number">03</span><span><strong>Request your records</strong><small>Call the office and we will send you a medical records release form.</small></span><ChevronRight /></div></div></div></section>
}

export function HoursSection() {
  return <section className="highlight-band" id="hours"><div className="shell highlight-inner"><div><p className="eyebrow">Opening hours</p><strong>Mon–Fri</strong><p>9am–5pm, closed 12:30–1:30pm for lunch. Closed weekends.</p></div><div className="highlight-details"><span><Check size={15} />{AFTER_HOURS}</span></div></div></section>
}

export function FaqSection() {
  const [open, setOpen] = useState(0)
  return <section className="faq-section"><div className="shell faq-grid"><div><p className="eyebrow">Good to know</p><h2>Questions, answered.</h2><p>Still curious? Our care team is here to help, {HOURS}.</p><a className="text-link" href={PHONE_TEL}>Talk to our team <ArrowRight size={17} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><ChevronDown size={19} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div></section>
}

export function CtaSection() {
  return <section className="cta-section" id="book"><div className="shell cta-inner"><div><p className="eyebrow">Now welcoming new patients</p><h2>Make time for your health.</h2></div><a className="button button-light" href={PHONE_TEL}>Call {PHONE} <ArrowRight size={17} /></a></div></section>
}
