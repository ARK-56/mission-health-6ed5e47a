'use client'

import Link from 'next/link'
import { ArrowRight, HeartPulse, Phone } from 'lucide-react'

import { PHONE, PHONE_TEL } from '@/lib/site'
import { RATING_AVERAGE, RATING_TOTAL } from '@/lib/reviews'
import { ClinicShell } from './clinic-shell'
import {
  CareSection,
  CtaSection,
  FaqSection,
  HoursSection,
  LocationsSection,
  PathwaySection,
  ProvidersSection,
  ResourcesSection,
  ReviewsSection,
  Stars,
  StorySection,
  TrustStrip,
} from './sections'

export function ClinicSite() {
  return (
    <ClinicShell>
      <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy hero-stagger"><p className="eyebrow">Primary care, made personal</p><h1>Better health starts with a <i>conversation.</i></h1><p className="hero-text">Your health is personal. Your care should be, too. Mission brings trusted clinicians, thoughtful technology, and more time for what matters to you.</p><div className="hero-actions"><a className="button" href={PHONE_TEL}><Phone size={18} /> Call {PHONE}</a><a className="text-link" href="#care">Explore our care <ArrowRight size={17} /></a></div></div><div className="hero-art" aria-label="The Mission Primary Care clinicians together at the clinic" role="img"><div className="art-window"></div><div className="art-card"><HeartPulse size={19} /><span><Link href="/new-patients"><strong>Now welcoming new patients</strong></Link><small>Same-day appointments · No referral needed</small><a className="hero-rating" href="#reviews" aria-label={`Read what patients say, rated ${RATING_AVERAGE} out of 5 from ${RATING_TOTAL} reviews`}><Stars rating={Math.round(Number(RATING_AVERAGE))} /><small><strong>{RATING_AVERAGE}</strong>/5 from {RATING_TOTAL} reviews</small></a></span></div></div></div></section>
      <TrustStrip />
      <CareSection />
      <PathwaySection />
      <StorySection />
      <ProvidersSection />
      <ReviewsSection count={16} />
      <HoursSection />
      <ResourcesSection />
      <LocationsSection />
      <FaqSection />
      <CtaSection />
    </ClinicShell>
  )
}
