import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Clock,
  Users,
  Server,
  FileText,
  Link2,
  Tag,
  Bell,
  AlertTriangle,
  Download,
  CheckCircle2,
  ArrowRight,
  Lock,
  ListOrdered,
  ChevronRight,
  Eye,
  FileCheck,
  Layers,
  HardHat,
  Scale,
  Briefcase,
  Building2,
  Wrench,
  MessageSquare,
  Plus,
} from "lucide-react";

import teranodeLogo from "@/assets/teranode-logo.svg";
import { LandingHeroAnimatedSvg } from "@/components/LandingHeroAnimatedSvg";
import landingUploadDocs from "@/assets/landing-upload-docs.svg";
import landingDocVerification from "@/assets/landing-doc-verification.svg";
import landingSigningOrders from "@/assets/landing-signing-orders.svg";
import landingTags from "@/assets/landing-tags.svg";
import landingActions from "@/assets/landing-actions.svg";
import landingPin from "@/assets/landing-pin.svg";
import landingBranching from "@/assets/landing-branching.svg";
import { LandingMultipartyAnimatedSvg } from "@/components/LandingMultipartyAnimatedSvg";
import { LandingDisputeModeAnimatedSvg } from "@/components/LandingDisputeModeAnimatedSvg";
import landingEvidenceExport from "@/assets/landing-evidence-export.svg";
import landingPilotTeams from "@/assets/landing-pilot-teams.svg";
import { PDCC2AnimatedSvg } from "@/components/PDCC2AnimatedSvg";

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

