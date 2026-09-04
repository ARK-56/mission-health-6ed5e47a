export const LOGO_SRC = '/mission-logo.jpg'

export const LOGO_ALT = 'Mission Primary Care Family Practice'

export const BUSINESS_NAME = 'Mission Primary Care LLC'

export const PHONE = '510-796-7796'
export const PHONE_TEL = 'tel:15107967796'
export const FAX = '510-796-7797'
export const EMAIL = 'mpc3755@gmail.com'

export const HOURS = 'Mon–Fri 9am–5pm · closed 12:30–1:30pm'
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
