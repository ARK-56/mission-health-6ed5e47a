'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  HeartPulse,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Truck,
  UserRound,
  UsersRound,
  Video,
} from 'lucide-react'

import { AFTER_HOURS, CONTACT_FORM_ENDPOINT, EMAIL, HOURS, LOCATIONS, PHONE, PHONE_TEL, ZIA_LINKEDIN, directionsUrl } from '@/lib/site'
import { GOOGLE_REVIEWS_URL, RATING_AVERAGE, RATING_TOTAL, reviews, type Review } from '@/lib/reviews'
import { services } from '@/lib/services'
import { LinkedInMark } from './brand-marks'

export { services }

const serviceIcons = {
  stethoscope: Stethoscope, heart: HeartPulse, shield: ShieldCheck, woman: UserRound,
  family: UsersRound, labs: FlaskConical, video: Video, dot: Truck,
} as const

/** Real clinicians. `languages` stands in for a bio until written ones are supplied. */
type Provider = { name: string; specialty: string; languages: string; role?: string; bookable?: boolean; photo?: string; placeholder?: boolean }

export const providers: Provider[] = [
  { name: 'Pacita Aducayen', photo: '/team/pacita-aducayen.webp', specialty: 'Internal medicine', role: '', languages: 'Speaks English and Tagalog.', bookable: false },
  { name: 'Gautam Pareek, MD', photo: '/team/gautam-pareek.webp', specialty: 'Internal medicine', languages: 'Speaks English and Hindi.' },
  { name: 'Nipa Sinh, MD', photo: '/team/nipa-sinh.webp', placeholder: true, specialty: 'Family medicine', languages: 'Speaks English, Hindi, and Gujarati.' },
  { name: 'Kashif Abdullah, MD', photo: '/team/kashif-abdullah.webp', specialty: 'General practice', languages: 'Speaks English, Hindi, and Urdu.' },
  { name: 'James Keaney, MD', photo: '/team/james-keaney.webp', specialty: 'Emergency medicine', languages: 'Speaks English.' },
  { name: 'Muhammad Khan, PA-C', photo: '/team/muhammad-khan.webp', specialty: 'Physician assistant', languages: 'Speaks English, Urdu, Hindi, Punjabi, and Farsi.' },
  { name: 'Neil Adler, PA-C', photo: '/team/neil-adler.webp', specialty: 'Physician assistant', languages: 'Speaks English and Spanish.' },
]

/** Each step carries the page it leads to, so the whole card can be the link. */
export const gettingStarted = [
  ['01', 'Call the office', `Reach us at ${PHONE}, Monday to Friday. Same-day appointments are available.`, '/contact', 'Contact & locations'],
  ['02', 'Meet your provider', 'Have a full visit with someone who takes a proper history and explains every recommendation.', '/providers', 'Meet the team'],
  ['03', 'Stay looked after', 'Leave with a clear plan and a practice that follows up on labs, referrals, and prescriptions.', '/resources', 'Patient resources'],
] as const

export const insurancePlans = [
  'Medicare Part B', 'Medi-Cal', 'Alameda Alliance', 'Altais (formerly Brown & Toland)', 'Nivano', 'Imperial Health',
  'Amada', 'UnitedHealthcare PPO', 'Hill Physicians', 'Blue Cross (select plans)', 'Alignment Health',
  'Scan', 'Aetna', 'Cigna',
]

export const selfPayRates = [
  { label: 'First visit', price: '$200', note: 'Your initial visit as a new self-pay patient.', action: 'Book a first visit', books: 'a first visit' },
  { label: 'Returning visit', price: '$100', note: 'Each visit once you are an established patient.', action: 'Book a follow-up', books: 'a returning visit' },
  { label: 'DOT physical', price: '$200', note: 'Department of Transportation medical examination.', action: 'Book a DOT physical', books: 'a DOT physical' },
] as const

/**
 * Payer logo files. Drop an image into public/insurance/ and add its entry here,
 * keyed by the exact name in insurancePlans. Any payer without an entry falls back
 * to its name as text, so the lists stay complete while logos arrive piecemeal.
 *
 * Most payer contracts restrict use of their marks -- confirm written permission
 * per payer before adding one.
 */
