'use client'

import { ArrowRight, CalendarDays, HeartPulse } from 'lucide-react'

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

export function ClinicSite() {
  return (
    <ClinicShell>
      {({ openBooking, addToCart }) => (
        <>
          <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Primary care, made personal</p><h1>Better health starts with a <i>conversation.</i></h1><p className="hero-text">Your health is personal. Your care should be, too. Mission brings trusted clinicians, thoughtful technology, and more time for what matters to you.</p><div className="hero-actions"><button className="button" onClick={openBooking}><CalendarDays size={18} /> Book an appointment</button><a className="text-link" href="#care">Explore our care <ArrowRight size={17} /></a></div><div className="hero-note"><span className="avatar-stack"><span>J</span><span>M</span><span>A</span></span><span><strong>Trusted by 20,000+ patients</strong><small>Rated 4.9/5 by our community</small></span></div></div><div className="hero-art" aria-label="A clinician talking with a patient" role="img"><div className="art-window"></div><div className="art-card"><HeartPulse size={19} /><span><strong>Care, connected.</strong><small>Every visit moves you forward.</small></span></div><div className="art-caption"><span className="caption-line"></span><span>Here for your whole health</span></div></div></div></section>
          <TrustStrip />
          <CareSection />
          <PathwaySection />
          <StorySection />
          <ProvidersSection />
          <InsuranceSection />
          <ResourcesSection />
          <ShopSection onAdd={addToCart} />
          <Testimonial />
          <FaqSection />
          <CtaSection onBook={openBooking} />
        </>
      )}
    </ClinicShell>
  )
}
