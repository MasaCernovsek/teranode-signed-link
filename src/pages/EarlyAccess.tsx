import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Users,
  AlertTriangle,
  Download,
  CheckCircle2,
  ArrowRight,
  Eye,
  Layers,
  FileText,
  Workflow,
  Rocket,
  MessageSquare,
  Scale,
  HardHat,
  Briefcase,
} from "lucide-react";

import teranodeLogo from "@/assets/teranode-logo.svg";
import { LandingHeroAnimatedSvg } from "@/components/LandingHeroAnimatedSvg";
import { LandingMultipartyAnimatedSvg } from "@/components/LandingMultipartyAnimatedSvg";
import { LandingDisputeModeAnimatedSvg } from "@/components/LandingDisputeModeAnimatedSvg";
import landingEvidenceExport from "@/assets/landing-evidence-export.svg";
import { PDCC2AnimatedSvg } from "@/components/PDCC2AnimatedSvg";
import { CTA_A11Y } from "@/lib/ctaA11y";

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Horizontal padding for all page sections — single gutter. */
const PAGE_GUTTER = "px-6";

/**
 * Design Partner layout system (3 widths only):
 * - narrow: hero copy, application intro + form (tightest reading column)
 * - standard: light sections — foundations, problem, partners, ideal partners; nav/footer align here
 * - wide: Project Chain of Custody (dark) + large visuals inside it
 */
const CONTAINER = {
  narrow: "mx-auto w-full max-w-2xl",
  standard: "mx-auto w-full max-w-6xl",
  wide: "mx-auto w-full max-w-7xl",
} as const;