export const payerLogos: Record<string, string> = {
  'Medicare Part B': '/insurance/medicare.png',
  'Alameda Alliance': '/insurance/alameda-alliance.png',
  'Nivano': '/insurance/nivano.png',
  'Imperial Health': '/insurance/imperial-health.png',
  'Hill Physicians': '/insurance/hill-physicians.png',
  'Alignment Health': '/insurance/alignment-health.png',
  'Aetna': '/insurance/aetna.png',
  'UnitedHealthcare PPO': '/insurance/unitedhealthcare.svg',
  'Blue Cross (select plans)': '/insurance/blue-cross.png',
  'Cigna': '/insurance/cigna.svg',
  'Medi-Cal': '/insurance/medi-cal.svg',
  'Altais (formerly Brown & Toland)': '/insurance/altais.svg',
  'Amada': '/insurance/amada.svg',
  'Scan': '/insurance/scan.png',
}

/**
 * Payers whose logo does not spell out the plan name a patient is looking for:
 * Medi-Cal is administered by DHCS and its mark reads "DHCS", and the Altais mark
 * carries no trace of the Brown & Toland name members may still hold cards for.
 * These render the name beneath the logo.
 */
export const captionedPayers = ['Medi-Cal', 'Altais (formerly Brown & Toland)']

/** Intrinsic pixel sizes, so the browser can reserve each logo box before the
 *  stylesheet arrives. CSS still drives the rendered size. */
const payerLogoSizes: Record<string, [number, number]> = {
  '/insurance/medicare.png': [338, 96],
  '/insurance/alameda-alliance.png': [409, 96],
  '/insurance/nivano.png': [266, 96],
  '/insurance/imperial-health.png': [154, 78],
  '/insurance/hill-physicians.png': [187, 96],
  '/insurance/alignment-health.png': [94, 96],
  '/insurance/aetna.png': [376, 96],
  '/insurance/unitedhealthcare.svg': [606, 186],
  '/insurance/blue-cross.png': [184, 96],
  '/insurance/cigna.svg': [536, 286],
  '/insurance/medi-cal.svg': [249, 72],
  '/insurance/altais.svg': [181, 56],
  '/insurance/amada.svg': [720, 144],
  '/insurance/scan.png': [250, 72],
}

/** Renders a payer as its logo (with a caption where the mark omits the name), else as text. */
export function PayerMark({ plan }: { plan: string }) {
  const logo = payerLogos[plan]
  if (!logo) return <>{plan}</>
  const captioned = captionedPayers.includes(plan)
  const [w, h] = payerLogoSizes[logo] ?? []
  // when a caption is shown it is the accessible name, so the image must not repeat it
  return <>
    <img src={logo} alt={captioned ? '' : plan} width={w} height={h} />
    {captioned && <small>{plan}</small>}
  </>
}

export const faqs = [
  ['Do you accept my insurance?', 'We are contracted with Medicare Part B, Medi-Cal, and a range of commercial plans and medical groups. Call the office to confirm your specific plan before your visit.'],
  ['What should I bring to my first visit?', 'Bring your photo ID, insurance card, medication list, and any questions you want to talk through.'],
  ['Can I see a provider virtually?', 'Yes. Telehealth visits are available for many follow-ups and everyday care needs — call the office to arrange one.'],
  ['Do I need a referral?', 'No referral is needed to be seen. Call the office and our team will book you in.'],
  ['How quickly can I get an appointment?', 'Same-day appointments are available. Call the office and our team will find you the earliest time that works.'],
  ['What does a visit cost without insurance?', 'Self-pay visits are $200 for a first visit and $100 once you are an established patient. DOT physicals are $200.'],
] as const

/**
 * Links a section to the page it belongs to. Each of these sections is composed
 * onto several pages, so the link removes itself when you are already on its
 * destination rather than pointing at the page you are reading.
 */
function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()
  if (pathname === href) return null
  return <Link className="text-link section-link" href={href}>{children} <ArrowRight size={16} /></Link>
}

export function TrustStrip() {
  // two identical sets: the track scrolls exactly one set width, so the loop is seamless.
  // the second is hidden from assistive tech so the payers are not announced twice.
  const set = (duplicate: boolean) => (
    <div className="plan-list" key={duplicate ? 'b' : 'a'} aria-hidden={duplicate || undefined}>
      {insurancePlans.map((plan) => <span key={plan}><PayerMark plan={plan} /></span>)}
    </div>
  )
  return (
    <section className="trust-strip" aria-label="Insurance plans we accept">
      <div className="marquee"><div className="marquee-track">{set(false)}{set(true)}</div></div>
    </section>
  )
}

