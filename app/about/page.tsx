import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'About us | Mission Primary Care',
  description: 'An adults-only primary care practice serving Fremont, Hayward and San Leandro.',
}

export default function AboutPage() { return <ClinicInnerPage kind="about" /> }
