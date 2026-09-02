'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LOCATIONS, PHONE } from '@/lib/site'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  HeartPulse,
  Package,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from 'lucide-react'

export const services = [
  { icon: Stethoscope, title: 'Primary care', text: 'Thoughtful, continuous care for adults through every season of life.', link: 'Explore primary care' },
  { icon: HeartPulse, title: 'Preventive health', text: 'Annual wellness visits, screenings, and a clear plan for staying well.', link: 'See preventive care' },
  { icon: ShieldCheck, title: 'Chronic conditions', text: 'Partner with a care team that listens, adjusts, and keeps you moving forward.', link: 'Manage your health' },
  { icon: UserRound, title: 'Women’s health', text: 'Personalized support through menopause and every stage beyond.', link: 'View women’s health' },
]

export const products = [
  { name: 'Mission Daily Wellness Kit', type: 'A simple start to feeling your best', price: 38, tone: 'mint', mark: 'MW', details: 'Vitamin organizer, symptom journal, and daily hydration guide.' },
  { name: 'At-Home Blood Pressure Cuff', type: 'Clinical confidence, at home', price: 64, tone: 'blue', mark: 'BP', details: 'Clinically validated upper-arm monitor with easy-read display.' },
  { name: 'Recovery Essentials', type: 'Care for the in-between days', price: 29, tone: 'sand', mark: 'RE', details: 'Reusable hot/cold pack, magnesium soak, and restorative stretch cards.' },
]

export const providers = [
  { name: 'Dr. Maya Chen, MD', specialty: 'Family medicine', bio: 'Known for thoughtful preventive care and helping adults build realistic, lasting habits.' },
  { name: 'Dr. Jordan Ellis, DO', specialty: 'Internal medicine', bio: 'Partners with adults managing complex health needs through clear, collaborative plans.' },
  { name: 'Nia Williams, FNP-C', specialty: 'Family nurse practitioner', bio: 'Creates warm, inclusive visits for adult patients at every stage of life.' },
]

export const gettingStarted = [
  ['01', 'Get in touch', 'Call or book online and we will find an appointment that fits.'],
  ['02', 'Meet your provider', 'Have a full visit with someone who takes a proper history and explains every recommendation.'],
  ['03', 'Stay looked after', 'Leave with a clear plan and a practice that follows up on labs, referrals, and prescriptions.'],
] as const

export const insurancePlans = ['Aetna', 'Cigna', 'UnitedHealthcare', 'Blue Cross Blue Shield', 'Humana', 'Kaiser Permanente']

export const faqs = [
  ['Do you accept my insurance?', 'Mission is in-network with most major insurance plans. Call us or check your location for specific plan details.'],
  ['What should I bring to my first visit?', 'Bring your photo ID, insurance card, medication list, and any questions you want to talk through.'],
  ['Can I see a provider virtually?', 'Yes. Many follow-ups and everyday care visits are available virtually through our secure patient portal.'],
  ['How quickly can I get an appointment?', 'Many locations offer same-day and next-day appointments. Book online to see the latest availability.'],
] as const

export function TrustStrip() {
  return <section className="trust-strip"><div className="shell trust-inner"><span>In-network with most major plans</span><div className="plan-list"><span>blue<span>cross</span> blue<span>shield</span></span><span>UnitedHealthcare</span><span className="kaiser">KAISER <small>PERMANENTE</small></span><span>Aetna</span><span>Cigna</span></div></div></section>
}

export function CareSection() {
  return <section className="section care-section" id="care"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Care for the whole you</p><h2>Health is not one-size-fits-all.</h2></div><p>From the everyday to the unexpected, our care teams are here to help you feel heard, understood, and cared for.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text, link }) => <article className="service-card" key={title}><div className="icon-box"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><Link href="/services">{link} <ArrowRight size={15} /></Link></article>)}</div></div></section>
}

