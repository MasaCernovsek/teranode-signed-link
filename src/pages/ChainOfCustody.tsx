import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  Users,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Layers,
  Scale,
  HardHat,
} from "lucide-react";

import teranodeLogo from "@/assets/teranode-logo.svg";
import pdccHeroPcoc from "@/assets/pdcc-hero-pcoc.svg";
import { LandingMultipartyAnimatedSvg } from "@/components/LandingMultipartyAnimatedSvg";
import { CTA_A11Y } from "@/lib/ctaA11y";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { LucideIcon } from "lucide-react";

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
 * Project Chain of Custody — width system (single grid, three tiers only):
 * - standard: max-w-6xl — most sections, nav, footer inner
 * - wide: max-w-7xl — hero product visual only
 * - form: max-w-3xl — application panel only (intentional narrow)
 */
const CONTAINER = {
  standard: "mx-auto w-full max-w-6xl",
  wide: "mx-auto w-full max-w-7xl",
  form: "mx-auto w-full max-w-3xl",
} as const;

/**
 * Project Chain of Custody — full-page dark art direction (matches Early Access
 * `id="chain-of-custody"`: `bg-[hsl(228,30%,10%)]`, `border-white/10`, `bg-white/5` panels,
 * `text-white` / `text-white/60–70` copy).
 */
const PDCC_DARK = {
  bg: "bg-[hsl(228,30%,10%)]",
  text: "text-white",
  nav: "border-b border-white/10 bg-[hsl(228,30%,10%)]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[hsl(228,30%,10%)]/88",
  divider: "border-white/10",
  surface: "rounded-xl border border-white/10 bg-white/5",
  surfaceLg: "rounded-2xl border border-white/10 bg-white/5",
  heading: "text-white",
  subheading: "text-white/85",
  body: "text-white/70",
  muted: "text-white/60",
  iconAccent: "text-purple-300",
  ringOffset: "ring-offset-[hsl(228,30%,10%)]",
  field:
    "border-white/20 bg-[hsl(228,28%,12%)] text-white placeholder:text-white/40 ring-offset-[hsl(228,30%,10%)] focus-visible:ring-primary",
} as const;

const WHO_ICP_SLIDES: {
  icon: LucideIcon;
  title: string;
  pain: string;
  practice: string;
  scenarios?: string[];
}[] = [
  {
    icon: HardHat,
    title: "Construction contractors",
    pain:
      "Under the Construction Act, pay-less notice timing can decide whether a payment application stands, with adjudication often weeks away. When payment is challenged, proof usually lives in email—so both sides argue send time instead of one anchored fact.",
    practice:
      "Teranode Sign timestamps each payment application and pay-less notice at issuance, links them across parties, and anchors a tamper-evident, blockchain-anchored chain-of-custody across the payment chain—a party-branched, time-stamped story through to final account disputes, not a reconstruction from inboxes. One-click evidence export when timing is disputed.",
    scenarios: ["Late pay-less vs provable timestamp on the notice chain"],
  },
  {
    icon: Scale,
    title: "Legal & investigations teams",
    pain:
      "Investigations and regulatory defence turn on when you had a document, who saw it, and whether it changed—not only what it says. Email threads and shared drives make that hard to prove when the FCA, SFO, ICO, or a court asks for the record.",
    practice:
      "From day one of a matter, board papers, witness material, exhibits, and regulatory packs move through Teranode Sign with tamper-evident anchoring. Every access, signature, and handoff joins the chain-of-custody record. One-click evidence export bundles documents, signing order, access history, and blockchain verification.",
    scenarios: ["Board resolution: proved executed and in circulation at a defined time"],
  },
  {
    icon: Users,
    title: "HR & employee relations",
    pain:
      "Disciplinaries, grievances, redundancies, TUPE, and ET claims turn on whether each step happened in order, with the right letters issued and acknowledged on time. After an ET1, many teams still rebuild that story from drives and inboxes.",
    practice:
      "Teranode Sign sits beneath your process: at-risk notices, consultation invites, outcomes, appeals, and settlement drafts are issued and signed inside a tamper-evident chain-of-custody. You keep a complete, timestamped process log—who received what, when it was opened, and when they responded—so the record is intact before argument.",
    scenarios: ["Redundancy at tribunal: end-to-end timestamped process log"],
  },
  {
    icon: Layers,
    title: "AEC consultancies",
    pain:
      "Disputes return to drawings, RFIs, specs, and variations—which revision was issued, who approved it, and when did parties know? CDEs track files but rarely produce the signed, multi-party evidence record implied by BSA 2022 golden-thread obligations.",
    practice:
      "Teranode Sign anchors issued drawings, RFI responses, variation instructions, and approvals with timestamps in one chain-of-custody. You show which version was issued and who approved it when, with one-click evidence export for adjudication or TCC—so “oral instruction” claims meet a provable issue-to-acceptance sequence.",
    scenarios: ["Variation dispute: revision and approval chain vs oral instruction"],
  },
];

function WhoThisIsForCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSlideChange = () => setCurrent(api.selectedScrollSnap());
    onSlideChange();
    api.on("select", onSlideChange);
    api.on("reInit", onSlideChange);
    return () => {
      api.off("select", onSlideChange);
      api.off("reInit", onSlideChange);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="w-full">
        <div className="relative px-10 sm:px-12 md:px-14">
          <CarouselContent className="-ml-3 sm:-ml-4">
            {WHO_ICP_SLIDES.map((slide) => {
              const Icon = slide.icon;
              return (
                <CarouselItem key={slide.title} className="basis-full pl-3 sm:basis-full sm:pl-4">
                  <div className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-none">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <Icon className={`h-4 w-4 ${PDCC_DARK.iconAccent}`} aria-hidden />
                    </div>
                    <h3 className="mb-3 text-[15px] font-semibold leading-snug text-white">{slide.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{slide.pain}</p>
                    <p className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-300/90">
                      How it fits in practice
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">{slide.practice}</p>
                    {slide.scenarios && slide.scenarios.length > 0 ? (
                      <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-snug text-white/65 marker:text-white/40">
                        {slide.scenarios.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            variant="outline"
            size="icon"
            className="h-9 w-9 border-white/20 bg-white/10 text-white shadow-none hover:bg-white/15 hover:text-white sm:h-10 sm:w-10 left-1 top-1/2 z-10 -translate-y-1/2 md:left-0"
          />
          <CarouselNext
            variant="outline"
            size="icon"
            className="h-9 w-9 border-white/20 bg-white/10 text-white shadow-none hover:bg-white/15 hover:text-white sm:h-10 sm:w-10 right-1 top-1/2 z-10 -translate-y-1/2 md:right-0"
          />
        </div>
      </Carousel>
      <div
        className="mt-6 flex justify-center gap-2.5"
        role="tablist"
        aria-label="Choose an industry profile"
      >
        {WHO_ICP_SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`${slide.title} (slide ${i + 1} of ${WHO_ICP_SLIDES.length})`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(228,30%,10%)]",
              current === i ? "bg-primary" : "bg-white/30 hover:bg-white/45",
            )}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

const ChainOfCustody = () => {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const DESIGN_PARTNER_APPLICATION_EMAIL = "m.cernovseklogar@teranode.group";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(DESIGN_PARTNER_APPLICATION_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            role: form.role || "—",
            company_type: form.companyType || "—",
            pain: form.pain || "—",
            _subject: "Project Chain of Custody — design partner application",
          }),
        }
      );
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!res.ok) {
        throw new Error(
          typeof data?.message === "string" && data.message
            ? data.message
            : "Could not send your application. Please try again."
        );
      }
      if (data && "success" in data && data.success === false) {
        throw new Error(
          typeof data.message === "string" && data.message
            ? data.message
            : "Could not send your application. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToWhoFor = () => {
    document.getElementById("who-for")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const DOCS_URL = "https://docs.teranode.group/teranode-sign";
  const LOGIN_URL = "https://sign.products.teranode.group/login";
  const SIGNUP_URL = "https://sign.products.teranode.group/signup";

  return (
    <div className={`min-h-screen ${PDCC_DARK.bg} ${PDCC_DARK.text}`}>
      {/* ─── NAV ─── */}
      <nav className={`sticky top-0 z-50 ${PDCC_DARK.nav}`}>
        <div className={`${CONTAINER.standard} ${PAGE_GUTTER} flex h-14 items-center justify-between`}>
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-7 brightness-0 invert opacity-95" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
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
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span aria-hidden>Apply as a design partner</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════ */}
      {/* ─── HERO — image-first → main text → supporting columns ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className={`relative overflow-hidden pb-10 pt-8 ${PAGE_GUTTER}`}>
        {/* Wide media — hero visual only */}
        <div className={CONTAINER.wide}>
          <div className="pdcc-hero-image-wrap mx-auto w-full">
            <Reveal>
              <img
                src={pdccHeroPcoc}
                alt="Project Chain of Custody — product illustration"
                className="h-auto w-full"
                loading="eager"
                decoding="async"
              />
            </Reveal>
          </div>
        </div>

        {/* Standard — hero copy below image */}
        <div className={`${CONTAINER.standard} pdcc-hero-copy-container mt-[40px]`}>
            <p className="pdcc-hero-eyebrow mb-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-300 md:text-xs">
              WITH DESIGN PARTNERS
            </p>
            <div className="pdcc-hero-main-text grid grid-cols-1 gap-y-6 text-left md:grid-cols-12 md:items-start md:gap-x-12 md:gap-y-0">
              <div className="pdcc-hero-title-col text-left md:col-span-6">
                <h1 className="pdcc-hero-title text-5xl font-extrabold leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl lg:leading-[1.03]">
                  Project Chain of Custody
                </h1>
              </div>
              <div className="pdcc-hero-tagline-col text-left md:col-span-6">
                <p className="pdcc-hero-tagline text-lg font-semibold leading-snug text-white/90 md:text-left md:text-xl md:leading-snug lg:text-2xl">
                  For teams who can&apos;t afford fuzzy records when things go wrong.
                </p>
              </div>
            </div>

            <div
              ref={heroCtasRef}
              className="pdcc-hero-supporting mt-8 grid grid-cols-1 gap-y-10 text-left md:grid-cols-12 md:gap-x-12 md:gap-y-0"
            >
              <div className="pdcc-hero-supporting-left md:col-span-6">
              <p className="pdcc-hero-supporting-left-label mb-3 text-xs font-semibold tracking-wide text-white/85">
                What&apos;s live today
              </p>
              <p className="pdcc-hero-supporting-left-body text-base font-normal leading-relaxed text-white/70">
                Teranode Sign is already live with legal, HR, and commercial teams for high-stakes agreements.
              </p>
              <div className="pdcc-hero-supporting-left-cta mt-5 w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" aria-label={CTA_A11Y.startFreeNewTab}>
                    <span aria-hidden>Start for free</span>
                  </a>
                </Button>
              </div>
              </div>
              <div className="pdcc-hero-supporting-right md:col-span-6">
              <p className="pdcc-hero-supporting-right-label mb-3 text-xs font-semibold tracking-wide text-white/85">
                What Project Chain of Custody adds
              </p>
              <p className="pdcc-hero-supporting-right-body text-base font-normal leading-relaxed text-white/70">
                Project Chain of Custody is the next layer: a shared, dispute-ready record of who issued, saw, signed, and
                controlled critical documents across a project.
              </p>
              <div className="pdcc-hero-supporting-right-cta mt-5 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-white/20 bg-white/10 text-white hover:border-[rgb(40,175,96)] hover:bg-[rgb(40,175,96)] hover:text-white sm:w-auto"
                  onClick={scrollToWhoFor}
                  aria-label="See use cases. Scroll to who this is for."
                >
                  <span aria-hidden>See use cases</span>
                </Button>
              </div>
              </div>
            </div>
        </div>
      </section>

      {/* ─── WHEN A PAYMENT APPLICATION IS CHALLENGED ─── */}
      <section
        id="chain-of-custody"
        className={`scroll-mt-24 border-t border-white/10 py-14 md:py-20 ${PAGE_GUTTER}`}
      >
        <div className={CONTAINER.standard}>
          <Reveal>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-white md:text-3xl">
              When a payment application is challenged
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Issue & send",
                  body: "Contractor issues a payment application via Teranode Sign; it is added to the project record with timestamps and recipients.",
                },
                {
                  step: "2",
                  title: "Branches across parties",
                  body: "Owner and consultants receive, view, and respond; each party\u2019s branch shows what they saw and controlled.",
                },
                {
                  step: "3",
                  title: "Challenge & dispute mode",
                  body: "When the application is challenged, the record is marked as contested; relevant branches are frozen and custody is locked.",
                },
                {
                  step: "4",
                  title: "Evidence bundle",
                  body: "You export a dispute-ready bundle in one click: timeline, chain of custody, signatures, and access log.",
                },
              ].map(({ step, title, body }, index) => (
                <div
                  key={step}
                  tabIndex={0}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={cn(
                    "pdcc-payment-flow-card flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 shadow-none",
                    "animate-pdcc-payment-step",
                    "transition-[transform,box-shadow,border-color] duration-200 ease-out",
                    "hover:scale-[1.02] hover:border-primary/30 hover:shadow-md",
                    "focus-visible:scale-[1.02] focus-visible:border-primary/30 focus-visible:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(228,30%,10%)]",
                  )}
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/25 text-sm font-bold text-white">
                    {step}
                  </span>
                  <h3 className="mb-2 text-[15px] font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section
        id="who-for"
        className={`scroll-mt-24 border-t border-white/10 py-14 md:py-20 ${PAGE_GUTTER}`}
      >
        <div className={CONTAINER.standard}>
          <Reveal>
            <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-white md:mb-8 md:text-3xl">
              Who this is for
            </h2>
            <WhoThisIsForCarousel />
          </Reveal>
        </div>
      </section>

      {/* ─── MULTI-PARTY RECORD MAPPING ─── */}
      <section className={`border-t border-white/10 py-14 md:py-20 ${PAGE_GUTTER}`}>
        <div className={CONTAINER.standard}>
          <Reveal>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Users className={`h-5 w-5 ${PDCC_DARK.iconAccent}`} />
                </div>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">Multi-party record mapping</h2>
                <p className="leading-relaxed text-white/70">
                  Partners tell us how records actually move—across contractors, owners, and consultants—so we can
                  mirror that in branches and permissions instead of forcing a single-org view.
                </p>
              </div>
              <div className={`${PDCC_DARK.surface} overflow-hidden p-4`}>
                <LandingMultipartyAnimatedSvg className="h-auto w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── MULTI-PARTY, MULTI-BRANCH RECORD ─── */}
      <section className={`border-t border-white/10 py-14 md:py-20 ${PAGE_GUTTER}`}>
        <div className={CONTAINER.standard}>
          <Reveal>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:mb-5 md:text-3xl">
              Multi-party, multi-branch record
            </h2>
            <p className="mb-10 text-base leading-relaxed text-white/70 md:mb-12 md:text-lg">
              Contracts, variations, and payment applications move across organisations — with a clear branch per party and
              a single story across the project.
            </p>
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              <div className={`${PDCC_DARK.surface} p-5`}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                  <Layers className={`h-4 w-4 ${PDCC_DARK.iconAccent}`} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">Control and visibility</h3>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  Track who controls what, when access was granted or revoked, and which party holds responsibility at every
                  point in the project.
                </p>
              </div>
              <div className={`${PDCC_DARK.surface} p-5`}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                  <Eye className={`h-4 w-4 ${PDCC_DARK.iconAccent}`} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">Dispute-ready evidence</h3>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  Preserve history across parties and export a complete evidence bundle when a record is challenged — with
                  verification built in.
                </p>
              </div>
              <div className={`${PDCC_DARK.surface} p-5`}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">Dispute mode</h3>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  Surface contested documents, preserve history, and protect evidence when a payment application or
                  variation is disputed—so custody can be frozen for adjudication, not just filed away.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── APPLICATION ─── */}
      <section
        id="signup"
        className={`scroll-mt-24 border-t border-white/10 py-14 md:scroll-mt-28 md:py-20 ${PAGE_GUTTER}`}
      >
        <div className={CONTAINER.standard}>
          <Reveal>
            <div className={`${CONTAINER.form} ${PDCC_DARK.surfaceLg} p-6 md:p-8`}>
              <div className="mb-10 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300">Apply</p>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Interested in shaping Project Chain of Custody?
                </h2>
                <p className="text-sm leading-relaxed text-white/70">
                  We&apos;re working with a small group of teams where documentation and evidence already decide
                  outcomes—on projects, in investigations, or in tribunals.
                </p>
              </div>

              <div className="mb-10 grid gap-6 lg:grid-cols-2">
                <div className={`${PDCC_DARK.surface} p-6`}>
                  <h3 className="mb-3 text-sm font-semibold text-white">Strongest fit</h3>
                  <ul className="space-y-2">
                    {[
                      "Payment disputes, adjudication, or contentious variations.",
                      "Records that cross organisations (handovers, joint ventures, supply chain).",
                      "You own evidence, compliance, or contractual records—not only IT.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgb(40,175,96)]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${PDCC_DARK.surface} p-6`}>
                  <h3 className="mb-3 text-sm font-semibold text-white">What participation looks like</h3>
                  <ul className="space-y-2">
                    {[
                      "Working sessions on workflows and prototypes—not passive beta access.",
                      "Honest feedback on half-built ideas; we adjust based on what we learn.",
                      "Time from your side: periodic calls and scenario reviews, not a full-time commitment.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgb(40,175,96)]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-green-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Thanks for applying</h3>
                  <p className="text-sm text-white/70">
                    We&apos;ll review and get back to you within two working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/80">Name</label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className={PDCC_DARK.field}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/80">Email</label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className={PDCC_DARK.field}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/80">Company</label>
                      <Input
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className={PDCC_DARK.field}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/80">Role</label>
                      <Input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Commercial Manager"
                        className={PDCC_DARK.field}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/80">Primary context</label>
                    <Select value={form.companyType} onValueChange={(v) => setForm({ ...form, companyType: v })}>
                      <SelectTrigger className={PDCC_DARK.field}>
                        <SelectValue placeholder="Primary context (ICP)" />
                      </SelectTrigger>
                      <SelectContent className="border-white/15 bg-[hsl(228,28%,14%)] text-white">
                        <SelectItem
                          value="construction"
                          className="text-white focus:bg-white/10 focus:text-white"
                        >
                          Construction / built environment
                        </SelectItem>
                        <SelectItem
                          value="legal-investigations"
                          className="text-white focus:bg-white/10 focus:text-white"
                        >
                          Legal / investigations
                        </SelectItem>
                        <SelectItem value="hr-er" className="text-white focus:bg-white/10 focus:text-white">
                          HR / employee relations
                        </SelectItem>
                        <SelectItem
                          value="commercial-other"
                          className="text-white focus:bg-white/10 focus:text-white"
                        >
                          Commercial / other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/80">
                      Biggest documentation or dispute pain
                    </label>
                    <Textarea
                      value={form.pain}
                      onChange={(e) => setForm({ ...form, pain: e.target.value })}
                      placeholder="Describe construction, legal/investigations, or HR/ER context and one case where the record was hard to prove."
                      className={cn("min-h-[88px]", PDCC_DARK.field)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                    size="lg"
                  >
                    {isSubmitting ? "Sending…" : "Apply as a design partner"}
                  </Button>
                  {submitError ? (
                    <p className="text-center text-sm text-red-300" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  <p className="text-center text-xs text-white/55">
                    Tell us whether you&apos;re coming from construction, legal/investigations, or HR/ER, and share one real
                    case where the record was hard to prove.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t border-white/10 py-10 ${PDCC_DARK.bg} ${PAGE_GUTTER}`}>
        <div className={`flex flex-col items-center justify-between gap-4 md:flex-row ${CONTAINER.standard}`}>
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-6 brightness-0 invert opacity-90" />
          </div>
          <p className="text-center text-xs text-white/60 md:text-left">
            Secure document workflows with blockchain-backed proof and role-based control.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Login
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Documentation
            </a>
            <a
              href="mailto:contact@teranode.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChainOfCustody;
