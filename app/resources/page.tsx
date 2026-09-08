import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'Patient resources | Mission Primary Care',
  description: 'Practical guidance between visits, and how to reach us when the office is closed.',
}

export default function ResourcesPage() { return <ClinicInnerPage kind="resources" /> }