export function CareSection() {
  return <section className="section care-section" id="care"><div className="shell"><div className="section-heading" data-aos="fade-down"><div><p className="eyebrow">Care for the whole you</p><h2>Health is not one-size-fits-all.</h2></div><p>From the everyday to the unexpected, our care teams are here to help you feel heard, understood, and cared for.</p><SectionLink href="/services">See all services</SectionLink></div><div className="service-grid">{services.map(({ icon, slug, title, text, link }, i) => { const Icon = serviceIcons[icon]; return <article className="service-card" key={slug} data-aos="fade-up" data-aos-delay={500 + (i % 4) * 100}><div className="icon-box"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><Link href={`/services/${slug}`}>{link} <ArrowRight size={15} /></Link></article> })}</div></div></section>
}

export function PathwaySection() {
  const pathname = usePathname()
  return <section className="pathway-section" id="new-patients"><div className="shell"><div className="section-heading" data-aos="fade-up"><div><p className="eyebrow">A better way to begin</p><h2>New here? We make it easy.</h2></div><p>Getting primary care should feel straightforward from the first hello to your next follow-up.</p><SectionLink href="/new-patients">New patient guide</SectionLink></div><div className="pathway-grid">{gettingStarted.map(([number, title, text, href, label], i) => <article className={pathname === href ? 'pathway-card' : 'pathway-card is-linked'} key={number} data-aos="zoom-in" data-aos-delay={500 + i * 100}><span>{number}</span><h3>{title}</h3><p>{text}</p>{pathname !== href && <Link className="text-link" href={href}>{label} <ArrowRight size={15} /></Link>}</article>)}</div></div></section>
}

export function LocationsSection() {
  return <section className="pathway-section" id="locations"><div className="shell"><div className="section-heading" data-aos="fade-down"><div><p className="eyebrow">Three East Bay clinics</p><h2>Find the Mission nearest you.</h2></div><p>Primary care, on-site labs, and telehealth across San Leandro, Hayward, and Fremont. One number books any of the three: <a className="text-link" href={PHONE_TEL}>{PHONE}</a></p><SectionLink href="/contact">Contact & locations</SectionLink></div><figure className="locations-map" data-aos="fade-up" data-aos-delay="600"><Image src="/clinic-locations-map.jpg" alt="Map of the three Mission Primary Care clinics across San Leandro, Hayward and Fremont" width={1200} height={900} sizes="(max-width: 680px) 100vw, 1160px" />{LOCATIONS.map((location) => <a className="map-pin" key={location.city} style={{ left: `${location.x}%`, top: `${location.y}%` }} href={directionsUrl(location.street, location.region)} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to the ${location.city} clinic (opens in a new tab)`}><span className="map-pin-card"><strong>{location.city}</strong><span>{location.street}<br />{location.region}</span><span className="map-pin-go"><Navigation size={13} /> Get directions</span></span></a>)}</figure><div className="pathway-grid">{LOCATIONS.map((location, index) => <article className="pathway-card" key={location.city} data-aos="zoom-in-up" data-aos-delay={500 + index * 100}><span>{String(index + 1).padStart(2, '0')}</span><h3>{location.city}</h3><p className="location-address"><MapPin size={16} /><span>{location.street}<br />{location.region}</span></p><a className="text-link" href={PHONE_TEL}><Phone size={15} /> Call to book</a><a className="text-link" href={directionsUrl(location.street, location.region)} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to the ${location.city} clinic (opens in a new tab)`}><Navigation size={15} /> Get directions</a></article>)}</div></div></section>
}

export function SelfPaySection() {
  return <section className="pathway-section" id="self-pay"><div className="shell"><div className="section-heading" data-aos="fade-up"><div><p className="eyebrow">Self-pay rates</p><h2>Clear prices, up front.</h2></div><p>These are our rates for patients not billing insurance. Call the office if you have any questions before you book.</p><SectionLink href="/insurance">Insurance & self-pay</SectionLink></div><div className="pathway-grid">{selfPayRates.map((rate, i) => <article className="pathway-card is-linked" key={rate.label} data-aos="zoom-in" data-aos-delay={500 + i * 100}><span>{rate.label}</span><h3>{rate.price}</h3><p>{rate.note}</p><a className="text-link" href={PHONE_TEL} aria-label={`Call ${PHONE} to book ${rate.books}`}><Phone size={15} /> {rate.action}</a></article>)}</div></div></section>
}

