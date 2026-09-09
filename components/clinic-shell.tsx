'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
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
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="utility"><div className="shell utility-inner"><span>{HOURS}</span><div className="utility-links"><Link href="/contact">Find a location</Link><a href={PHONE_TEL}><Phone size={13} /> {PHONE}</a></div></div></div>
      <header className="site-header"><div className="shell nav-inner"><Link className="brand" href="/" aria-label="Mission Primary Care home"><Image className="brand-logo" src={LOGO_SRC} alt={LOGO_ALT} width={240} height={97} priority /></Link><nav id="primary-navigation" className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{nav.map(([href, label]) => href === '/services'
        ? <div className="nav-item" key={href}><span className="nav-item-row"><Link href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{label}</Link><button type="button" className="nav-toggle" onClick={() => setServicesOpen((v) => !v)} aria-expanded={servicesOpen} aria-label={servicesOpen ? 'Hide services' : 'Show services'}><ChevronDown size={14} /></button></span><div className={servicesOpen ? 'nav-dropdown open' : 'nav-dropdown'}>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={() => setMobileOpen(false)}>{service.title}<ArrowRight size={14} /></Link>)}</div></div>
        : <Link href={href} key={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{label}</Link>)}<a className="button nav-cta" href={PHONE_TEL} onClick={() => setMobileOpen(false)}><Phone size={16} /> Call {PHONE}</a></nav><div className="nav-actions"><a className="button button-small" href={PHONE_TEL}><Phone size={15} /> {PHONE}</a><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="primary-navigation" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button></div></div></header>

      <main id="main-content" className={className}>{children}</main>

      <footer className="homepage-footer site-footer">
        <div className="footer-media" aria-hidden="true" />
        <div className="shell footer-grid">
          <div className="footer-brand-col">
            <Link className="footer-brand" href="/" aria-label="Mission Primary Care home"><Image src={LOGO_SRC} alt={LOGO_ALT} width={240} height={97} /></Link>
            <p>Care for your whole health, close to home.</p>
            <a className="button footer-call" href={PHONE_TEL}><Phone size={16} /> Call {PHONE}</a>
          </div>
          <div>
            <strong>Explore</strong>
            {nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/resources">Patient resources</Link>
            <strong className="footer-subhead">Opening hours</strong>
            <p>Monday to Friday, 9am–5pm.<br />Closed 12:30–1:30pm for lunch.<br />Closed weekends.</p>
          </div>
          <div>
            <strong>Care &amp; services</strong>
            {services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}
          </div>
          <div>
            <strong>Locations</strong>
            {LOCATIONS.map((location) => <Link href="/contact" key={location.city}>{location.city}</Link>)}
            <strong className="footer-subhead">Get in touch</strong>
            <a href={PHONE_TEL}>{PHONE}</a>
            <span>Fax {FAX}</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>Please do not send medical information by email.</span>
          </div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 {BUSINESS_NAME}</span><a href={PHONE_TEL}>Call {PHONE} <ArrowRight size={13} /></a></div>
      </footer>
    </>
  )
}
