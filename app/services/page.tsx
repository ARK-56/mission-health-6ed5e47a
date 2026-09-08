import type { Metadata } from 'next'

import { ClinicInnerPage } from '@/components/clinic-inner-page'

export const metadata: Metadata = {
  title: 'Care & services | Mission Primary Care',
  description: 'Primary care, preventive visits, chronic disease management, labs, telehealth and DOT physicals.',
}

export default function ServicesPage() { return <ClinicInnerPage kind="services" /> }