export function StorySection() {
  return <section className="story-section" id="about"><div className="shell story-grid"><div className="story-image" data-aos="zoom-in"><div className="story-label"><span>01</span><span>Listen first.</span></div></div><div className="story-copy" data-aos="fade-up" data-aos-delay="600"><p className="eyebrow">The Mission difference</p><h2>More than a visit. A relationship.</h2><p>We believe great primary care is built on trust. That means unrushed conversations, care plans you understand, and a team that remembers your name.</p><div className="check-list"><span><Check size={16} /> Same-day appointments available</span><span><Check size={16} /> No referral needed to be seen</span><span><Check size={16} /> Telehealth visits available</span><span><Check size={16} /> On-site labs and vaccinations</span></div><Link className="text-link" href="/about">Why patients choose Mission <ArrowRight size={17} /></Link></div></div></section>
}

/** Decorative stethoscope sitting behind each provider card. */
function StethoscopeMark() {
  return (
    <svg className="provider-watermark" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C11.2597 6 10.6134 6.4022 10.2676 7H10C8.34315 7 7 8.34315 7 10V19H9V10C9 9.44772 9.44772 9 10 9H10.2676C10.6134 9.5978 11.2597 10 12 10Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.1602 19L9 19H7C6.44772 19 5.99531 19.4487 6.04543 19.9987C6.27792 22.5499 7.39568 24.952 9.22186 26.7782C10.561 28.1173 12.2098 29.0755 14 29.583V32C14 33.3064 14.835 34.4177 16.0004 34.8294C16.043 38.7969 19.2725 42 23.25 42C27.2541 42 30.5 38.7541 30.5 34.75V30.75C30.5 28.6789 32.1789 27 34.25 27C36.3211 27 38 28.6789 38 30.75V33.1707C36.8348 33.5825 36 34.6938 36 36C36 37.6569 37.3431 39 39 39C40.6569 39 42 37.6569 42 36C42 34.6938 41.1652 33.5825 40 33.1707V30.75C40 27.5744 37.4256 25 34.25 25C31.0744 25 28.5 27.5744 28.5 30.75V34.75C28.5 37.6495 26.1495 40 23.25 40C20.3769 40 18.0429 37.6921 18.0006 34.8291C19.1655 34.4171 20 33.306 20 32V29.583C21.7902 29.0755 23.4391 28.1173 24.7782 26.7782C26.6044 24.952 27.7221 22.5499 27.9546 19.9987C28.0048 19.4487 27.5523 19 27 19L27 10C27 8.34315 25.6569 7 24 7H23.7324C23.3866 6.4022 22.7403 6 22 6C20.8954 6 20 6.89543 20 8C20 9.10457 20.8954 10 22 10C22.7403 10 23.3866 9.5978 23.7324 9H24C24.5523 9 25 9.44772 25 10V19H23.8399C23.2876 19 22.8486 19.4509 22.7545 19.9952C22.5505 21.1746 21.9872 22.2717 21.1294 23.1294C20.0343 24.2246 18.5489 24.8399 17 24.8399C15.4512 24.8399 13.9658 24.2246 12.8706 23.1294C12.0129 22.2717 11.4495 21.1746 11.2455 19.9952C11.1514 19.4509 10.7124 19 10.1602 19ZM24.5805 21H25.775C25.4013 22.6396 24.5721 24.1559 23.364 25.364C21.6762 27.0518 19.387 28 17 28C14.6131 28 12.3239 27.0518 10.6361 25.364C9.42797 24.1559 8.59877 22.6396 8.22502 21L9.41953 21C9.77024 22.3291 10.4676 23.5548 11.4564 24.5436C12.9267 26.0139 14.9208 26.8399 17 26.8399C19.0793 26.8399 21.0734 26.0139 22.5437 24.5436C23.5325 23.5548 24.2298 22.3291 24.5805 21ZM39 35C39.5523 35 40 35.4477 40 36C40 36.5523 39.5523 37 39 37C38.4477 37 38 36.5523 38 36C38 35.4477 38.4477 35 39 35ZM18 30V32C18 32.5523 17.5523 33 17 33C16.4477 33 16 32.5523 16 32V30H18Z" fill="currentColor" />
    </svg>
  )
}

