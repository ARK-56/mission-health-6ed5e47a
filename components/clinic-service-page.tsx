'use client'

import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'

import { PHONE, PHONE_TEL } from '@/lib/site'
import { services, serviceBySlug } from '@/lib/services'
import { ClinicShell } from './clinic-shell'
import { CtaSection, FaqSection, HoursSection, LocationsSection, SelfPaySection, TrustStrip } from './sections'

export function ClinicServicePage({ slug }: { slug: string }) {
  const service = serviceBySlug(slug)
  if (!service) return null
  const others = services.filter((s) => s.slug !== slug)

  return (
    <ClinicShell className={`inner-page inner-page-service inner-page-service-${slug}`}>
      <section className="hero inner-hero service-hero"><div className="shell"><p className="eyebrow"><Link href="/services">Care &amp; services</Link></p><h1>{service.title}</h1><p className="service-intro">{service.intro}</p><a className="button" href={PHONE_TEL}><Phone size={16} /> Call {PHONE}</a></div></section>

      <section className="section care-section"><div className="shell service-body"><div><p className="eyebrow">What this includes</p><h2>{service.text}</h2><ul className="service-points">{service.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul></div><aside className="service-aside"><strong>Booking this visit</strong><p>Call the office Monday to Friday, 9am–5pm. No referral is needed to be seen, and same-day appointments are available.</p><a className="text-link" href={PHONE_TEL}>{PHONE} <ArrowRight size={16} /></a></aside></div></section>

      <TrustStrip />
      {slug === 'dot-physicals' ? <SelfPaySection /> : <HoursSection />}

      <section className="section care-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">More from Mission</p><h2>Other ways we care for you.</h2></div><p>Every service is delivered by the same connected team across our three East Bay clinics.</p></div><div className="service-grid">{others.map((other) => <article className="service-card" key={other.slug}><h3>{other.title}</h3><p>{other.text}</p><Link href={`/services/${other.slug}`}>{other.link} <ArrowRight size={15} /></Link></article>)}</div></div></section>

      <LocationsSection />
      <FaqSection />
      <CtaSection />
    </ClinicShell>
  )
}
