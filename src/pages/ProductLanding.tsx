import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTA_A11Y } from "@/lib/ctaA11y";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  Link2,
  Tag,
  Bell,
  Lock,
  ListOrdered,
  ArrowRight,
  BadgeCheck,
  FolderOpen,
  Shield,
  Workflow,
  Users,
  CheckCircle2,
  Briefcase,
  Building2,
  Scale,
  UserCheck,
} from "lucide-react";

import teranodeLogo from "@/assets/teranode-logo.svg";
import { LandingHeroAnimatedSvg } from "@/components/LandingHeroAnimatedSvg";
import landingUploadDocs from "@/assets/landing-upload-docs.svg";
import landingDocVerification from "@/assets/landing-doc-verification.svg";
import landingSigningOrders from "@/assets/landing-signing-orders.svg";
import landingTags from "@/assets/landing-tags.svg";
import landingActions from "@/assets/landing-actions.svg";
import landingPin from "@/assets/landing-pin.svg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const SIGNUP_URL = "https://sign.products.teranode.group/signup";
const DOCS_URL = "https://docs.teranode.group/teranode-sign";
const LOGIN_URL = "https://sign.products.teranode.group/login";
const BOOK_DEMO_URL =
  "mailto:contact@teranode.io?subject=Book%20a%20demo%20%E2%80%94%20Teranode%20Sign";

const trialButtonClass =
  "border-[rgb(40,175,96)] bg-[rgb(40,175,96)] text-white hover:bg-white hover:text-slate-900";