function ProviderCard({ provider, index }: { provider: Provider; index: number }) {
  return <article className="provider-card" data-aos="zoom-in-up" data-aos-delay={500 + (index % 3) * 100}>
    <div className="provider-photo-wrap">
      {provider.photo
        ? <img className="provider-photo" src={provider.photo} alt={provider.placeholder ? '' : `${provider.name}, ${provider.specialty.toLowerCase()}`} width={640} height={640} loading="lazy" decoding="async" />
        : <div className="provider-photo provider-photo-empty" aria-hidden="true"><UserRound size={44} /></div>}
      <span className="provider-badge" aria-hidden="true"><Stethoscope size={20} /></span>
    </div>
    <div className="provider-body">
      <div className="provider-text">
        <p className="eyebrow">{provider.specialty}</p>
        <h3>{provider.name}</h3>
        {provider.role && <p className="provider-role">{provider.role}</p>}
        <p className="provider-langs">{provider.languages}</p>
      </div>
      {provider.bookable !== false && <a className="provider-book" href={PHONE_TEL} aria-label={`Call to book with ${provider.name}`} title={`Call to book with ${provider.name}`}><Phone size={17} /></a>}
    </div>
  </article>
}

export function ProvidersSection({ showLeadership = true, showAll = false }: { showLeadership?: boolean; showAll?: boolean } = {}) {
  const track = useRef<HTMLDivElement>(null)
  const settling = useRef(false)
  const settleTimer = useRef(0)
  // four to a slide, but stacked there is only room for one, so the phone gets a
  // card at a time. Starts at four so the server and the first client render agree.
  const [perSlide, setPerSlide] = useState(4)
  const [slide, setSlide] = useState(0)

  // A stand-in portrait still counts as waiting for one, so Nipa Sinh stays at
  // the back until a real photograph arrives. Not taking bookings is no reason to
  // demote a provider, so Pacita Aducayen keeps her place at the front.
  const complete = (p: Provider) => Boolean(p.photo) && !p.placeholder
  const ordered = [...providers.filter(complete), ...providers.filter((p) => !complete(p))]
  const slides: Provider[][] = []
  for (let i = 0; i < ordered.length; i += perSlide) slides.push(ordered.slice(i, i + perSlide))

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 680px)')
    const apply = () => {
      setPerSlide(narrow.matches ? 1 : 4)
      setSlide(0)
      if (track.current) track.current.scrollLeft = 0
    }
    apply()
    narrow.addEventListener('change', apply)
    return () => narrow.removeEventListener('change', apply)
  }, [])

  // the index follows the scroller, so dragging or swiping keeps the dots honest
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      // a smooth scroll passes through positions that round back to the slide it
      // is leaving, which flipped the arrow there and back on the way
      if (settling.current) return
      setSlide(Math.round(el.scrollLeft / el.clientWidth))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(slides.length - 1, i))
    // scrollTo ignores the motion preference, so it is asked for explicitly
    const gentle = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    settling.current = true
    el.scrollTo({ left: next * el.clientWidth, behavior: gentle ? 'auto' : 'smooth' })
    setSlide(next)
    const land = () => {
      settling.current = false
      window.clearTimeout(settleTimer.current)
    }
    el.addEventListener('scrollend', land, { once: true })
    // scrollend is not everywhere yet, so a timer releases the mute regardless
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(land, gentle ? 60 : 700)
  }

  return <section className="providers-section" id="providers"><div className="shell">
    <div className="team-head" data-aos="fade-down">
      <p className="team-kicker">Mission Primary Care</p>
      <h2>Meet our providers</h2>
      <p className="team-sub">Compassionate care. A healthier tomorrow.</p>
      <SectionLink href="/providers">Meet the full team</SectionLink>
    </div>
    <div className={showLeadership ? 'providers-layout' : 'providers-layout is-solo'}>
      {showLeadership && (
        <figure className="team-panel" data-aos="fade-up">  
          <h3 className="team-panel-title">The leadership behind Mission Primary Care</h3>  
          <p className="team-panel-kicker">Leadership that cares</p>  
          <p className="team-panel-lead">Zia Hamidi provides strategic leadership and operational oversight for the practice through its Management Services Organization (MSO).</p>  
          <img src="/team/zia.webp" alt="" width={1000} height={1000} loading="lazy" decoding="async" />  
          <blockquote><p>My ambition is to build Mission Primary Care into a trusted and respected healthcare organization recognized for exceptional patient care, accessibility, and clinical excellence. Through a patient-centered approach, I aim to improve health outcomes, strengthen our communities, and create a lasting positive impact on the lives of the people we serve.</p></blockquote>  
          <figcaption><span><strong>Zia Hamidi</strong><span>Executive Director &middot; Management &amp; Operations</span></span>{ZIA_LINKEDIN  
            ? <a className="team-linkedin" href={ZIA_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Zia Hamidi on LinkedIn (opens in a new tab)"><LinkedInMark /></a>  
            : <span className="team-linkedin" aria-hidden="true"><LinkedInMark /></span>}</figcaption>  
        </figure>
      )}
      <div className="provider-carousel">
        {showAll
          ? <div className="provider-grid">
              {ordered.map((provider, i) => <ProviderCard key={provider.name} provider={provider} index={i} />)}
            </div>
          : <>
            <div className="provider-track" ref={track} tabIndex={0} role="group" aria-label="Care team, scrollable">
              {slides.map((group, s) => (
                <div className="provider-grid" key={s} aria-hidden={s !== slide || undefined}>
                  {group.map((provider, i) => <ProviderCard key={provider.name} provider={provider} index={i} />)}
                </div>
              ))}
            </div>
            {slides.length > 1 && (
              <button type="button" className="provider-step" onClick={() => go(slide === slides.length - 1 ? 0 : slide + 1)}
                aria-label={slide === slides.length - 1 ? (slides.length > 2 ? 'Back to the first providers' : 'Previous providers') : 'Next providers'}>
                {slide === slides.length - 1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            )}
          </>}
      </div>
    </div>
  </div></section>
}

/** Five stars, filled to the review's rating. Decorative: the number is in the text beside it. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} className={i < rating ? 'is-filled' : undefined} />)}
    </span>
  )
}

/**
 * Initials stand in for the avatar. Google's profile photographs are hotlinked from
 * its own CDN and disappear when a reviewer changes theirs, so the wall draws its
 * own mark and never breaks.
 */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <Stars rating={review.rating} />
      {/* clamped in CSS rather than cut here, so the whole review stays in the
          document for screen readers and for anyone selecting the text */}
      <p className="review-body">{review.body}</p>
      {/* a div, not a footer: the stylesheet paints every <footer> with the page
          footer's dark background and padding, which landed behind the name */}
      <div className="review-meta">
        <span className="review-avatar" aria-hidden="true">{initials(review.name)}</span>
        <span>
          <strong>{review.name}</strong>
          <small>{review.meta.startsWith('Local Guide') ? `Local Guide · ${review.date}` : review.date}</small>
        </span>
      </div>
    </article>
  )
}

