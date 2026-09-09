export const LOGO_SRC = '/mission-logo.png'

export const LOGO_ALT = 'Mission Primary Care Family Practice'

export const BUSINESS_NAME = 'Mission Primary Care LLC'

export const PHONE = '510-796-7796'
export const PHONE_TEL = 'tel:15107967796'
export const FAX = '510-796-7797'
export const EMAIL = 'mpc3755@gmail.com'

export const HOURS = 'Mon–Fri 9am–5pm · closed 12:30pm–1:30pm'
/** One row per day, so the footer can lay hours out as a table. Same at all three clinics. */
export const WEEK_HOURS: [string, string][] = [
  ['Monday', '9am–5pm'],
  ['Tuesday', '9am–5pm'],
  ['Wednesday', '9am–5pm'],
  ['Thursday', '9am–5pm'],
  ['Friday', '9am–5pm'],
  ['Saturday', 'Closed'],
  ['Sunday', 'Closed'],
]

export const AFTER_HOURS =
  'Closed weekends. After hours, leave a voicemail for non-urgent matters. For urgent or emergency care, go to the nearest emergency room or call 911.'

export const nav = [
  ['/services', 'Care & services'],
  ['/providers', 'Our providers'],
  ['/new-patients', 'New patients'],
  ['/insurance', 'Insurance'],
  ['/about', 'About us'],
] as const

/**
 * x/y are the marker positions on clinic-locations-map.jpg as percentages of the
 * image, derived from the same web-mercator projection used to build it. They are
 * percentages so the hotspots track the image as it scales.
 */
export const LOCATIONS = [
  { city: 'Fremont', street: '3755 Beacon Ave', region: 'Fremont, CA 94538', x: 66.75, y: 80.93 },
  { city: 'Hayward', street: '1090 La Playa Drive', region: 'Hayward, CA 94545', x: 36.96, y: 40.36 },
  { city: 'San Leandro', street: '15921 E 14th St', region: 'San Leandro, CA 94578', x: 33.25, y: 19.11 },
] as const

export const directionsUrl = (street: string, region: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(street + ', ' + region)}`

/**
 * Whether the practice is open at a given moment, judged on its own Pacific
 * clock rather than the visitor's. Weekdays run 9am–5pm with the doors closed
 * 12:30pm–1:30pm for lunch, and the weekend is closed.
 */
export type OpenState = { open: boolean; label: string }

export function openState(now: Date): OpenState {
  const part = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  const day = part.weekday
  const minute = Number(part.hour) * 60 + Number(part.minute)

  if (day === 'Saturday' || day === 'Sunday') return { open: false, label: 'Closed · opens Monday 9am' }
  if (minute < 9 * 60) return { open: false, label: 'Closed · opens 9am' }
  if (minute < 12 * 60 + 30) return { open: true, label: 'Open now' }
  if (minute < 13 * 60 + 30) return { open: false, label: 'Closed for lunch · opens 1:30pm' }
  if (minute < 17 * 60) return { open: true, label: 'Open now' }
  return { open: false, label: day === 'Friday' ? 'Closed · opens Monday 9am' : 'Closed · opens 9am tomorrow' }
}
