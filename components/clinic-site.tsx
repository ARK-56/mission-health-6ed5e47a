'use client'

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

export function ClinicSite() {
  return (
    <ClinicShell>
      <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Primary care, made personal</p><h1>Better health starts with a <i>conversation.</i></h1><p className="hero-text">Your health is personal. Your care should be, too. Mission brings trusted clinicians, thoughtful technology, and more time for what matters to you.</p><div className="hero-actions"><a className="button" href={PHONE_TEL}><Phone size={18} /> Call {PHONE}</a><a className="text-link" href="#care">Explore our care <ArrowRight size={17} /></a></div><div className="hero-note"><span className="avatar-stack"><span>M</span><span>P</span><span>C</span></span><span><strong>Now welcoming new patients</strong><small>No referral needed · Monday to Friday, 9am–5pm</small></span></div></div><div className="hero-art" aria-label="A clinician talking with a patient" role="img"><div className="art-window"></div><div className="art-card"><HeartPulse size={19} /><span><strong>Care, connected.</strong><small>Every visit moves you forward.</small></span></div><div className="art-caption"><span className="caption-line"></span><span>Here for your whole health</span></div></div></div></section>
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
