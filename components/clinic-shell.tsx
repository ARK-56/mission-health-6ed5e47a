'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'

import { AFTER_HOURS, BUSINESS_NAME, EMAIL, FAX, HOURS, LOGO_ALT, LOGO_SRC, PHONE, PHONE_TEL, nav } from '@/lib/site'
import { LOCATIONS } from '@/lib/site'
import { services } from '@/lib/services'

/**
 * The chrome every page shares: utility bar, header and footer. Booking runs
 * through the phone rather than a form, so no page here submits anything.
 */
export function ClinicShell({ className, children }: { className?: string; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  // a full-screen overlay leaves the page scrolling behind it otherwise
  useEffect(() => {
    if (!mobileOpen) { setServicesOpen(false); return }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const header = document.querySelector('.site-header')
    const measure = () => {
      if (header) document.documentElement.style.setProperty('--nav-offset', `${Math.round(header.getBoundingClientRect().bottom)}px`)
    }
    measure()
    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('resize', measure)
      document.documentElement.style.removeProperty('--nav-offset')
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <main className={className}>
      <div className="utility"><div className="shell utility-inner"><span>{HOURS}</span><div className="utility-links"><Link href="/contact">Find a location</Link><a href={PHONE_TEL}><Phone size={13} /> {PHONE}</a></div></div></div>
      <header className="site-header"><div className="shell nav-inner"><Link className="brand" href="/" aria-label="Mission Primary Care home"><Image className="brand-logo" src={LOGO_SRC} alt={LOGO_ALT} width={140} height={130} priority /></Link><nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{nav.map(([href, label]) => href === '/services'
        ? <div className="nav-item" key={href}><span className="nav-item-row"><Link href={href} onClick={() => setMobileOpen(false)}>{label}</Link><button type="button" className="nav-toggle" onClick={() => setServicesOpen((v) => !v)} aria-expanded={servicesOpen} aria-label={servicesOpen ? 'Hide services' : 'Show services'}><ChevronDown size={14} /></button></span><div className={servicesOpen ? 'nav-dropdown open' : 'nav-dropdown'}>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={() => setMobileOpen(false)}>{service.title}<ArrowRight size={14} /></Link>)}</div></div>
        : <Link href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}<a className="button nav-cta" href={PHONE_TEL} onClick={() => setMobileOpen(false)}><Phone size={16} /> Call {PHONE}</a></nav><div className="nav-actions"><a className="button button-small" href={PHONE_TEL}><Phone size={15} /> {PHONE}</a><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></div></div></header>

      {children}

      <footer className="homepage-footer site-footer"><div className="shell footer-grid"><div><Link className="footer-brand" href="/" aria-label="Mission Primary Care home"><Image src={LOGO_SRC} alt={LOGO_ALT} width={160} height={149} /></Link><p>Care for your whole health, close to home.</p></div><div><strong>Explore</strong>{nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/resources">Patient resources</Link></div><div><strong>Get in touch</strong>{LOCATIONS.map((location) => <span className="footer-address" key={location.city}><b>{location.city}</b>{location.street}<br />{location.region}</span>)}<a href={PHONE_TEL}>{PHONE}</a><span>Fax {FAX}</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>Please do not send medical information by email.</span></div><div><strong>Opening hours</strong><p>Monday to Friday, 9am–5pm.<br />Closed 12:30–1:30pm for lunch.<br />Closed weekends.</p><p>{AFTER_HOURS}</p></div></div><div className="shell footer-bottom"><span>© 2026 {BUSINESS_NAME}</span><a href={PHONE_TEL}>Call {PHONE} <ArrowRight size={13} /></a></div></footer>
    </main>
  )
}