const EarlyAccess = () => {
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
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToChainOfCustody = () => {
    document.getElementById("chain-of-custody")?.scrollIntoView({ behavior: "smooth" });
  };

  const SIGNUP_URL = "https://sign.products.teranode.group/signup";
  const DOCS_URL = "https://docs.teranode.group/teranode-sign";
  const LOGIN_URL = "https://sign.products.teranode.group/login";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode Sign" className="h-7" />
          </div>
          <div className="flex items-center gap-3">
            {!heroCtasInView && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[rgb(40,175,96)] bg-[rgb(40,175,96)] text-white hover:bg-white hover:text-slate-900"
                  asChild
                >
                  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">Start trial</a>
                </Button>
                <Button size="sm" onClick={scrollToSignup}>
                  Apply to join the pilot
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="ml-1 text-primary hover:bg-transparent hover:text-primary border border-transparent hover:border-primary"
              asChild
            >
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Login</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════ */}
      {/* ─── HERO ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-8 md:pb-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              For multi-party teams
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] mb-6">
              Your contracts, signed and provable.{" "}
              <span className="text-primary">Built for disputes.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Teranode Sign is a working app you can use today to sign and anchor
              important documents to the blockchain — and we’re now recruiting
              teams to shape our next features for disputes and chain of custody.
            </p>
            <div ref={heroCtasRef} className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <Button size="lg" onClick={scrollToSignup} className="text-base px-8">
                Apply to join the pilot <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[rgb(40,175,96)] bg-[rgb(40,175,96)] text-white hover:bg-white hover:text-slate-900 text-base px-8"
                asChild
              >
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">Start trial</a>
              </Button>
            </div>
          </div>

          {/* Hero product visual — larger, more prominent */}
          <Reveal>
            <div className="relative max-w-5xl mx-auto">
              <LandingHeroAnimatedSvg
                className="w-full h-auto relative z-10"
                title="Teranode Sign product interface"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      {/* (Trust strip removed — keep page tighter and avoid repeating proofs.) */}

      {/* ════════════════════════════════════════════ */}
      {/* ─── WHAT'S LIVE NOW ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Live now
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What's live and ready now
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Teranode Sign is a real product, not a waitlist. Teams can sign up
                and start using it immediately to manage, sign, and timestamp
                construction documents.
              </p>
            </div>
          </Reveal>

          {/* Feature 1 — Upload & sign */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Upload and request signatures</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Send PDF or Word contracts, notices, and approvals for signature.
                  Set up recipients, assign signing roles, and track every step of
                  the workflow in one place.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={landingUploadDocs} alt="Upload documents interface" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </Reveal>

          {/* Feature 2 — Document Verification (reversed) */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div className="order-2 md:order-1 rounded-xl overflow-hidden">
                <img src={landingDocVerification} alt="Document verification with blockchain proof" className="w-full h-auto" loading="lazy" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Link2 className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Document verification</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Verify any signed document against an independent, tamper-proof
                  blockchain record. Every signature and timestamp is provable
                  on-chain — no single party controls the proof.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Feature 3 — Custom signing flows */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ListOrdered className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom signing flows</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Set sequential or custom signing orders for recipients to review
                  and sign documents. Control who signs first, who approves, and
                  who receives a copy.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={landingSigningOrders} alt="Custom signing order setup" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </Reveal>

          {/* Feature 4 — Tags (reversed) */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div className="order-2 md:order-1 rounded-xl overflow-hidden">
                <img src={landingTags} alt="Organise documents with tags" className="w-full h-auto" loading="lazy" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Tag className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tags and organisation</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Organise documents by project, counterparty, and type for faster
                  retrieval. Build your own tagging structure to match how your
                  team works.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Feature 5 — Action dates */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Action dates and reminders</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Track expirations, renewals, and key contract milestones with
                  reminders. Never miss a deadline that could affect your
                  contractual position.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={landingActions} alt="Action dates and reminders" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </Reveal>

          {/* Feature 6 — PIN access (reversed) */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
              <div className="order-2 md:order-1 rounded-xl overflow-hidden">
                <img src={landingPin} alt="PIN-protected document access" className="w-full h-auto" loading="lazy" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">PIN-protected access</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Add an extra security layer with a one-time PIN for sensitive
                  documents. Control who can open, view, and interact with
                  confidential project records.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="text-center space-y-3 pt-4">
            <p className="text-sm font-semibold text-primary">
              Used by legal teams today — built for teams managing high-stakes project records.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[rgb(40,175,96)] bg-[rgb(40,175,96)] text-white hover:bg-white hover:text-slate-900"
                asChild
              >
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Start your trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Read the docs</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* ─── WHY THIS MATTERS (BRIDGE) ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 bg-muted/10 border-y border-border/70">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-[rgba(255,252,250,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(15,23,42,0.06)]">
              {/* Subtle “record” motif (very low-contrast, non-decorative) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 18px)",
                  maskImage: "radial-gradient(60% 55% at 75% 35%, black 0%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(60% 55% at 75% 35%, black 0%, transparent 70%)",
                }}
              />

              <div className="relative grid gap-10 px-7 py-12 md:px-12 md:py-16 md:grid-cols-12 md:items-start">
                {/* Left: eyebrow + headline */}
                <div className="md:col-span-4 md:pt-0.5">
                  <div className="mb-6 flex items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(40,175,96)]">
                      Why this matters
                    </p>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.12]">
                    We’ve built the foundations. Now we’re tackling the bigger problem.
                  </h2>
                </div>

                {/* Right: supporting copy + small pull-note */}
                <div className="relative md:col-span-8 md:pt-1 md:border-l md:border-border/40 md:pl-10">
                  {/* Ledger grid (ultra-subtle) behind the right column */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-0 hidden md:block opacity-[0.035]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(15,23,42,1) 0px, rgba(15,23,42,1) 1px, transparent 1px, transparent 120px)",
                      maskImage: "radial-gradient(72% 72% at 55% 35%, black 0%, transparent 82%)",
                      WebkitMaskImage: "radial-gradient(72% 72% at 55% 35%, black 0%, transparent 82%)",
                    }}
                  />

                  <div className="relative max-w-[58ch] space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                      Most tools help teams get documents signed. Far fewer help them keep a clear, provable
                      record of what happened across parties over time.
                    </p>
                    <p>
                      That gap matters when questions arise, positions harden, or evidence is tested. We’re
                      building beyond signing to make the record itself stronger.
                    </p>
                  </div>

                  <div className="relative mt-7 max-w-md rounded-2xl border border-border/90 bg-background/75 px-5 py-4 shadow-[0_1px_0_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <div className="flex items-start gap-3">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        <span className="mb-2 block">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-primary/10 text-primary">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                          Key shift
                        </span>
                        <span className="block mt-1">
                          Signing is the start. The record is the real infrastructure.
                        </span>
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-3 h-px w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(15,23,42,0.18) 0%, rgba(15,23,42,0.08) 45%, rgba(15,23,42,0) 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* ─── THE PROBLEM ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                The problem
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-[1.12]">
                Disputes start as documentation problems.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-xl">
                <p>
                  By the time a dispute becomes visible, the record is usually already fragmented.
                  Different parties are working from different contracts, different notice trails,
                  different approval histories, and different supporting documents.
                </p>
                <p>
                  What should be one provable project record becomes a scattered set of files across
                  email threads, shared drives, filing cabinets, and personal laptops. That is where
                  delay, duplication, doubt, and contest begin.
                </p>
                <p className="pt-2 text-foreground font-semibold">
                  Teranode Sign is built to keep a clearer, provable record across parties from the start,
                  so when pressure builds, the evidence is already structured and easier to trust.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              {/* Soft gradient backing (replace lane/grid + connector lines) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #FEE2E2 0%, rgba(251, 253, 254, 0) 100%)",
                }}
              />

              <div className="relative rounded-2xl p-5 md:p-6">
                <div className="space-y-4">
                  {/* Dominant card (now stacked above the supporting cards) */}
                  <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Fragmentation
                        </p>
                        <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                          <Users className="h-4 w-4" />
                        </span>
                        <h4 className="mt-3 text-base md:text-lg font-semibold tracking-tight">
                          Different parties, different records
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          Each organisation holds its own “version” — creating gaps,
                          duplication, and room for contest.
                        </p>
                      </div>
                      <div className="hidden sm:block shrink-0 text-right">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                          Evidence diverges
                        </span>
                      </div>
                    </div>

                    {/* Subtle red risk underline */}
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-destructive/30 via-destructive/10 to-transparent" />
                    <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
                      When a dispute lands, the record is already fragmented.
                    </p>
                  </div>

                  {/* Supporting cards (stacked underneath) */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border bg-card/70 p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </span>
                      <h5 className="mt-3 text-sm font-semibold tracking-tight">
                        Contracts in email attachments
                      </h5>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        Critical terms get buried in threads, forwards, and private inboxes.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card/70 p-5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                      <h5 className="mt-3 text-sm font-semibold tracking-tight">
                        Variations with no audit trail
                      </h5>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        Changes happen fast; proof of when and why gets lost.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card/70 p-5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                        <Clock className="h-4 w-4" />
                      </span>
                      <h5 className="mt-3 text-sm font-semibold tracking-tight">
                        Missed notice deadlines
                      </h5>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        A late notice can decide entitlement — even when work was real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ─── DARK SECTION — WHAT WE'RE BUILDING + CHAIN OF CUSTODY ─── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="chain-of-custody" className="py-24 md:py-32 px-6 bg-[hsl(228,30%,10%)]">
        <div className="max-w-7xl mx-auto">

          {/* Label */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary/30 border border-primary/40 px-4 py-1.5 rounded-full">
              <Clock className="h-3 w-3" /> In pilot development
            </span>
          </div>

          {/* ─── What we're building ─── */}
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                Built around real disputes, not just signatures
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-white">
                Project Chain of Custody
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                A shared, provable record of who issued, signed, received, challenged, or controlled a document over time.
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
                <h3 className="text-2xl font-bold mb-3 text-white">Built for multi-party workflows</h3>
                <p className="text-white/70 leading-relaxed">
                  Construction documentation moves across organisations. Teranode Sign maps records across
                  parties so each team can see its own branch with clarity and control.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 p-4 hover:border-primary/30 transition-colors duration-300">
                <LandingMultipartyAnimatedSvg className="w-full h-auto" />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex justify-center mb-20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-8 bg-white/10 text-white border-white/20 hover:bg-white/15"
                >
                  <Link to="/">Explore the prototype</Link>
                </Button>
                <Button size="lg" onClick={scrollToSignup} className="bg-primary text-white hover:bg-primary/80 text-base px-8">
                  Apply to join the pilot <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>

          {/* (CTA block removed — keep pilot conversion focused near the bottom.) */}

          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                Chain of custody features
              </h3>
              <p className="text-white/60 leading-relaxed">
                Built for contested records: surface disputed documents, preserve history across parties,
                and export a complete evidence bundle when it matters.
              </p>
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
                <p className="text-white/70 leading-relaxed mb-4">
                  Surface contested documents, preserve history, and keep evidence
                  intact. When a payment application or variation is disputed, the
                  entire chain of custody is frozen and protected — ready for
                  adjudication, not just filing.
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

          {/* Divider */}
          <div className="border-t border-white/10 mb-20" />

          {/* ─── PILOT FIT + APPLICATION ─── */}
          <Reveal>
            <div id="signup" className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[rgb(40,175,96)]">
                  Pilot application
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                  Apply to join the pilot programme
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  We’re onboarding a small number of teams to shape dispute-focused features like
                  chain of custody and evidence export. We review each application personally and
                  onboard teams that are a strong fit for the current pilot.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-10">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Best fit for</h3>
                  <ul className="space-y-2">
                    {[
                      "Teams dealing with payment disputes, adjudication, or contentious variations.",
                      "Projects where documentation ownership moves across organisations.",
                      "People responsible for evidence, compliance, or contractual records.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[rgb(40,175,96)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-sm font-semibold text-white mb-3">What you’ll get</h3>
                  <ul className="space-y-2">
                    {[
                      "Early access to pilot workflows and prototype updates.",
                      "A clearer, provable record across parties for contentious documents.",
                      "A direct feedback loop with the team building the product.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[rgb(40,175,96)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-white">Thanks for applying</h3>
                  <p className="text-sm text-white/70">
                    We'll review and get back to you within 2 working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-white/80">Name</label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-white/80">Email</label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-white/80">Company</label>
                      <Input
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-white/80">Role</label>
                      <Input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Commercial Manager"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/80">Company type</label>
                    <Select
                      value={form.companyType}
                      onValueChange={(v) => setForm({ ...form, companyType: v })}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                    <label className="text-xs font-medium mb-1.5 block text-white/80">
                      Biggest documentation pain
                    </label>
                    <Textarea
                      value={form.pain}
                      onChange={(e) => setForm({ ...form, pain: e.target.value })}
                      placeholder="What's the hardest part of managing project documents today?"
                      className="min-h-[80px] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/80" size="lg">
                    Join the pilot programme
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-10 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
