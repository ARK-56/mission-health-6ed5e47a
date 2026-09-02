'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'

import { AFTER_HOURS, BUSINESS_NAME, EMAIL, FAX, HOURS, LOGO_ALT, LOGO_SRC, PHONE, PHONE_TEL, nav } from '@/lib/site'

/**
 * The chrome every page shares: utility bar, header and footer. Booking runs
 * through the phone rather than a form, so no page here submits anything.
 */
export function ClinicShell({ className, children }: { className?: string; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <main className={className}>
      <div className="utility"><div className="shell utility-inner"><span>{HOURS}</span><div className="utility-links"><Link href="/contact">Find a location</Link><a href={PHONE_TEL}><Phone size={13} /> {PHONE}</a></div></div></div>
      <header className="site-header"><div className="shell nav-inner"><Link className="brand" href="/" aria-label="Mission Primary Care home"><Image className="brand-logo" src={LOGO_SRC} alt={LOGO_ALT} width={70} height={70} priority /></Link><nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{nav.map(([href, label]) => <Link href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><a className="button button-small" href={PHONE_TEL}><Phone size={15} /> {PHONE}</a><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></div></div></header>

      {children}

      <footer className="homepage-footer site-footer"><div className="shell footer-grid"><div><Link className="footer-brand" href="/" aria-label="Mission Primary Care home"><Image src={LOGO_SRC} alt={LOGO_ALT} width={104} height={104} /></Link><p>Care for your whole health, close to home.</p></div><div><strong>Explore</strong>{nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/resources">Patient resources</Link></div><div><strong>Get in touch</strong><Link href="/contact">Find a location</Link><a href={PHONE_TEL}>{PHONE}</a><span>Fax {FAX}</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>Please do not send medical information by email.</span></div><div><strong>Opening hours</strong><p>Monday to Friday, 9am–5pm.<br />Closed 12:30–1:30pm for lunch.<br />Closed weekends.</p><p>{AFTER_HOURS}</p></div></div><div className="shell footer-bottom"><span>© 2026 {BUSINESS_NAME}</span><a href={PHONE_TEL}>Call {PHONE} <ArrowRight size={13} /></a></div></footer>
    </main>
  )
}
