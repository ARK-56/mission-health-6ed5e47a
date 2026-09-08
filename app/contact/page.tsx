import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'Contact & locations | Mission Primary Care',
  description: 'Call 510-796-7796, or get directions to our Fremont, Hayward and San Leandro clinics.',
}

export default function ContactPage() { return <ClinicInnerPage kind="contact" /> }