export function PathwaySection() {
  return <section className="pathway-section" id="new-patients"><div className="shell"><div className="section-heading"><div><p className="eyebrow">A better way to begin</p><h2>New here? We make it easy.</h2></div><p>Getting primary care should feel straightforward from the first hello to your next follow-up.</p></div><div className="pathway-grid">{gettingStarted.map(([number, title, text]) => <article className="pathway-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

export function LocationsSection() {
  return <section className="pathway-section" id="locations"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Three East Bay clinics</p><h2>Find the Mission nearest you.</h2></div><p>Primary care, labs, and virtual visits across San Leandro, Hayward, and Fremont.</p></div><div className="pathway-grid">{LOCATIONS.map((location, index) => <article className="pathway-card" key={location.city}><span>{String(index + 1).padStart(2, '0')}</span><h3>{location.city}</h3><p>{location.street}<br />{location.region}</p><a className="text-link" href="tel:18005550140">{PHONE} <ArrowRight size={15} /></a></article>)}</div></div></section>
}

export function StorySection() {
  return <section className="story-section" id="about"><div className="shell story-grid"><div className="story-image"><div className="story-label"><span>01</span><span>Listen first.</span></div></div><div className="story-copy"><p className="eyebrow">The Mission difference</p><h2>More than a visit. A relationship.</h2><p>We believe great primary care is built on trust. That means unrushed conversations, care plans you understand, and a team that remembers your name.</p><div className="check-list"><span><Check size={16} /> Same-day and next-day visits</span><span><Check size={16} /> Virtual care when you need it</span><span><Check size={16} /> One connected care team</span></div><Link className="text-link" href="/about">Why patients choose Mission <ArrowRight size={17} /></Link></div></div></section>
}

export function ProvidersSection() {
  return <section className="providers-section" id="providers"><div className="shell"><div className="section-heading"><div><p className="eyebrow">People who listen</p><h2>Meet your care team.</h2></div><p>Experienced clinicians who bring expertise, empathy, and a long view of your health to every visit.</p></div><div className="provider-grid">{providers.map((provider) => <article className="provider-card" key={provider.name}><div className="provider-avatar"><UserRound size={34} /></div><p className="eyebrow">{provider.specialty}</p><h3>{provider.name}</h3><p>{provider.bio}</p><Link className="text-link" href="/providers">Book with this team <ArrowRight size={16} /></Link></article>)}</div></div></section>
}

export function InsuranceSection() {
  return <section className="insurance-section" id="insurance"><div className="shell insurance-inner"><div><p className="eyebrow">Coverage made clearer</p><h2>We work with your plan.</h2><p>Mission accepts most major insurance plans. Coverage varies by location and service, so our team will help you understand your options before your visit.</p></div><div className="insurance-list">{insurancePlans.map((plan) => <span key={plan}>{plan}</span>)}</div></div></section>
}

export function ResourcesSection() {
  return <section className="resources-section" id="resources"><div className="shell resource-grid"><div><p className="eyebrow">Your health, in your hands</p><h2>Care that goes beyond the exam room.</h2><p>Manage your health on your terms with simple digital tools, helpful resources, and a team that is always close by.</p><Link className="button button-outline" href="/resources">Visit the patient portal <ArrowRight size={17} /></Link></div><div className="resource-list"><div><span className="resource-number">01</span><span><strong>Book on your schedule</strong><small>Choose a time and visit type that works for you.</small></span><ChevronRight /></div><div><span className="resource-number">02</span><span><strong>Message your care team</strong><small>Get answers without waiting for your next visit.</small></span><ChevronRight /></div><div><span className="resource-number">03</span><span><strong>Know your next step</strong><small>Clear plans, follow-ups, and resources for home.</small></span><ChevronRight /></div></div></div></section>
}

export function ShopSection({ onAdd }: { onAdd: (name: string) => void }) {
  return <section className="shop-section" id="shop"><div className="shell"><div className="shop-heading"><div><p className="eyebrow">The Mission wellness shop</p><h2>Small tools. Meaningful habits.</h2></div><p>Thoughtfully selected essentials to help you care for yourself between visits.</p></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className={`product-art ${product.tone}`}><span>{product.mark}</span><Package size={34} strokeWidth={1.4} /></div><div className="product-info"><p>{product.type}</p><h3>{product.name}</h3><span className="product-details">{product.details}</span><div className="product-bottom"><strong>${product.price}</strong><button className="add-button" onClick={() => onAdd(product.name)}><Plus size={16} /> Add to cart</button></div></div></article>)}</div></div></section>
}

export function Testimonial() {
  return <section className="testimonial"><div className="shell testimonial-inner"><div className="quote-mark">“</div><blockquote>“I finally feel like I have a doctor who knows me—not just my chart. Every appointment leaves me feeling more confident about my health.”</blockquote><div className="quote-author"><span className="quote-avatar">L</span><span><strong>Lauren M.</strong><small>Mission patient since 2021</small></span></div></div></section>
}

export function FaqSection() {
  const [open, setOpen] = useState(0)
  return <section className="faq-section"><div className="shell faq-grid"><div><p className="eyebrow">Good to know</p><h2>Questions, answered.</h2><p>Still curious? Our care team is here to help.</p><a className="text-link" href="tel:18005550140">Talk to our team <ArrowRight size={17} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><ChevronDown size={19} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div></section>
}

export function CtaSection({ onBook }: { onBook: () => void }) {
  return <section className="cta-section" id="book"><div className="shell cta-inner"><div><p className="eyebrow">Your next chapter starts here</p><h2>Make time for your health.</h2></div><button className="button button-light" onClick={onBook}>Book an appointment <ArrowRight size={17} /></button></div></section>
}