const ProductLanding = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between gap-2 px-4 sm:px-6">
          <Link to="/product" className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-7" />
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="min-h-10 min-w-[2.75rem] touch-manipulation text-primary hover:bg-transparent hover:text-primary border border-transparent hover:border-primary px-2.5 sm:px-3"
              asChild
            >
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Login. Opens in a new tab."
              >
                <span aria-hidden>Login</span>
              </a>
            </Button>
            <Button size="sm" className={`min-h-10 touch-manipulation px-3 sm:px-4 ${trialButtonClass}`} asChild>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CTA_A11Y.startFreeNewTab}
              >
                <span aria-hidden>Start for free</span>
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <div className="overflow-x-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 sm:pt-14 md:pb-12 md:pt-20">
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary sm:mb-4">
              Trusted e-signatures with a clear audit trail
            </p>
            <h1 className="mb-4 text-[1.6875rem] font-extrabold leading-[1.12] tracking-tight text-balance sm:mb-5 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Sign documents and keep proof in one place.
            </h1>
            <p className="mx-auto mb-6 max-w-[min(100%,22rem)] text-[15px] leading-relaxed text-muted-foreground sm:mb-8 sm:max-w-2xl sm:text-base md:text-lg">
              Teranode Sign lets teams send documents for signature, track who signed and when, and keep everything in a
              single, searchable audit trail that&apos;s easy to export when you need it.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button
                size="lg"
                className={`h-12 min-h-12 w-full touch-manipulation px-8 text-base shadow-md sm:w-auto sm:min-w-[12rem] ${trialButtonClass}`}
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
              <Button
                size="lg"
                variant="outline"
                className="h-12 min-h-12 w-full touch-manipulation border-border/80 bg-background px-8 text-base shadow-sm sm:w-auto sm:min-w-[12rem]"
                asChild
              >
                <a href={BOOK_DEMO_URL} aria-label={CTA_A11Y.bookDemoMailto}>
                  <span aria-hidden>Book a Demo</span>
                </a>
              </Button>
            </div>
          </div>

          <Reveal>
            <div className="relative mx-auto mt-2 max-w-4xl min-w-0 sm:mt-4">
              <LandingHeroAnimatedSvg className="relative z-10 h-auto w-full" title="Teranode Sign product interface" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — TRUST STRIP */}
      <section className="border-y border-border/80 bg-muted/15 px-4 py-8 sm:px-6 md:py-9">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
              <li className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card/90 px-4 py-4 text-[15px] font-semibold leading-snug text-foreground antialiased shadow-sm sm:items-center sm:text-[15px] sm:leading-normal">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[rgb(40,175,96)] sm:mt-0" aria-hidden />
                <span className="text-foreground">Live product—use it today</span>
              </li>
              <li className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card/90 px-4 py-4 text-[15px] font-semibold leading-snug text-foreground antialiased shadow-sm sm:items-center sm:text-[15px] sm:leading-normal">
                <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden />
                <span className="text-foreground">Independently verifiable records</span>
              </li>
              <li className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card/90 px-4 py-4 text-[15px] font-semibold leading-snug text-foreground antialiased shadow-sm sm:items-center sm:text-[15px] sm:leading-normal">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden />
                <span className="text-foreground">Multi-party signing and roles</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* HOW TERANODE SIGN IS DIFFERENT — editorial split layout */}
      <section className="border-b border-border/50 bg-background px-4 py-14 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start lg:gap-x-14 lg:gap-y-0 xl:gap-x-20">
            <Reveal className="min-w-0">
              <div className="mb-0 max-w-[30ch] lg:sticky lg:top-28 lg:mb-0 lg:max-w-[380px]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  Why teams choose Teranode Sign
                </p>
                <h2 className="mb-5 text-2xl font-bold leading-tight tracking-tight text-balance md:mb-6 md:text-3xl xl:text-[2rem]">
                  Built beyond
                  <br />
                  signature workflows
                </h2>
                <p className="text-[15px] leading-[1.65] text-muted-foreground">
                  Most e-sign tools stop at collecting signatures. Teranode Sign also gives you a clear, exportable
                  history of signatures and document versions, so you can see what was agreed and when.
                </p>
              </div>
            </Reveal>
            <div className="min-w-0">
              <Reveal>
                <div className="rounded-2xl border-2 border-violet-200/80 bg-violet-50/90 p-5 shadow-md ring-1 ring-violet-400/15 sm:p-7 dark:border-violet-500/35 dark:bg-violet-950/25 dark:ring-violet-400/10">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BadgeCheck className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-lg font-bold tracking-tight text-foreground mb-2.5">Provable verification</h3>
                      <p className="text-sm text-muted-foreground leading-[1.65]">
                        Match signed files to an independent chain record—proof isn&apos;t locked to one vendor stack.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-3">
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/50 bg-background p-4 sm:p-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Workflow className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold text-foreground">Structured workflows</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Set order, roles, and access in the app—instead of chasing email threads.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/50 bg-background p-4 sm:p-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <FolderOpen className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold text-foreground">Organised project records</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Contracts, notices, and approvals—indexed and retrievable when reviews or claims land.
                    </p>
                  </div>
                </Reveal>
              </div>
              <Reveal>
                <div className="mt-8 rounded-lg border border-border/35 bg-muted/15 px-4 py-3.5 md:px-5 md:py-4">
                  <div className="flex gap-3.5 md:items-start">
                    <div className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-[15px] font-semibold text-foreground/90">Built for important agreements</h3>
                      <p className="text-sm text-muted-foreground leading-[1.65]">
                        Reminders, tags, and access rules for files where deadlines and accountability actually matter.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT'S LIVE NOW */}
      <section className="border-y border-border/50 bg-muted/15 px-4 py-14 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 max-w-xl md:mb-10">
              <h2 className="mb-2.5 text-3xl font-bold tracking-tight text-balance md:text-4xl">What&apos;s live now</h2>
              <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Used by legal, project, and HR teams today. These features are available in the app today.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">Upload and request signatures</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    Upload PDF or Word, add recipients and roles, track status in one queue.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingUploadDocs}
                      alt="Upload documents interface"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Link2 className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">Document verification</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    Match each file to on-chain proof. Verification isn&apos;t owned by one vendor alone.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingDocVerification}
                      alt="Document verification with blockchain proof"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <ListOrdered className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">Custom signing flows</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    Sequential or custom order: pick signers, approvers, and who gets the copy.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingSigningOrders}
                      alt="Custom signing order setup"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Tag className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">Tags and organisation</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    Tag by job, counterparty, or doc type—filter fast as volume grows.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingTags}
                      alt="Organise documents with tags"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">Action dates and reminders</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    Expirations, renewals, and milestones—with reminders so dates don&apos;t slip.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingActions}
                      alt="Action dates and reminders"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5 md:p-6">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold leading-snug text-balance md:text-xl">PIN-protected access</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                    One-time PINs for sensitive files—you choose who can open them.
                  </p>
                  <div className="mt-auto flex aspect-[5/4] min-h-[148px] items-center justify-center overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] sm:aspect-[16/10] sm:min-h-0 sm:p-2 md:p-2.5 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={landingPin}
                      alt="PIN-protected document access"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Audience fit — by role */}
      <section className="relative overflow-hidden border-y border-border/55 bg-muted/25 px-4 py-14 sm:px-6 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-muted/30"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-2xl border border-border/50 bg-card/75 p-4 shadow-sm ring-1 ring-border/30 sm:rounded-[1.75rem] sm:p-7 md:p-8 lg:p-9 dark:bg-card/50">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
            <Reveal className="min-w-0">
              <div className="mb-6 max-w-[36ch] lg:sticky lg:top-28 lg:mb-0 lg:max-w-[420px]">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  Who it&apos;s for
                </p>
                <h2 className="mb-3 text-2xl font-bold leading-[1.15] tracking-tight text-balance md:mb-4 md:text-3xl xl:text-[2.125rem]">
                  Built for teams that need signed agreements and a reliable history
                </h2>
                <p className="text-[15px] leading-[1.65] text-muted-foreground text-pretty">
                  Teranode Sign helps project, commercial, legal, and HR teams send agreements for signature and keep a
                  clear history of what was sent, signed, and when.
                </p>
              </div>
            </Reveal>

            <div className="min-w-0">
              <div className="grid gap-3 sm:grid-cols-2 sm:items-stretch sm:gap-3 lg:gap-4">
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/40 bg-background p-3.5 sm:p-4">
                    <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-foreground">Project teams</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Contracts, notices, and approvals—organised and easy to pull when work moves quickly.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/40 bg-background p-3.5 sm:p-4">
                    <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-foreground">Commercial teams</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Track what was sent, signed, and chased, with reminders and a clearer trail on important deals.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/40 bg-background p-3.5 sm:p-4">
                    <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Scale className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-foreground">Legal teams</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Keep a cleaner audit trail of signatures and document history when files need review later.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="flex h-full flex-col rounded-xl border border-border/40 bg-background p-3.5 sm:p-4">
                    <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <UserCheck className="h-4 w-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-foreground">HR teams</h3>
                    <p className="text-sm text-muted-foreground leading-[1.65]">
                      Handle offer letters, onboarding documents, and employee agreements with a clear record of who
                      signed what and when.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* SECTION — FAQ */}
      <section className="bg-background px-4 py-14 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-8 text-center md:mb-11">
              <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.5rem]">
                Common questions
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-2xl border border-border/70 bg-card/60 px-1.5 py-1.5 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:px-2 sm:py-2 dark:bg-card/40"
            >
              <AccordionItem value="q1">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  Is Teranode Sign live today?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  Yes—upload, sign, verify, and manage documents in the live app today.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  What can I do in the product right now?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  Requests, verification, custom flows, tags, reminders, and PIN access—all live.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  Do I need a sales call to start?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  No—open the live product and start.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  What types of documents can I use?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  PDF and Word contracts, notices, approvals—anything that needs signatures and a defensible trail.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  How does verification work?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  Files are matched to an independent chain record—proof isn&apos;t tied to one party&apos;s servers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6" className="border-b-0">
                <AccordionTrigger className="min-h-[3.25rem] touch-manipulation px-4 py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline sm:px-3">
                  Is chain of custody available now?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-3">
                  Signing, verification, and record management are live. Multi-party chain-of-custody for disputes is in
                  design with a small partner group—not generally available yet.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* SECTION 8 — BRIDGE TO DESIGN-PARTNER PAGE (matches Early Access dark chain-of-custody section) */}
      <section className="border-t border-white/10 bg-[hsl(228,30%,10%)] px-4 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-md text-center">
          <Reveal>
            <h2 className="mb-2 text-sm font-semibold leading-snug tracking-tight text-white text-balance sm:text-base">
              Working on disputed multi-party records?
            </h2>
            <p className="mb-5 text-xs leading-relaxed text-white/70 text-pretty sm:mb-6 sm:text-sm">
              We&apos;re designing chain-of-custody and evidence workflows for complex disputes with a small set of
              design partners—separate from the live product above.
            </p>
            <Button
              asChild
              className="h-auto min-h-12 w-full max-w-sm touch-manipulation bg-primary px-4 py-3 text-sm leading-snug text-primary-foreground shadow-sm hover:bg-primary/90 sm:mx-auto"
            >
              <Link
                to="/early-access"
                aria-label={CTA_A11Y.designPartnerProgramme}
                className="inline-flex items-center justify-center gap-2"
              >
                <span aria-hidden className="inline-flex items-center gap-2">
                  Learn about the design-partner programme
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
                </span>
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="relative border-t border-border/70 bg-gradient-to-b from-muted/35 via-muted/20 to-background px-4 pb-16 pt-16 sm:px-6 md:pb-28 md:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <div className="rounded-2xl border-2 border-border/55 bg-card px-5 py-10 text-center shadow-[0_4px_28px_-10px_rgba(15,23,42,0.1)] sm:px-8 md:px-12 md:py-14 dark:border-border/60 dark:shadow-[0_4px_28px_-10px_rgba(0,0,0,0.35)]">
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-balance sm:text-3xl md:mb-6 md:text-4xl">
                Create your first signed document today
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground text-pretty sm:mb-9 md:mb-10 md:text-base">
                Upload a file, send it for signature, and track who signed and when.
              </p>
              <Button
                size="lg"
                className={`h-12 min-h-12 w-full touch-manipulation px-8 text-base shadow-md sm:w-auto sm:min-w-[13rem] sm:px-12 ${trialButtonClass}`}
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
              <p className="mt-7 border-t border-border/45 pt-6 text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:pt-7">
                Use the live product today.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-6" />
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Blockchain-backed proof, roles, and access control for document workflows.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Login
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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
    </div>
  );
};

export default ProductLanding;
