import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'New patients | Mission Primary Care',
  description: 'What to expect at your first visit, what to bring, and how to book.',
}

export default function NewPatientsPage() { return <ClinicInnerPage kind="new-patients" /> }
