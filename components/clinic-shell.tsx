'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { ArrowRight, CalendarDays, Check, Menu, Minus, Phone, Plus, ShieldCheck, ShoppingBag, X } from 'lucide-react'

import { LOGO_ALT, LOGO_SRC, PHONE, nav } from '@/lib/site'
import { useDialog } from '@/lib/use-dialog'
import { products } from './sections'

export type ShellApi = {
  openBooking: () => void
  addToCart: (name: string) => void
}

/**
 * The chrome every page shares: utility bar, header, footer, booking dialog and
 * cart drawer, plus the state those need. Pages supply their own body through
 * `children`, which receives the handlers the shared sections call into.
 */
export function ClinicShell({ className, children }: { className?: string; children: (api: ShellApi) => ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [booked, setBooked] = useState(false)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0)

  const addToCart = (name: string) => setCart((current) => ({ ...current, [name]: (current[name] || 0) + 1 }))
  const changeCart = (name: string, amount: number) => setCart((current) => {
    const next = { ...current, [name]: (current[name] || 0) + amount }
    if (next[name] <= 0) delete next[name]
    return next
  })
  const openBooking = () => { setBooked(false); setBookingOpen(true); setMobileOpen(false) }
  const bookingRef = useDialog<HTMLDivElement>(bookingOpen, () => setBookingOpen(false))
  const cartRef = useDialog<HTMLElement>(cartOpen, () => setCartOpen(false))

  return (
    <main className={className}>
      <div className="utility"><div className="shell utility-inner"><span>Care that fits your life.</span><div className="utility-links"><Link href="/resources">Patient portal</Link><Link href="/contact">Find a location</Link><a href="tel:18005550140"><Phone size={13} /> {PHONE}</a></div></div></div>
      <header className="site-header"><div className="shell nav-inner"><Link className="brand" href="/" aria-label="Mission Primary Care home"><Image className="brand-logo" src={LOGO_SRC} alt={LOGO_ALT} width={70} height={70} priority /></Link><nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{nav.map(([href, label]) => <Link href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={19} /> <span className="cart-label">Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button><button className="button button-small" onClick={openBooking}><CalendarDays size={16} /> Book an appointment</button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></div></div></header>

      {children({ openBooking, addToCart })}

      <footer className="homepage-footer site-footer"><div className="shell footer-grid"><div><Link className="footer-brand" href="/" aria-label="Mission Primary Care home"><Image src={LOGO_SRC} alt={LOGO_ALT} width={104} height={104} /></Link><p>Care for your whole health, close to home.</p></div><div><strong>Explore</strong>{nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/insurance">Insurance</Link></div><div><strong>Get in touch</strong><Link href="/contact">Find a location</Link><a href="tel:18005550140">{PHONE}</a><a href="mailto:hello@missionprimarycare.com">hello@missionprimarycare.com</a></div><div><strong>Stay in the know</strong><p>Healthy insights, delivered monthly.</p><div className="email-input"><input aria-label="Email address" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></div></div></div><div className="shell footer-bottom"><span>© 2026 Mission Primary Care</span><span>Privacy · Accessibility · Terms</span></div></footer>

      {bookingOpen && <div className="overlay" onMouseDown={() => setBookingOpen(false)}><div className="dialog" ref={bookingRef} role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setBookingOpen(false)} aria-label="Close booking dialog"><X /></button>{booked ? <div className="confirmation"><span className="success-icon"><Check size={28} /></span><p className="eyebrow">You’re all set</p><h2 id="booking-title">We’ll see you soon.</h2><p>Thanks for reaching out. A member of our team will contact you shortly to confirm your visit.</p><button className="button" onClick={() => setBookingOpen(false)}>Done</button></div> : <><p className="eyebrow">Start your visit</p><h2 id="booking-title">Book an appointment.</h2><p className="dialog-intro">Tell us a little about what you need. We’ll find the right time and care team for you.</p><form onSubmit={(event) => { event.preventDefault(); setBooked(true) }}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><div className="form-row"><label>Visit type<select defaultValue=""><option value="" disabled>Select one</option><option>In-person visit</option><option>Virtual visit</option><option>Annual wellness</option></select></label><label>Preferred date<input required type="date" /></label></div><button className="button" type="submit">Find appointment <ArrowRight size={17} /></button><small className="privacy-note"><ShieldCheck size={14} /> Your information is private and secure.</small></form></>}</div></div>}
      {cartOpen && <div className="overlay" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" ref={cartRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Mission wellness shop</p><h2 id="cart-title">Your cart <span>({cartCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cartCount === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>Your cart is waiting.</p><small>Add a wellness essential to get started.</small></div> : <><div className="cart-items">{products.filter((product) => cart[product.name]).map((product) => <div className="cart-item" key={product.name}><div className={`mini-art ${product.tone}`}>{product.mark}</div><div><strong>{product.name}</strong><small>${product.price}</small><div className="quantity"><button onClick={() => changeCart(product.name, -1)} aria-label={`Remove one ${product.name}`}><Minus size={13} /></button><span>{cart[product.name]}</span><button onClick={() => addToCart(product.name)} aria-label={`Add one ${product.name}`}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>${products.reduce((sum, product) => sum + (cart[product.name] || 0) * product.price, 0)}</strong></div><button className="button cart-checkout" onClick={() => setCartOpen(false)}>Checkout <ArrowRight size={17} /></button><small className="shop-note">Demo checkout — no payment is processed.</small></>}</aside></div>}
    </main>
  )
}