/**
 * `reviews` arrives sorted longest first, which would send the three fullest ones
 * past in a row and then nothing but one-liners. Alternating longest, shortest,
 * next longest, next shortest mixes the lengths along the run instead.
 */
function balance<T>(items: T[]) {
  const rest = [...items]
  const out: T[] = []
  while (rest.length) {
    out.push(rest.shift() as T)
    if (rest.length) out.push(rest.pop() as T)
  }
  return out
}

/**
 * The practice's Google reviews, in the patients' own words, running past in one
 * continuous band the full width of the page.
 *
 * Two identical runs sit side by side: the track scrolls exactly one run's width
 * and starts over, so the loop never shows a seam. The second run is hidden from
 * assistive tech, which would otherwise read every review twice.
 *
 * `count` trims the run for pages that only want a taste of it.
 */
export function ReviewsSection({ count }: { count?: number } = {}) {
  const shown = balance(count ? reviews.slice(0, count) : reviews)
  // a fixed duration would crawl on the homepage's shorter run and race on the
  // full one, so the clock is set per card to keep the speed the same everywhere
  const seconds = shown.length * 6

  const run = (duplicate: boolean) => (
    <div className="review-run" key={duplicate ? 'b' : 'a'} aria-hidden={duplicate || undefined}>
      {shown.map((review) => <ReviewCard key={review.name + review.date} review={review} />)}
    </div>
  )

  return <section className="reviews-section" id="reviews">
    <div className="shell">
      <div className="team-head reviews-head" data-aos="fade-down">
        <p className="team-kicker">What our patients say</p>
        <h2>Rated {RATING_AVERAGE} by our patients</h2>
        <p className="review-score">
          <Stars rating={Math.round(Number(RATING_AVERAGE))} />
          <span><strong>{RATING_AVERAGE}</strong> out of 5 · {RATING_TOTAL} Google reviews</span>
        </p>
        <a className="text-link" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" aria-label="Read our reviews on Google (opens in a new tab)">
          Read them on Google <ArrowRight size={16} />
        </a>
      </div>
    </div>
    <div className="review-marquee" data-aos="fade-up" data-aos-delay="400" role="group" aria-label="Patient reviews">
      <div className="review-marquee-track" style={{ animationDuration: `${seconds}s` }}>{run(false)}{run(true)}</div>
    </div>
  </section>
}

