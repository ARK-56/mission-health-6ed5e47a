'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  HeartPulse,
  Menu,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react'

const services = [
  { icon: Stethoscope, title: 'Primary care', text: 'Thoughtful, continuous care for every age and every season of life.', link: 'Explore primary care' },
  { icon: HeartPulse, title: 'Preventive health', text: 'Annual wellness visits, screenings, and a clear plan for staying well.', link: 'See preventive care' },
  { icon: ShieldCheck, title: 'Chronic conditions', text: 'Partner with a care team that listens, adjusts, and keeps you moving forward.', link: 'Manage your health' },
  { icon: UserRound, title: 'Women’s health', text: 'Personalized support from adolescence through menopause and beyond.', link: 'View women’s health' },
]

const products = [
  { name: 'Mission Daily Wellness Kit', type: 'A simple start to feeling your best', price: 38, tone: 'mint', mark: 'MW', details: 'Vitamin organizer, symptom journal, and daily hydration guide.' },
  { name: 'At-Home Blood Pressure Cuff', type: 'Clinical confidence, at home', price: 64, tone: 'blue', mark: 'BP', details: 'Clinically validated upper-arm monitor with easy-read display.' },
  { name: 'Recovery Essentials', type: 'Care for the in-between days', price: 29, tone: 'sand', mark: 'RE', details: 'Reusable hot/cold pack, magnesium soak, and restorative stretch cards.' },
]

const providers = [
  { name: 'Dr. Maya Chen, MD', specialty: 'Family medicine', bio: 'Known for thoughtful preventive care and helping families build realistic, lasting habits.' },
  { name: 'Dr. Jordan Ellis, DO', specialty: 'Internal medicine', bio: 'Partners with adults managing complex health needs through clear, collaborative plans.' },
  { name: 'Nia Williams, FNP-C', specialty: 'Family nurse practitioner', bio: 'Creates warm, inclusive visits for patients at every stage of life.' },
]

const gettingStarted = [
  ['01', 'Get in touch', 'Call or book online and we will find an appointment that fits.'],
  ['02', 'Meet your provider', 'Have a full visit with someone who takes a proper history and explains every recommendation.'],
  ['03', 'Stay looked after', 'Leave with a clear plan and a practice that follows up on labs, referrals, and prescriptions.'],
] as const

const insurancePlans = ['Aetna', 'Cigna', 'UnitedHealthcare', 'Blue Cross Blue Shield', 'Humana', 'Kaiser Permanente']