const EarlyAccess = () => {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [heroCtasInView, setHeroCtasInView] = useState(true);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    companyType: "",
    pain: "",
    email: "",
  });

  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    const el = heroCtasRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setHeroCtasInView(Boolean(entry?.isIntersecting));
      },
      // Flip as soon as the hero CTA row leaves the viewport.
      { threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const DOCS_URL = "https://docs.teranode.group/teranode-sign";
  const LOGIN_URL = "https://sign.products.teranode.group/login";
  const SIGNUP_URL = "https://sign.products.teranode.group/signup";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className={`${CONTAINER.standard} ${PAGE_GUTTER} flex h-14 items-center justify-between`}>
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-7" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CTA_A11Y.startFreeNewTab}
              >
                <span aria-hidden>Start for free</span>
              </a>
            </Button>
            {!heroCtasInView && (
              <Button
                type="button"
                size="sm"
                onClick={scrollToSignup}
                aria-label={CTA_A11Y.navDesignPartner}
                className="transition-colors hover:bg-white hover:text-slate-900"
              >
                <span aria-hidden>Become a design partner</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════ */}
      {/* ─── HERO — design partner invitation ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className={`${CONTAINER.standard} ${PAGE_GUTTER} pb-8 pt-16 md:pb-12 md:pt-20`}>
          <div className={`${CONTAINER.narrow} mb-8 text-center md:mb-10`}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
              Design partner programme
            </p>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.25rem]">
              Disputes rarely start in court. They start when the record is unclear.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Teranode Sign already helps teams create signed, independently verifiable records. We are inviting a small
              number of design partners to help shape the next phase: chain of custody, evidence export, and dispute-ready
              controls for contested documentation.
            </p>
            <div
              ref={heroCtasRef}
              className="mb-5 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row sm:items-stretch sm:justify-center sm:gap-3"
            >
              <Button
                type="button"
                size="lg"
                aria-label={CTA_A11Y.designPartnerStacked}
                className="group inline-flex h-auto w-max min-w-[11.5rem] max-w-[min(100%,19rem)] shrink-0 gap-0 px-5 py-2 text-base shadow-sm transition-colors hover:bg-white hover:text-slate-900 sm:min-w-[12.5rem] sm:px-6 sm:py-2.5"
                onClick={scrollToSignup}
              >
                <span aria-hidden className="flex flex-col items-center gap-px text-center sm:items-start sm:text-left">
                  <span className="text-[15px] font-semibold leading-snug tracking-tight text-primary-foreground transition-colors group-hover:text-slate-900">
                    Become a design partner
                  </span>
                  <span className="text-[10px] font-normal leading-snug tracking-wide text-primary-foreground/55 transition-colors group-hover:text-slate-500">
                    Shape the next phase
                  </span>
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group inline-flex h-auto w-max min-w-[11.5rem] max-w-[min(100%,19rem)] shrink-0 gap-0 border-border/70 bg-background/70 px-5 py-2 text-base shadow-sm backdrop-blur-sm transition-colors hover:border-[rgb(40,175,96)] hover:bg-[rgb(40,175,96)] hover:text-white sm:min-w-[12.5rem] sm:px-6 sm:py-2.5"
                asChild
              >
                <Link to="/product" aria-label={CTA_A11Y.liveProductStacked}>
                  <span aria-hidden className="flex flex-col items-center gap-px text-center sm:items-start sm:text-left">
                    <span className="text-[15px] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-white">
                      See what&apos;s live today
                    </span>
                    <span className="text-[10px] font-normal leading-snug tracking-wide text-muted-foreground/75 transition-colors group-hover:text-white/85">
                      Explore the live product
                    </span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <Reveal>
            <div className="relative w-full">
              <LandingHeroAnimatedSvg
                className="relative z-10 h-auto w-full opacity-95"
                title="Teranode Sign — live product interface"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY THIS MATTERS (restored pre-restructure bridge) ─── */}
      <section className={`border-y border-border/70 bg-muted/10 py-20 md:py-28 ${PAGE_GUTTER}`}>
        <div className={CONTAINER.standard}>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-[rgba(255,252,250,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(15,23,42,0.06)] dark:bg-card/40">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 18px)",
                  maskImage: "radial-gradient(60% 55% at 75% 35%, black 0%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(60% 55% at 75% 35%, black 0%, transparent 70%)",
                }}
              />

              <div className="relative grid gap-10 px-7 py-12 md:grid-cols-12 md:items-start md:gap-10 md:px-12 md:py-16">
                <div className="md:col-span-4 md:pt-0.5">
                  <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-[rgb(40,175,96)]">
                    Why this matters
                  </p>
                  <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-4xl">
                    We&apos;ve built the foundations. Now we&apos;re tackling the bigger problem.
                  </h2>
                </div>

                <div className="relative md:col-span-8 md:border-l md:border-border/40 md:pl-10 md:pt-1">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-0 hidden opacity-[0.035] md:block"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 120px)",
                      maskImage: "radial-gradient(72% 72% at 55% 35%, black 0%, transparent 82%)",
                      WebkitMaskImage: "radial-gradient(72% 72% at 55% 35%, black 0%, transparent 82%)",
                    }}
                  />

                  <div className="relative max-w-[58ch] space-y-6 leading-relaxed text-muted-foreground">
                    <p>
                      Most tools help teams get documents signed. Far fewer help them keep a clear, provable record of
                      what happened across parties over time.
                    </p>
                    <p>
                      That gap matters when questions arise, positions harden, or evidence is tested. We&apos;re building
                      beyond signing to make the record itself stronger.
                    </p>
                    <p>
                      That&apos;s why we&apos;re working with a small group of design partners to design the next phase:
                      disputed, multi-party project records and chain-of-custody.
                    </p>
                  </div>

                  <div className="relative mt-7 max-w-md rounded-2xl border border-border/90 bg-background/75 px-5 py-4 shadow-[0_1px_0_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:bg-background/60">
                    <p className="text-sm leading-relaxed text-foreground/85">
                      <span className="mb-2 block">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-primary/10 text-primary">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </span>
                      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                        Key shift
                      </span>
                      <span className="block text-foreground/85">
                        Signing is the start. The record is the real infrastructure.
                      </span>
                    </p>
                    <div
                      aria-hidden
                      className="mt-3 h-px w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(15,23,42,0.18) 0%, rgba(15,23,42,0.08) 45%, rgba(15,23,42,0) 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative border-t border-border/60 bg-muted/[0.35] px-7 py-6 md:px-12 md:py-7 dark:bg-muted/20">
                <div className="mx-auto flex w-full flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
                  <Button
                    type="button"
                    size="lg"
                    aria-label={CTA_A11Y.designPartnerStacked}
                    className="group inline-flex h-auto w-max min-w-[13.25rem] max-w-[min(100%,22rem)] shrink-0 gap-0 px-6 py-2.5 shadow-sm transition-colors hover:bg-white hover:text-slate-900 sm:min-w-[14rem] sm:px-7"
                    onClick={scrollToSignup}
                  >
                    <span aria-hidden className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
                      <span className="text-[15px] font-semibold leading-snug text-primary-foreground transition-colors group-hover:text-slate-900">
                        Become a design partner
                      </span>
                      <span className="text-[11px] font-medium leading-snug text-primary-foreground/75 transition-colors group-hover:text-slate-600">
                        Shape the next phase
                      </span>
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group inline-flex h-auto w-max min-w-[13.25rem] max-w-[min(100%,22rem)] shrink-0 gap-0 border-border/80 bg-background/80 px-6 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:border-[rgb(40,175,96)] hover:bg-[rgb(40,175,96)] hover:text-white sm:min-w-[14rem] sm:px-7 dark:bg-background/40"
                    asChild
                  >
                    <Link to="/product" aria-label={CTA_A11Y.liveProductStacked}>
                      <span aria-hidden className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
                        <span className="text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-white">
                          See what&apos;s live today
                        </span>
                        <span className="text-[11px] font-medium leading-snug text-muted-foreground transition-colors group-hover:text-white/90">
                          Explore the live product
                        </span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className={`border-y border-border bg-muted/20 py-20 md:py-28 ${PAGE_GUTTER}`}>
        <div className={`grid items-start gap-10 md:grid-cols-2 md:gap-12 ${CONTAINER.standard}`}>
          <Reveal>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">The pain</p>
              <h2 className="mb-6 text-3xl font-bold leading-[1.12] tracking-tight md:text-4xl">
                When you can&apos;t see what really happened.
              </h2>
              <div className="max-w-xl space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  When something goes wrong, nobody can see a single, trusted story of what was sent, signed, and handed
                  off. Different teams and parties hold different versions, and you lose hours reconstructing the record
                  just to have a conversation.
                </p>
                <div className="space-y-3 pt-1">
                  <p className="font-medium text-foreground/90">Does this sound familiar?</p>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground marker:text-primary/80">
                    <li>Documents live in email, shared drives, and separate signing tools.</li>
                    <li>Approvals and notices aren&apos;t tracked anywhere central.</li>
                    <li>Each party has their own &apos;version&apos; of the truth.</li>
                    <li>By the time a dispute surfaces, the record is already messy.</li>
                  </ul>
                </div>
                <p className="pt-2 text-foreground">
                  That&apos;s what we&apos;re exploring with Project Chain of Custody: a shared, project-level chain for
                  documents and evidence, so when questions land you can show a clear, time-stamped story instead of
                  piecing it together by hand.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: "linear-gradient(180deg, #FEE2E2 0%, rgba(251, 253, 254, 0) 100%)",
                }}
              />

              <div className="relative rounded-2xl p-5 md:p-6">
                <div className="space-y-5">
                  <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Fragmentation
                        </p>
                        <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                          <Users className="h-4 w-4" />
                        </span>
                        <h4 className="mt-3 text-base font-semibold tracking-tight md:text-lg">
                          Different parties, different records
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          Each organisation holds its own &quot;version&quot; — creating gaps, duplication, and room for
                          contest.
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                          Evidence diverges
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 h-px w-full bg-gradient-to-r from-destructive/30 via-destructive/10 to-transparent" />
                    <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                      When a dispute lands, the record is already fragmented.
                    </p>
                  </div>

                  <div className="pt-1">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Where the record breaks
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-border bg-card/70 p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </span>
                        <h5 className="mt-3 text-sm font-semibold tracking-tight">Contracts in email attachments</h5>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          Critical terms get buried in threads, forwards, and private inboxes.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-card/70 p-5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                          <AlertTriangle className="h-4 w-4" />
                        </span>
                        <h5 className="mt-3 text-sm font-semibold tracking-tight">Variations with no audit trail</h5>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          Changes happen fast; proof of when and why gets lost.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-card/70 p-5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                          <Clock className="h-4 w-4" />
                        </span>
                        <h5 className="mt-3 text-sm font-semibold tracking-tight">Missed notice deadlines</h5>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          A late notice can decide entitlement — even when work was real.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY JOIN + WHO IT'S FOR (single section) ─── */}
      <section
        id="design-partners"
        data-early-access-layout="why-join-and-ideal-partners"
        className={`scroll-mt-24 border-y border-border/50 bg-muted/15 py-14 md:py-20 ${PAGE_GUTTER}`}
      >
        <div className={CONTAINER.standard}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Why join</p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">What design partners get</h2>
            <p className="mb-10 max-w-2xl text-muted-foreground leading-relaxed">
              A selective, collaborative programme—not early access for its own sake. We need structured feedback on
              workflows, edge cases, and evidence needs.
            </p>
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Workflow,
                  title: "Direct input into workflow design",
                  body: "Sessions and working reviews on chain-of-custody models, dispute mode, and export—your constraints shape what we build.",
                },
                {
                  icon: Rocket,
                  title: "Early access to new capabilities",
                  body: "See prototypes and partner builds before general release; validate against your own documentation patterns.",
                },
                {
                  icon: MessageSquare,
                  title: "Closer collaboration with the team",
                  body: "A direct line to the people building the product—not a forum or a feature vote.",
                },
                {
                  icon: Scale,
                  title: "Grounded in real dispute pain",
                  body: "We prioritise scenarios from payment disputes, adjudication, variations, and multi-party handovers—not generic e-sign.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex h-full flex-col rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-14 text-xs font-semibold uppercase tracking-wider text-primary md:mt-16">
              Who it&apos;s for
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Ideal partners</h2>
            <p className="mb-10 max-w-2xl text-muted-foreground leading-relaxed">
              We are looking for a small set of teams where documentation and evidence already matter before a dispute
              goes formal. Typical profiles:
            </p>

            <ul className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: HardHat,
                  title: "Construction, infrastructure, logistics",
                  body: "Contractors, developers, consultants, or owners dealing with handovers, variations, and payment claims.",
                },
                {
                  icon: Briefcase,
                  title: "Commercial and legal owners",
                  body: "Of records, claims, or compliance who need auditability across organisations.",
                },
                {
                  icon: Clock,
                  title: "Operational reality",
                  body: "You can commit time for working sessions, scenario walk-throughs, and honest feedback on incomplete ideas.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex h-full flex-col rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ─── DARK SECTION — WHAT WE'RE BUILDING + CHAIN OF CUSTODY ─── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="chain-of-custody" className={`bg-[hsl(228,30%,10%)] py-20 md:py-28 ${PAGE_GUTTER}`}>
        <div className={CONTAINER.wide}>

          {/* Label */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary/30 border border-primary/40 px-4 py-1.5 rounded-full">
              <Clock className="h-3 w-3" /> In design-partner development
            </span>
          </div>

          {/* ─── Product direction (partners help shape) ─── */}
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                What partners help shape
              </p>
              <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
                Project Chain of Custody
              </h2>
              <p className="text-lg leading-relaxed text-white/70">
                The direction below is not a finished roadmap—it is the problem space design partners are helping us
                model: a shared, provable record of who issued, signed, received, challenged, or controlled a document
                over time, with branches per party and evidence that survives scrutiny.
              </p>
            </div>
          </Reveal>

          {/* PDCC visual — full width dark card */}
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-16 hover:border-primary/20 transition-colors duration-500">
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-white/50 ml-2">Project Chain of Custody — Sample Project</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="px-2 py-0.5 bg-white/10 rounded font-medium text-white/70">Branch</span>
                  <span className="px-2 py-0.5 rounded">List</span>
                </div>
              </div>
              <div className="p-4 md:p-8">
                <PDCC2AnimatedSvg className="w-full h-auto" />
              </div>
            </div>
          </Reveal>

          {/* Supporting text */}
          <Reveal>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <Layers className="h-4 w-4 text-purple-300" />
                </div>
                <h3 className="font-bold mb-2 text-white">Multi-party, multi-branch record</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Contracts, variations, and payment applications move across organisations — with
                  a clear branch per party and a single story across the project.
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <Eye className="h-4 w-4 text-purple-300" />
                </div>
                <h3 className="font-bold mb-2 text-white">Control and visibility</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Track who controls what, when access was granted or revoked, and
                  which party holds responsibility at every point in the project.
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <Download className="h-4 w-4 text-purple-300" />
                </div>
                <h3 className="font-bold mb-2 text-white">Dispute-ready evidence</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Preserve history across parties and export a complete evidence bundle when a
                  record is challenged — with verification built in.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ─── Built for Multi-party Workflows ─── */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-4 w-4 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Multi-party record mapping</h3>
                <p className="text-white/70 leading-relaxed">
                  Partners tell us how records actually move—across contractors, owners, and consultants—so we can
                  mirror that in branches and permissions instead of forcing a single-org view.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 p-4 hover:border-primary/30 transition-colors duration-300">
                <LandingMultipartyAnimatedSvg className="w-full h-auto" />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-20 flex justify-center">
              <div className="mx-auto flex w-full flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
                <Button
                  type="button"
                  size="lg"
                  aria-label={CTA_A11Y.designPartnerStacked}
                  onClick={scrollToSignup}
                  className="group inline-flex h-auto w-max min-w-[13.25rem] max-w-[min(100%,22rem)] shrink-0 gap-0 bg-primary px-6 py-2.5 shadow-sm transition-colors hover:bg-white hover:text-slate-900 sm:min-w-[14rem] sm:px-7"
                >
                  <span aria-hidden className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
                    <span className="text-[15px] font-semibold leading-snug text-primary-foreground transition-colors group-hover:text-slate-900">
                      Become a design partner
                    </span>
                    <span className="text-[11px] font-medium leading-snug text-primary-foreground/75 transition-colors group-hover:text-slate-600">
                      Shape the next phase
                    </span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group inline-flex h-auto w-max min-w-[13.25rem] max-w-[min(100%,22rem)] shrink-0 gap-0 border-white/20 bg-white/10 px-6 py-2.5 text-white shadow-sm backdrop-blur-sm transition-colors hover:border-[rgb(40,175,96)] hover:bg-[rgb(40,175,96)] hover:text-white sm:min-w-[14rem] sm:px-7"
                  asChild
                >
                  <Link
                    to="/"
                    aria-label={CTA_A11Y.prototypeStacked}
                    className="inline-flex items-center justify-center"
                  >
                    <span aria-hidden className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
                      <span className="text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-white">
                        Project Chain of custody
                      </span>
                      <span className="text-[11px] font-medium leading-snug text-white/75 transition-colors group-hover:text-white/90">
                        See what we&apos;re designing
                      </span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* ─── Dispute Mode ─── */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div>
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Dispute Mode</h3>
                <p className="mb-4 text-white/70 leading-relaxed">
                  We are designing ways to surface contested documents, preserve history, and protect evidence when a
                  payment application or variation is disputed—so custody can be frozen for adjudication, not just filed
                  away. Partner input defines what &quot;frozen&quot; must mean in practice.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-red-500/20 transition-colors duration-300">
                <LandingDisputeModeAnimatedSvg className="w-full h-auto" />
              </div>
            </div>
          </Reveal>

          {/* ─── Evidence Export (reversed) ─── */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
              <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-primary/20 transition-colors duration-300">
                <img src={landingEvidenceExport} alt="One-click evidence export bundle" className="w-full h-auto" loading="lazy" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Download className="h-4 w-4 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">One-click evidence export</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Assemble a complete dispute bundle with full audit trail, blockchain
                  verification, chain of custody record, and party access log — ready
                  for adjudicators, lawyers, or mediators. One click, one PDF.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mb-16 border-t border-white/10 pt-16">
            <p className="text-center text-sm text-white/55">
              Ready to apply? The next section is the programme application—selective places, working collaboration, not a
              waitlist.
            </p>
          </div>
        </div>
      </section>

      {/* ─── APPLICATION (light) ─── */}
      <section
        id="signup"
        className={`scroll-mt-24 border-t border-border/60 bg-muted/20 py-16 md:scroll-mt-28 md:py-24 ${PAGE_GUTTER}`}
      >
        <div className={CONTAINER.standard}>
          <Reveal>
            <div className={CONTAINER.narrow}>
              <div className="mb-10 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Apply</p>
                <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">Design partner application</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We onboard a small number of teams at a time. Tell us who you are and where documentation or disputes
                  create real friction—we reply within two working days.
                </p>
              </div>

              <div className="mb-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Strongest fit</h3>
                <ul className="space-y-2">
                  {[
                    "Payment disputes, adjudication, or contentious variations.",
                    "Records that cross organisations (handovers, joint ventures, supply chain).",
                    "You own evidence, compliance, or contractual records—not only IT.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgb(40,175,96)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">What participation looks like</h3>
                <ul className="space-y-2">
                  {[
                    "Working sessions on workflows and prototypes—not passive beta access.",
                    "Honest feedback on half-built ideas; we adjust based on what we learn.",
                    "Time from your side: periodic calls and scenario reviews, not a full-time commitment.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgb(40,175,96)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-green-600" />
                  <h3 className="mb-2 text-lg font-semibold">Thanks for applying</h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll review and get back to you within two working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">Name</label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">Email</label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">Company</label>
                      <Input
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">Role</label>
                      <Input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Commercial Manager"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium">Company type</label>
                    <Select value={form.companyType} onValueChange={(v) => setForm({ ...form, companyType: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="main-contractor">Main Contractor</SelectItem>
                        <SelectItem value="subcontractor">Subcontractor</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium">Biggest documentation or dispute pain</label>
                    <Textarea
                      value={form.pain}
                      onChange={(e) => setForm({ ...form, pain: e.target.value })}
                      placeholder="What breaks today when records or claims are tested?"
                      className="min-h-[88px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    Submit application
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By applying you are not committing to purchase—you are asking to join a working programme we run with a
                    limited number of teams.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t border-border bg-background py-10 ${PAGE_GUTTER}`}>
        <div className={`flex flex-col items-center justify-between gap-4 md:flex-row ${CONTAINER.standard}`}>
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-6" />
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Secure document workflows with blockchain-backed proof and role-based control.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Login
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </a>
            <a
              href="mailto:contact@teranode.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EarlyAccess;