const CONTACT_REASONS = [
  'Book an appointment',
  'Question about becoming a patient',
  'Insurance or billing',
  'Medical records or forms',
  'Something else',
]

/**
 * Contact form. Posts JSON to CONTACT_FORM_ENDPOINT once one is configured; until
 * then it hands the message to the visitor's mail app, so the form is useful from
 * the day it ships rather than sitting disabled.
 *
 * It deliberately asks for a reason rather than symptoms. The practice's standing
 * line, on this page and in the footer, is that medical detail does not travel by
 * email, and an unencrypted form is no different.
 */
export function ContactFormSection() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'handoff' | 'error'>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    // a field nobody can see; only a bot fills it in
    if (data.get('company')) return
    data.delete('company')
    const fields = Object.fromEntries(data.entries()) as Record<string, string>

    if (!CONTACT_FORM_ENDPOINT) {
      const body = Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n')
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Website enquiry — ${fields.reason}`)}&body=${encodeURIComponent(body)}`
      setState('handoff')
      return
    }

    setState('sending')
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return <section className="section contact-form-section" id="contact-form"><div className="shell contact-form-grid">
    <div className="contact-form-intro" data-aos="fade-up">
      <p className="eyebrow">Send us a message</p>
      <h2>Tell us how we can help.</h2>
      <p>Fill this in and our team will come back to you on the next working day. If you would rather speak to someone, we are on the phone Monday to Friday.</p>
      <a className="text-link" href={PHONE_TEL}><Phone size={16} /> Call {PHONE}</a>
      <p className="contact-form-urgent"><ShieldCheck size={17} /><span>For urgent or emergency care, go to the nearest emergency room or call 911. Please do not use this form for anything urgent.</span></p>
    </div>

    <form className="contact-form" onSubmit={onSubmit} data-aos="fade-up" data-aos-delay="600">
      <div className="field-row">
        <p className="field">
          <label htmlFor="cf-name">Full name<span aria-hidden="true">*</span></label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required />
        </p>
        <p className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </p>
      </div>
      <div className="field-row">
        <p className="field">
          <label htmlFor="cf-email">Email<span aria-hidden="true">*</span></label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required />
        </p>
        <p className="field">
          <label htmlFor="cf-clinic">Preferred clinic</label>
          <select id="cf-clinic" name="clinic" defaultValue="No preference">
            {LOCATIONS.map((location) => <option key={location.city}>{location.city}</option>)}
            <option>No preference</option>
          </select>
        </p>
      </div>
      <p className="field">
        <label htmlFor="cf-reason">What is this about?</label>
        <select id="cf-reason" name="reason" defaultValue={CONTACT_REASONS[0]}>
          {CONTACT_REASONS.map((reason) => <option key={reason}>{reason}</option>)}
        </select>
      </p>
      <p className="field">
        <label htmlFor="cf-message">Message<span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" rows={5} required aria-describedby="cf-privacy"
          placeholder="Let us know how we can help." />
      </p>
      <p className="field-note" id="cf-privacy">This form is not secure. Please keep medical details for your visit or a phone call.</p>

      <p className="field-hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </p>

      <button className="button" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={15} />
      </button>

      <p className="contact-status" role="status">
        {state === 'sent' && 'Thank you — your message is with our team. We will be in touch on the next working day.'}
        {state === 'handoff' && `Your mail app should be opening with this message ready to send to ${EMAIL}. If nothing happened, please call us instead.`}
        {state === 'error' && `Sorry, that did not go through. Please call us on ${PHONE} and we will help straight away.`}
      </p>
      {!CONTACT_FORM_ENDPOINT && <small className="contact-form-fallback">Sends through your own email app until the form service is connected.</small>}
    </form>
  </div></section>
}