export function ClinicSite() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [booked, setBooked] = useState(false)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [faq, setFaq] = useState(0)
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0)

  const addToCart = (name: string) => setCart((current) => ({ ...current, [name]: (current[name] || 0) + 1 }))
  const changeCart = (name: string, amount: number) => setCart((current) => {
    const next = { ...current, [name]: (current[name] || 0) + amount }
    if (next[name] <= 0) delete next[name]
    return next
  })
  const openBooking = () => { setBooked(false); setBookingOpen(true); setMobileOpen(false) }

  return (
    <main>
      <div className="utility"><div className="shell utility-inner"><span>Care that fits your life.</span><div className="utility-links"><a href="/resources">Patient portal</a><a href="/contact">Find a location</a><a href="tel:18005550140"><Phone size={13} /> 1-800-555-0140</a></div></div></div>
      <header className="site-header"><div className="shell nav-inner"><a className="brand" href="#top" aria-label="Mission Primary Care home"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mission%20Primary%20Care%20-%20transparent-TiPRel7sFcMlhjwmqsDl1JOOUbIL8O.png" alt="Mission Primary Care Family Practice" /></a><nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><a href="/services" onClick={() => setMobileOpen(false)}>Care & services</a><a href="/providers" onClick={() => setMobileOpen(false)}>Our providers</a><a href="/new-patients" onClick={() => setMobileOpen(false)}>New patients</a><a href="/wellness-shop" onClick={() => setMobileOpen(false)}>Wellness shop</a><a href="/about" onClick={() => setMobileOpen(false)}>About us</a></nav><div className="nav-actions"><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={19} /> <span className="cart-label">Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button><button className="button button-small" onClick={openBooking}><CalendarDays size={16} /> Book an appointment</button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></div></div></header>

      <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Primary care, made personal</p><h1>Better health starts with a <i>conversation.</i></h1><p className="hero-text">Your health is personal. Your care should be, too. Mission brings trusted clinicians, thoughtful technology, and more time for what matters to you.</p><div className="hero-actions"><button className="button" onClick={openBooking}><CalendarDays size={18} /> Book an appointment</button><a className="text-link" href="#care">Explore our care <ArrowRight size={17} /></a></div><div className="hero-note"><span className="avatar-stack"><span>J</span><span>M</span><span>A</span></span><span><strong>Trusted by 20,000+ patients</strong><small>Rated 4.9/5 by our community</small></span></div></div><div className="hero-art" aria-label="A clinician talking with a patient" role="img"><div className="art-window"></div><div className="art-card"><HeartPulse size={19} /><span><strong>Care, connected.</strong><small>Every visit moves you forward.</small></span></div><div className="art-caption"><span className="caption-line"></span><span>Here for your whole health</span></div></div></div></section>
      <section className="trust-strip"><div className="shell trust-inner"><span>In-network with most major plans</span><div className="plan-list"><span>blue<span>cross</span> blue<span>shield</span></span><span>UnitedHealthcare</span><span className="kaiser">KAISER <small>PERMANENTE</small></span><span>Aetna</span><span>Cigna</span></div></div></section>

      <section className="section care-section" id="care"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Care for the whole you</p><h2>Health is not one-size-fits-all.</h2></div><p>From the everyday to the unexpected, our care teams are here to help you feel heard, understood, and cared for.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text, link }) => <article className="service-card" key={title}><div className="icon-box"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><a href="/services">{link} <ArrowRight size={15} /></a></article>)}</div></div></section>

      <section className="pathway-section" id="new-patients"><div className="shell"><div className="section-heading"><div><p className="eyebrow">A better way to begin</p><h2>New here? We make it easy.</h2></div><p>Getting primary care should feel straightforward from the first hello to your next follow-up.</p></div><div className="pathway-grid">{gettingStarted.map(([number, title, text]) => <article className="pathway-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="story-section" id="about"><div className="shell story-grid"><div className="story-image"><div className="story-label"><span>01</span><span>Listen first.</span></div></div><div className="story-copy"><p className="eyebrow">The Mission difference</p><h2>More than a visit. A relationship.</h2><p>We believe great primary care is built on trust. That means unrushed conversations, care plans you understand, and a team that remembers your name.</p><div className="check-list"><span><Check size={16} /> Same-day and next-day visits</span><span><Check size={16} /> Virtual care when you need it</span><span><Check size={16} /> One connected care team</span></div><a className="text-link" href="#resources">Why patients choose Mission <ArrowRight size={17} /></a></div></div></section>

      <section className="providers-section" id="providers"><div className="shell"><div className="section-heading"><div><p className="eyebrow">People who listen</p><h2>Meet your care team.</h2></div><p>Experienced clinicians who bring expertise, empathy, and a long view of your health to every visit.</p></div><div className="provider-grid">{providers.map((provider) => <article className="provider-card" key={provider.name}><div className="provider-avatar"><UserRound size={34} /></div><p className="eyebrow">{provider.specialty}</p><h3>{provider.name}</h3><p>{provider.bio}</p><a className="text-link" href="#book">Book with this team <ArrowRight size={16} /></a></article>)}</div></div></section>

      <section className="insurance-section" id="insurance"><div className="shell insurance-inner"><div><p className="eyebrow">Coverage made clearer</p><h2>We work with your plan.</h2><p>Mission accepts most major insurance plans. Coverage varies by location and service, so our team will help you understand your options before your visit.</p></div><div className="insurance-list">{insurancePlans.map((plan) => <span key={plan}>{plan}</span>)}</div></div></section>

      <section className="resources-section" id="resources"><div className="shell resource-grid"><div><p className="eyebrow">Your health, in your hands</p><h2>Care that goes beyond the exam room.</h2><p>Manage your health on your terms with simple digital tools, helpful resources, and a team that is always close by.</p><button className="button button-outline">Visit the patient portal <ArrowRight size={17} /></button></div><div className="resource-list"><div><span className="resource-number">01</span><span><strong>Book on your schedule</strong><small>Choose a time and visit type that works for you.</small></span><ChevronRight /></div><div><span className="resource-number">02</span><span><strong>Message your care team</strong><small>Get answers without waiting for your next visit.</small></span><ChevronRight /></div><div><span className="resource-number">03</span><span><strong>Know your next step</strong><small>Clear plans, follow-ups, and resources for home.</small></span><ChevronRight /></div></div></div></section>

      <section className="shop-section" id="shop"><div className="shell"><div className="shop-heading"><div><p className="eyebrow">The Mission wellness shop</p><h2>Small tools. Meaningful habits.</h2></div><p>Thoughtfully selected essentials to help you care for yourself between visits.</p></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className={`product-art ${product.tone}`}><span>{product.mark}</span><Package size={34} strokeWidth={1.4} /></div><div className="product-info"><p>{product.type}</p><h3>{product.name}</h3><span className="product-details">{product.details}</span><div className="product-bottom"><strong>${product.price}</strong><button className="add-button" onClick={() => addToCart(product.name)}><Plus size={16} /> Add to cart</button></div></div></article>)}</div></div></section>

      <section className="testimonial"><div className="shell testimonial-inner"><div className="quote-mark">“</div><blockquote>“I finally feel like I have a doctor who knows me—not just my chart. Every appointment leaves me feeling more confident about my health.”</blockquote><div className="quote-author"><span className="quote-avatar">L</span><span><strong>Lauren M.</strong><small>Mission patient since 2021</small></span></div></div></section>

      <section className="faq-section"><div className="shell faq-grid"><div><p className="eyebrow">Good to know</p><h2>Questions, answered.</h2><p>Still curious? Our care team is here to help.</p><a className="text-link" href="tel:18005550140">Talk to our team <ArrowRight size={17} /></a></div><div className="faq-list">{['Do you accept my insurance?', 'What should I bring to my first visit?', 'Can I see a provider virtually?', 'How quickly can I get an appointment?'].map((question, index) => <div className={faq === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setFaq(faq === index ? -1 : index)}><span>{question}</span><ChevronDown size={19} /></button>{faq === index && <p>{index === 0 ? 'Mission is in-network with most major insurance plans. Call us or check your location for specific plan details.' : index === 1 ? 'Bring your photo ID, insurance card, medication list, and any questions you want to talk through.' : index === 2 ? 'Yes. Many follow-ups and everyday care visits are available virtually through our secure patient portal.' : 'Many locations offer same-day and next-day appointments. Book online to see the latest availability.'}</p>}</div>)}</div></div></section>

      <section className="cta-section" id="book"><div className="shell cta-inner"><div><p className="eyebrow">Your next chapter starts here</p><h2>Make time for your health.</h2></div><button className="button button-light" onClick={openBooking}>Book an appointment <ArrowRight size={17} /></button></div></section>
      <footer className="homepage-footer" id="locations"><div className="shell footer-grid"><div><a className="brand footer-brand" href="#top"></a><p>Care for your whole health, close to home.</p></div><div><strong>Explore</strong><a href="#care">Care & services</a><a href="#providers">Our providers</a><a href="#new-patients">New patients</a><a href="#insurance">Insurance</a><a href="#shop">Wellness shop</a><a href="#about">About Mission</a></div><div><strong>Get in touch</strong><a href="#locations">Find a location</a><a href="tel:18005550140">1-800-555-0140</a><a href="mailto:hello@missionprimarycare.com">hello@missionprimarycare.com</a></div><div><strong>Stay in the know</strong><p>Healthy insights, delivered monthly.</p><div className="email-input"><input aria-label="Email address" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></div></div></div><div className="shell footer-bottom"><span>© 2026 Mission Primary Care</span><span>Privacy · Accessibility · Terms</span></div></footer>

      {bookingOpen && <div className="overlay" onMouseDown={() => setBookingOpen(false)}><div className="dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setBookingOpen(false)} aria-label="Close booking dialog"><X /></button>{booked ? <div className="confirmation"><span className="success-icon"><Check size={28} /></span><p className="eyebrow">You’re all set</p><h2 id="booking-title">We’ll see you soon.</h2><p>Thanks for reaching out. A member of our team will contact you shortly to confirm your visit.</p><button className="button" onClick={() => setBookingOpen(false)}>Done</button></div> : <><p className="eyebrow">Start your visit</p><h2 id="booking-title">Book an appointment.</h2><p className="dialog-intro">Tell us a little about what you need. We’ll find the right time and care team for you.</p><form onSubmit={(event) => { event.preventDefault(); setBooked(true) }}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><div className="form-row"><label>Visit type<select defaultValue=""><option value="" disabled>Select one</option><option>In-person visit</option><option>Virtual visit</option><option>Annual wellness</option></select></label><label>Preferred date<input required type="date" /></label></div><button className="button" type="submit">Find appointment <ArrowRight size={17} /></button><small className="privacy-note"><ShieldCheck size={14} /> Your information is private and secure.</small></form></>}</div></div>}
      {cartOpen && <div className="overlay" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Mission wellness shop</p><h2>Your cart <span>({cartCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cartCount === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>Your cart is waiting.</p><small>Add a wellness essential to get started.</small></div> : <><div className="cart-items">{products.filter((product) => cart[product.name]).map((product) => <div className="cart-item" key={product.name}><div className={`mini-art ${product.tone}`}>{product.mark}</div><div><strong>{product.name}</strong><small>${product.price}</small><div className="quantity"><button onClick={() => changeCart(product.name, -1)} aria-label={`Remove one ${product.name}`}><Minus size={13} /></button><span>{cart[product.name]}</span><button onClick={() => addToCart(product.name)} aria-label={`Add one ${product.name}`}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>${products.reduce((sum, product) => sum + (cart[product.name] || 0) * product.price, 0)}</strong></div><button className="button cart-checkout" onClick={() => setCartOpen(false)}>Checkout <ArrowRight size={17} /></button><small className="shop-note">Demo checkout — no payment is processed.</small></>}</aside></div>}
    </main>
  )
}
