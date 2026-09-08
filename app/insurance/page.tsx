import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'Insurance & self-pay | Mission Primary Care',
  description: 'The plans we are in network with, and our self-pay rates for visits without insurance.',
}

export default function InsurancePage() { return <ClinicInnerPage kind="insurance" /> }
