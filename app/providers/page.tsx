import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'Our care team | Mission Primary Care',
  description: 'Meet the clinicians caring for adults across our three East Bay clinics.',
}

export default function ProvidersPage() { return <ClinicInnerPage kind="providers" /> }
