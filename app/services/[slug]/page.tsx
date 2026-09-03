import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ClinicServicePage } from '@/components/clinic-service-page'
import { serviceBySlug, services } from '@/lib/services'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.title} | Mission Primary Care`,
    description: service.intro,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!serviceBySlug(slug)) notFound()
  return <ClinicServicePage slug={slug} />
}
