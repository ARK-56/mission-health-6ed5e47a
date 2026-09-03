# Payer logos

Drop logo files here, then register each one in `payerLogos` in
`components/sections.tsx`, keyed by the exact payer name used in
`insurancePlans`.

    'Aetna': '/insurance/aetna.svg',

Any payer without an entry renders as its name in text, so the list stays
complete while logos arrive one at a time.

Guidance:
- SVG preferred; otherwise PNG with a transparent background at 2x the
  display size (logos render ~26px tall on /insurance, ~22px in the strip).
- Both surfaces are white, so dark-on-transparent artwork works best.
- Payer contracts commonly restrict use of their marks, and CMS restricts
  the Medicare name and logo. Confirm written permission per payer first.
