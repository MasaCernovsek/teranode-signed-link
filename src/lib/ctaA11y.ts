/**
 * Shared accessible names for marketing CTAs.
 * Use with aria-label on the interactive control and aria-hidden on decorative/duplicate inner markup
 * so assistive tech gets one clear phrase (WCAG 4.1.2 Name, Role, Value).
 */
export const CTA_A11Y = {
  /** Stacked: design partner + subline */
  designPartnerStacked: "Become a design partner. Shape the next phase.",
  /** Stacked: product overview (internal /product) */
  liveProductStacked: "See what's live today. Explore the live product.",
  /** Single-line signup (product page CTAs to external signup) */
  startFreeNewTab: "Start for free. Opens in a new tab.",
  /** Hero secondary — book a demo (mailto) */
  bookDemoMailto: "Book a demo. Opens your email client.",
  /** Nav / compact design partner control */
  navDesignPartner: "Become a design partner. Go to application form.",
  /** Dark section prototype link */
  prototypeStacked: "Project Document Chain of custody. See what we're designing.",
  /** Product page bridge to design partner programme */
  designPartnerProgramme: "Learn about the design-partner programme.",
  /** Internal link to live product overview */
  learnMoreProduct: "Learn more. Go to the Teranode Sign product page.",
} as const;
