import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="shell">
        <p className="eyebrow">Page not found</p>
        <h1>We couldn’t find that page.</h1>
        <p>The link may be out of date. Head back home, or reach our care team and we will point you in the right direction.</p>
        <div className="not-found-actions">
          <Link className="button" href="/">Back to home</Link>
          <Link className="text-link" href="/contact">Contact Mission <ArrowRight size={17} /></Link>
        </div>
      </div>
    </main>
  )
}
