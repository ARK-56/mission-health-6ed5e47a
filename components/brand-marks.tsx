/** Brand marks, drawn here because lucide dropped its brand icon set. */

type MarkProps = { size?: number }

const base = (size: number) => ({
  viewBox: '0 0 24 24',
  width: size,
  height: size,
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false' as const,
})

export function LinkedInMark({ size = 20 }: MarkProps) {
  return (
    <svg {...base(size)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  )
}

export function FacebookMark({ size = 20 }: MarkProps) {
  return (
    <svg {...base(size)}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  )
}

export function YouTubeMark({ size = 20 }: MarkProps) {
  return (
    <svg {...base(size)}>
      <path d="M23.5 6.9a3.02 3.02 0 0 0-2.12-2.14C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.9C0 8.79 0 12 0 12s0 3.21.5 5.1a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14c.5-1.89.5-5.1.5-5.1s0-3.21-.5-5.1zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  )
}

/**
 * Instagram's camera, built from primitives rather than one long path. Its own
 * mark is an outline, so the shapes are stroked; a single hand-copied path kept
 * dropping segments out of the frame.
 */
export function InstagramMark({ size = 20 }: MarkProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