/** Practice leadership. The portrait, biography and quote are the client's own copy. */
export function LeadershipSection() {
  return <section className="section leadership-section" id="leadership"><div className="shell leadership-grid"><div className="leadership-portrait" data-aos="zoom-in"><img src="/team/zia.webp" alt="Zia Hamidi, Executive Director for Management and Operations" width={1000} height={1000} loading="lazy" decoding="async" /></div><div data-aos="fade-up" data-aos-delay="600"><p className="eyebrow">Practice leadership</p><h2>Zia Hamidi</h2><p className="leadership-role">Executive Director · Management &amp; Operations</p><p>Zia Hamidi provides strategic leadership and operational oversight for the practice through its Management Services Organization (MSO). Working closely with physicians, providers, and staff, he focuses on strengthening operations, improving efficiency, supporting practice growth, and enhancing the overall patient experience.</p><p>His goal is to build a professional, collaborative environment where providers and staff have the support they need to deliver exceptional care to every patient.</p><ul className="leadership-tags">{['Leadership', 'Operations', 'Practice development', 'Patient experience'].map((tag) => <li key={tag}>{tag}</li>)}</ul><blockquote className="leadership-quote"><p>My ambition is to build Mission Primary Care into a trusted and respected healthcare organization recognized for exceptional patient care, accessibility, and clinical excellence. Through a patient-centered approach, I aim to improve health outcomes, strengthen our communities, and create a lasting positive impact on the lives of the people we serve.</p></blockquote></div></div></section>
}

export function InsuranceSection() {
  return <section className="insurance-section" id="insurance"><div className="shell insurance-inner"><div data-aos="fade-up"><p className="eyebrow">Coverage made clearer</p><h2>We work with your plan.</h2><p>Mission is contracted with Medicare Part B, Medi-Cal, and a range of commercial plans and medical groups. Coverage varies by plan and service, so call our team to confirm yours before your visit.</p><SectionLink href="/insurance">See accepted plans</SectionLink></div><div className="insurance-list" data-aos="fade" data-aos-delay="600">{insurancePlans.map((plan) => <span key={plan}><PayerMark plan={plan} /></span>)}</div></div></section>
}

export function ResourcesSection() {
  return <section className="resources-section" id="resources"><div className="shell resource-grid"><div data-aos="fade-up"><p className="eyebrow">Your health, in your hands</p><h2>Care that goes beyond the exam room.</h2><p>Our team is a phone call away for the things you need between visits.</p><SectionLink href="/resources">All patient resources</SectionLink><a className="button button-outline" href={PHONE_TEL}>Call {PHONE} <ArrowRight size={17} /></a></div><div className="resource-list" data-aos="zoom-in-up" data-aos-delay="600"><a href={PHONE_TEL} aria-label={`Call ${PHONE} to book a visit`}><span className="resource-number">01</span><span><strong>Book a visit</strong><small>Call the office during opening hours and we will find you a time.</small></span><ChevronRight /></a><a href={PHONE_TEL} aria-label={`Call ${PHONE} to request a prescription refill`}><span className="resource-number">02</span><span><strong>Request a refill</strong><small>Call the office, or ask your pharmacy to send the request to us.</small></span><ChevronRight /></a><a href={PHONE_TEL} aria-label={`Call ${PHONE} to request your medical records`}><span className="resource-number">03</span><span><strong>Request your records</strong><small>Call the office and we will send you a medical records release form.</small></span><ChevronRight /></a></div></div></section>
}

export function HoursSection() {
  return <section className="highlight-band" id="hours"><div className="shell highlight-inner"><div data-aos="fade-down"><p className="eyebrow">Opening hours</p><strong>Mon–Fri</strong><p>9am–5pm at all three clinics, closed 12:30pm–1:30pm for lunch. Closed weekends.</p></div><div className="highlight-details" data-aos="fade" data-aos-delay="600"><span><Check size={15} />{AFTER_HOURS}</span></div></div></section>
}

export function FaqSection() {
  const [open, setOpen] = useState(0)
  return <section className="faq-section"><div className="shell faq-grid"><div data-aos="fade-up"><p className="eyebrow">Good to know</p><h2>Questions, answered.</h2><p>Still curious? Our care team is here to help, {HOURS}.</p><SectionLink href="/new-patients">New patient guide</SectionLink><a className="text-link" href={PHONE_TEL}>Talk to our team <ArrowRight size={17} /></a></div><div className="faq-list" data-aos="zoom-in" data-aos-delay="600">{faqs.map(([question, answer], index) => <div className={open === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><ChevronDown size={19} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div></section>
}

export function CtaSection() {
  return <section className="cta-section" id="book"><div className="shell cta-inner"><div data-aos="fade-up"><p className="eyebrow">Now welcoming new patients</p><h2>Make time for your health.</h2></div><a className="button button-light" href={PHONE_TEL} data-aos="zoom-in" data-aos-delay="600">Call {PHONE} <ArrowRight size={17} /></a></div></section>
}
