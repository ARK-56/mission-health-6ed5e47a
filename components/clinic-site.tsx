'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, HeartPulse, Phone } from 'lucide-react'

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
  StorySection,
  TrustStrip,
} from './sections'

/**
 * Words the headline cycles through. Each has to read correctly after "a", so all
 * are consonant-initial ("an" would be wrong), and each is short enough to sit on
 * the headline's last line -- a longer phrase would wrap and add a line, making the
 * whole hero jump on every flip.
 */
const HEADLINE_WORDS = ['conversation.', 'check-up.', 'phone call.', 'partnership.']

function FlippingWord() {
  // always starts on index 0 so the server and client render the same first frame
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % HEADLINE_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  // the key remounts the element, replaying the CSS flip on each change
  return <span className="flip-word"><i key={index}>{HEADLINE_WORDS[index]}</i></span>
}

export function ClinicSite() {
  return (
    <ClinicShell>
      <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy hero-stagger"><p className="eyebrow">Primary care, made personal</p><h1>Better health starts with a <FlippingWord /></h1><p className="hero-text">Your health is personal. Your care should be, too. Mission brings trusted clinicians, thoughtful technology, and more time for what matters to you.</p><div className="hero-actions"><a className="button" href={PHONE_TEL}><Phone size={18} /> Call {PHONE}</a><a className="text-link" href="#care">Explore our care <ArrowRight size={17} /></a></div><div className="hero-note"><span className="avatar-stack"><span>M</span><span>P</span><span>C</span></span><span><strong>Now welcoming new patients</strong><small>Same-day appointments · No referral needed</small></span></div></div><div className="hero-art" aria-label="A clinician talking with a patient" role="img"><div className="art-window"></div><div className="art-card"><HeartPulse size={19} /><span><strong>Care, connected.</strong><small>Every visit moves you forward.</small></span></div><div className="art-caption"><span className="caption-line"></span><span>Here for your whole health</span></div></div></div></section>
      <TrustStrip />
      <CareSection />
      <PathwaySection />
      <StorySection />
      <ProvidersSection />
      <InsuranceSection />
      <HoursSection />
      <ResourcesSection />
      <LocationsSection />
      <FaqSection />
      <CtaSection />
    </ClinicShell>
  )
}
