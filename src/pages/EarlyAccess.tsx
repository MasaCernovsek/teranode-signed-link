import { useState } from "react";
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
} from "lucide-react";

import teranodeLogo from "@/assets/teranode-logo.svg";
import landingHero from "@/assets/landing-hero.svg";
import landingUploadDocs from "@/assets/landing-upload-docs.svg";
import landingDocVerification from "@/assets/landing-doc-verification.svg";
import landingSigningOrders from "@/assets/landing-signing-orders.svg";
import landingTags from "@/assets/landing-tags.svg";
import landingActions from "@/assets/landing-actions.svg";
import landingPin from "@/assets/landing-pin.svg";
import landingBranching from "@/assets/landing-branching.svg";
import landingMultiparty from "@/assets/landing-multiparty.svg";

/* ── Timeline node data for hover previews ── */
const timelineNodes = [
  {
    id: "master",
    label: "Master Contract (JCT D&B)",
    party: "All Parties",
    date: "20 Jan 2025",
    status: "Signed",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    borderColor: "hsl(230, 10%, 75%)",
    desc: "The governing agreement linking all downstream contracts and parties on this project.",
    x: 170, y: 30, w: 180, h: 58,
    lane: "shared",
  },
  {
    id: "amendment",
    label: "Amendment to SOW",
    party: "Developer",
    date: "14 Feb 2025",
    status: "Signed",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    borderColor: "#2150B5",
    desc: "Scope of work amendment issued by the developer to adjust project requirements.",
    x: 410, y: 25, w: 180, h: 58,
    lane: "developer",
  },
  {
    id: "revised-payment",
    label: "Revised Payment Schedule",
    party: "Developer",
    date: "20 Feb 2025",
    status: "Acknowledged",
    statusColor: "#CA8A04",
    statusBg: "#FEF9C3",
    borderColor: "#2150B5",
    desc: "Updated payment milestones following the scope amendment.",
    x: 660, y: 25, w: 180, h: 58,
    lane: "developer",
  },
  {
    id: "subcontract",
    label: "Subcontract Agreement",
    party: "Main Contractor",
    date: "3 Feb 2025",
    status: "Signed",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    borderColor: "#E8930C",
    desc: "Formal agreement between the main contractor and the groundworks subcontractor.",
    x: 410, y: 145, w: 180, h: 58,
    lane: "main-contractor",
  },
  {
    id: "payment-app",
    label: "Payment Application #4",
    party: "Main Contractor",
    date: "1 Apr 2025",
    status: "Issued",
    statusColor: "#2563EB",
    statusBg: "#DBEAFE",
    borderColor: "#EF4444",
    desc: "Interim payment claim submitted by the main contractor — currently disputed by the developer.",
    x: 660, y: 145, w: 180, h: 58,
    lane: "main-contractor",
    disputed: true,
  },
  {
    id: "site-notice",
    label: "Site Commencement Notice",
    party: "Groundworks Sub.",
    date: "5 Feb 2025",
    status: "Signed",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    borderColor: "#22A55D",
    desc: "Formal notification that site works have commenced under the subcontract.",
    x: 660, y: 265, w: 180, h: 58,
    lane: "groundworks",
  },
];

const EarlyAccess = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    companyType: "",
    pain: "",
    email: "",
  });

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode" className="h-7" />
            <span className="font-bold text-sm">Sign</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button size="sm" onClick={scrollToSignup}>
              Request early access
            </Button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════ */}
      {/* ─── HERO ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              For construction teams
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.1] mb-6">
              Your contracts, signed and provable.{" "}
              <span className="text-primary">Built for construction disputes.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Teranode Sign is a working app you can use today to sign and anchor
              project documents to the blockchain — and we're now recruiting
              construction teams to shape our next features for disputes and
              chain of custody.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Button size="lg" onClick={scrollToSignup} className="text-base px-8">
                Request early access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link to="/">Start trial</Link>
              </Button>
            </div>
            <button
              onClick={scrollToChainOfCustody}
              className="text-sm text-primary font-medium hover:underline flex items-center gap-1 transition-colors"
            >
              See how Project Chain of Custody works <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Hero product visual */}
          <div className="relative hidden md:block">
            <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
            <img
              src={landingHero}
              alt="Teranode Sign product interface"
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="border-y border-border bg-muted/30 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Link2, label: "Blockchain-backed timestamps" },
            { icon: Shield, label: "Tamper-proof audit trail" },
            { icon: Users, label: "Role-based access & signing" },
            { icon: Server, label: "Cloud-hosted or on-premises" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* ─── WHAT'S LIVE NOW ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Available in the app today
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

          {/* Feature 1 — Upload & sign */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Upload and request signatures</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Send PDF or Word contracts, notices, and approvals for signature.
                Set up recipients, assign signing roles, and track every step of
                the workflow in one place.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={landingUploadDocs} alt="Upload documents interface" className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          {/* Feature 2 — Document Verification (reversed) */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden">
              <img src={landingDocVerification} alt="Document verification with blockchain proof" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Document verification</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Verify any signed document against an independent, tamper-proof
                blockchain record. Every signature and timestamp is provable
                on-chain — no single party controls the proof.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </div>

          {/* Feature 3 — Custom signing flows */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ListOrdered className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom signing flows</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Set sequential or custom signing orders for recipients to review
                and sign documents. Control who signs first, who approves, and
                who receives a copy.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={landingSigningOrders} alt="Custom signing order setup" className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          {/* Feature 4 — Tags (reversed) */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden">
              <img src={landingTags} alt="Organise documents with tags" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tags and organisation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Organise documents by project, counterparty, and type for faster
                retrieval. Build your own tagging structure to match how your
                team works.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </div>

          {/* Feature 5 — Action dates */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Action dates and reminders</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Track expirations, renewals, and key contract milestones with
                reminders. Never miss a deadline that could affect your
                contractual position.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={landingActions} alt="Action dates and reminders" className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          {/* Feature 6 — PIN access (reversed) */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden">
              <img src={landingPin} alt="PIN-protected document access" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">PIN-protected access</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Add an extra security layer with a one-time PIN for sensitive
                documents. Control who can open, view, and interact with
                confidential project records.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </div>

          <div className="text-center space-y-3 pt-4">
            <p className="text-xs text-muted-foreground">
              Built for developers, main contractors, subcontractors, consultants, and multi-stakeholder project teams — including consortia and joint delivery teams.
            </p>
            <p className="text-sm font-semibold text-primary">
              The app is up and running and used by legal teams today.
            </p>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link to="/">Start your trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* ─── THE PROBLEM ─── */}
      {/* ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Construction disputes start as{" "}
              <span className="text-primary">documentation problems.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Different parties hold different slices of the record. Contracts,
                notices, variations, payment applications, and approvals live
                across multiple systems — email threads, shared drives, filing
                cabinets, and personal laptops.
              </p>
              <p>
                By the time a dispute escalates, the paper trail is scattered,
                incomplete, or contested. Different parties end up working from
                different versions of the story.
              </p>
              <p className="font-medium text-foreground">
                Teranode Sign keeps one provable record across all parties — so
                when disputes happen, the evidence is already in order.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileText, text: "Contracts in email attachments" },
              { icon: AlertTriangle, text: "Variations with no audit trail" },
              { icon: Clock, text: "Missed notice deadlines" },
              { icon: Users, text: "Different parties, different records" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="rounded-xl border border-border bg-card p-5 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-destructive" />
                </div>
                <span className="text-sm font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* ─── PROJECT CHAIN OF CUSTODY — CORE VISUAL STORY ─── */}
      {/* ════════════════════════════════════════════════════════ */}
      <section id="chain-of-custody" className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              The core differentiator
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
              Project Chain of Custody
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not just a contract — the entire project record. Every document,
              every party, every branch of downstream responsibility — tracked,
              time-stamped, and provable.
            </p>
          </div>

          {/* Interactive branching timeline */}
          <TooltipProvider delayDuration={200}>
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden mb-16">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Contract Timeline — Sample Project</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-muted rounded font-medium">Branch</span>
                  <span className="px-2 py-0.5 rounded">List</span>
                </div>
              </div>

              <div className="p-6 md:p-10 overflow-x-auto">
                <svg viewBox="0 0 900 340" className="w-full min-w-[700px]" aria-label="Project Chain of Custody — branching timeline">
                  {/* Party lane labels + dashed lines */}
                  <text x="10" y="57" fontSize="11" fontWeight="600" fill="hsl(230, 10%, 45%)" fontFamily="Inter, sans-serif">Shared</text>
                  <line x1="120" y1="57" x2="880" y2="57" stroke="hsl(230, 10%, 45%)" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />

                  <text x="10" y="147" fontSize="11" fontWeight="600" fill="#2150B5" fontFamily="Inter, sans-serif">Developer</text>
                  <line x1="120" y1="147" x2="880" y2="147" stroke="#2150B5" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />

                  <text x="10" y="237" fontSize="11" fontWeight="600" fill="#E8930C" fontFamily="Inter, sans-serif">Main Contractor</text>
                  <line x1="140" y1="237" x2="880" y2="237" stroke="#E8930C" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />

                  <text x="10" y="297" fontSize="11" fontWeight="600" fill="#22A55D" fontFamily="Inter, sans-serif">Groundworks Sub.</text>
                  <line x1="140" y1="297" x2="880" y2="297" stroke="#22A55D" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />

                  {/* Edges */}
                  <path d="M 350 57 C 380 57, 380 50, 410 50" stroke="#2150B5" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <path d="M 350 57 C 380 57, 380 170, 410 170" stroke="#E8930C" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <line x1="590" y1="50" x2="660" y2="50" stroke="#2150B5" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.25" />
                  <path d="M 590 170 C 620 170, 620 290, 660 290" stroke="#22A55D" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <line x1="590" y1="170" x2="660" y2="170" stroke="#E8930C" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.25" />

                  {/* Interactive nodes */}
                  {timelineNodes.map((node) => (
                    <Tooltip key={node.id}>
                      <TooltipTrigger asChild>
                        <g className="cursor-pointer" tabIndex={0} role="button" aria-label={node.label}>
                          {/* Disputed glow */}
                          {node.disputed && (
                            <rect x={node.x - 3} y={node.y - 3} width={node.w + 6} height={node.h + 6} rx="10" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.3" />
                          )}
                          {/* Card background */}
                          <rect
                            x={node.x} y={node.y} width={node.w} height={node.h} rx="8"
                            fill="white" stroke={node.borderColor} strokeWidth={node.disputed ? 2 : 1.5}
                            className="transition-all hover:filter hover:brightness-95"
                          />
                          {/* Title */}
                          <text x={node.x + 10} y={node.y + 18} fontSize="11" fontWeight="600" fill="hsl(230, 25%, 15%)" fontFamily="Inter, sans-serif">
                            {node.label.length > 24 ? node.label.substring(0, 24) + "…" : node.label}
                          </text>
                          {/* Party */}
                          <text x={node.x + 10} y={node.y + 32} fontSize="10" fill={node.borderColor === "hsl(230, 10%, 75%)" ? "hsl(230, 10%, 45%)" : node.borderColor} fontFamily="Inter, sans-serif" fontWeight="500">
                            {node.party}
                          </text>
                          {/* Date */}
                          <text x={node.x + 10} y={node.y + 45} fontSize="10" fill="hsl(230, 10%, 55%)" fontFamily="Inter, sans-serif">
                            {node.date}
                          </text>
                          {/* Status pill */}
                          <rect x={node.x + node.w - 70} y={node.y + node.h - 20} width={node.status === "Acknowledged" ? 66 : 44} height="14" rx="3" fill={node.statusBg} />
                          <text x={node.x + node.w - 66} y={node.y + node.h - 10} fontSize="8" fontWeight="600" fill={node.statusColor} fontFamily="Inter, sans-serif">
                            {node.status}
                          </text>
                          {/* Dispute pill */}
                          {node.disputed && (
                            <>
                              <rect x={node.x + 10} y={node.y + node.h - 20} width="44" height="14" rx="3" fill="#FEE2E2" />
                              <text x={node.x + 14} y={node.y + node.h - 10} fontSize="8" fontWeight="600" fill="#EF4444" fontFamily="Inter, sans-serif">Disputed</text>
                            </>
                          )}
                        </g>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs p-3">
                        <p className="font-semibold text-sm mb-1">{node.label}</p>
                        <p className="text-xs text-muted-foreground mb-1">{node.party} · {node.date}</p>
                        <p className="text-xs text-muted-foreground mb-2">{node.desc}</p>
                        <span
                          className="inline-block text-xs font-semibold px-2 py-0.5 rounded"
                          style={{ backgroundColor: node.statusBg, color: node.statusColor }}
                        >
                          {node.status}
                        </span>
                        {node.disputed && (
                          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded ml-1.5" style={{ backgroundColor: "#FEE2E2", color: "#EF4444" }}>
                            Disputed
                          </span>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </svg>
              </div>
            </div>
          </TooltipProvider>

          {/* Supporting text */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Multi-party, multi-branch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Contracts, variations, sub-contracts, and payment applications flow
                across multiple organisations — including consortia and joint
                delivery teams.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Control and visibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track who controls what, when access was granted or revoked, and
                which party holds responsibility at every point in the project.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto md:mx-0">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Provable and immutable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every document, every timestamp, every transfer of control is
                anchored to the blockchain. No party can alter the record after the fact.
              </p>
            </div>
          </div>

          {/* Branching + Multi-party SVG visuals */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-xl overflow-hidden border border-border">
              <img src={landingBranching} alt="Branching document relationships" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <img src={landingMultiparty} alt="Multi-party project collaboration" className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={scrollToSignup} className="text-base px-8">
              Join the pilot programme <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ─── DARK SECTION — PILOT / FUTURE / CONVERSION ZONE ─── */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-[hsl(228,30%,10%)]">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary/30 border border-primary/40 px-4 py-1.5 rounded-full">
              <Clock className="h-3 w-3" /> In development with pilot users
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-white">
              Built around real disputes, not just signatures.
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              We're building features designed for multi-stakeholder construction
              projects, consortia, joint delivery teams, and downstream
              subcontracting relationships — where disputes happen and evidence
              matters.
            </p>
          </div>

          {/* Dispute Mode */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Dispute Mode</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Surface contested documents, preserve history, and keep evidence
                intact. When a payment application or variation is disputed, the
                entire chain of custody is frozen and protected — ready for
                adjudication, not just filing.
              </p>
              <Button size="sm" onClick={scrollToSignup} className="bg-primary text-white hover:bg-primary/90">
                Learn more <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
              <svg viewBox="0 0 400 160" className="w-full" aria-label="Dispute mode — contested document">
                <rect x="10" y="10" width="170" height="70" rx="8" fill="transparent" stroke="#EF4444" strokeWidth="2" />
                <text x="25" y="32" fontSize="11" fontWeight="600" fill="white" fontFamily="Inter, sans-serif">Payment Application #4</text>
                <text x="25" y="47" fontSize="10" fill="#E8930C" fontFamily="Inter, sans-serif">Main Contractor</text>
                <text x="25" y="62" fontSize="10" fill="white" opacity="0.5" fontFamily="Inter, sans-serif">1 Apr 2025</text>
                <rect x="25" y="66" width="55" height="14" rx="3" fill="#FEE2E2" />
                <text x="30" y="76" fontSize="8" fontWeight="600" fill="#EF4444" fontFamily="Inter, sans-serif">Disputed</text>

                <path d="M 180 45 L 220 45" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="200" y="40" textAnchor="middle" fontSize="7" fill="white" opacity="0.4">freeze</text>

                <rect x="220" y="15" width="170" height="60" rx="8" fill="transparent" stroke="white" strokeWidth="1" opacity="0.25" />
                <text x="235" y="35" fontSize="10" fill="white" opacity="0.7" fontFamily="Inter, sans-serif">History preserved</text>
                <text x="235" y="50" fontSize="10" fill="white" opacity="0.7" fontFamily="Inter, sans-serif">Evidence locked</text>
                <text x="235" y="65" fontSize="10" fill="white" opacity="0.7" fontFamily="Inter, sans-serif">Chain of custody intact</text>

                <rect x="10" y="100" width="380" height="50" rx="8" fill="hsl(0, 60%, 20%)" opacity="0.3" />
                <text x="25" y="122" fontSize="10" fill="#FCA5A5" fontFamily="Inter, sans-serif" fontWeight="500">⚠ Freeze scope: contested documents only</text>
                <text x="25" y="138" fontSize="9" fill="white" opacity="0.5" fontFamily="Inter, sans-serif">Disputed by Developer — 10 Apr 2025</text>
              </svg>
            </div>
          </div>

          {/* Evidence Export — reversed */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-white/5 p-6 md:p-8">
              <svg viewBox="0 0 400 160" className="w-full" aria-label="One-click evidence export">
                <rect x="10" y="10" width="160" height="140" rx="8" fill="transparent" stroke="white" strokeWidth="1" opacity="0.2" />
                <text x="25" y="32" fontSize="11" fontWeight="600" fill="white" fontFamily="Inter, sans-serif">Evidence Bundle</text>
                <line x1="25" y1="40" x2="155" y2="40" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <text x="25" y="58" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ All project documents</text>
                <text x="25" y="74" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ Full audit trail</text>
                <text x="25" y="90" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ Blockchain proof</text>
                <text x="25" y="106" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ Chain of custody</text>
                <text x="25" y="122" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ Dispute timeline</text>
                <text x="25" y="138" fontSize="10" fill="white" opacity="0.6" fontFamily="Inter, sans-serif">✓ Party access log</text>

                <path d="M 185 80 L 230 80" stroke="hsl(270, 80%, 60%)" strokeWidth="2" markerEnd="url(#arrow-export-v2)" />
                <defs>
                  <marker id="arrow-export-v2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(270, 80%, 60%)" />
                  </marker>
                </defs>

                <rect x="240" y="50" width="150" height="60" rx="8" fill="hsl(270, 80%, 60%)" />
                <text x="315" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Inter, sans-serif">Download PDF</text>
                <text x="315" y="92" textAnchor="middle" fontSize="9" fill="white" opacity="0.7" fontFamily="Inter, sans-serif">Ready for adjudicators</text>
              </svg>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Download className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">One-click evidence export</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Assemble a complete dispute bundle with full audit trail, blockchain
                verification, chain of custody record, and party access log — ready
                for adjudicators, lawyers, or mediators. One click, one PDF.
              </p>
              <Button size="sm" onClick={scrollToSignup} className="bg-primary text-white hover:bg-primary/90">
                View pilot features <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-20" />

          {/* ─── WHO THIS PILOT IS FOR ─── */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Who this pilot is for
              </h2>
              <p className="text-white/60 leading-relaxed">
                We're looking for construction teams who deal with real documentation
                challenges and want to help shape a better solution.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
              {[
                {
                  title: "Developers & main contractors",
                  desc: "Dealing with payment disputes, adjudication, or contentious variations across multiple subcontracts.",
                },
                {
                  title: "Commercial managers & QSs",
                  desc: "Responsible for documentation accuracy, evidence preparation, and contract compliance across project phases.",
                },
                {
                  title: "Legal teams & project managers",
                  desc: "Managing dispute readiness, audit trails, and ensuring documentation meets evidential standards.",
                },
                {
                  title: "Specialist subcontractors",
                  desc: "Need better visibility into what was issued, signed, or disputed — and provable records of their own submissions.",
                },
                {
                  title: "Consortia & joint delivery teams",
                  desc: "Multi-stakeholder structures where documentation ownership and control flow across organisational boundaries.",
                },
                {
                  title: "Teams willing to give feedback",
                  desc: "20–30 minutes per month to share what works, what doesn't, and what matters most for your workflows.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold text-sm text-white mb-2">{title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={scrollToSignup} className="bg-primary text-white hover:bg-primary/90">
                Apply for early access <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                <a href="mailto:contact@teranode.io">Talk to us</a>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-20" />

          {/* ─── WHY TERANODE SIGN ─── */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Why Teranode Sign
              </h2>
              <p className="text-white/60 leading-relaxed">
                Security, auditability, and deployment flexibility — built for
                regulated industries and multi-stakeholder workflows.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Secure and compliant",
                  desc: "Signing workflows designed for regulated industries — construction, infrastructure, and engineering.",
                },
                {
                  icon: Link2,
                  title: "Tamper-proof records",
                  desc: "Blockchain verification means no one can alter a record after the fact.",
                },
                {
                  icon: Server,
                  title: "Full control over data",
                  desc: "Choose cloud-hosted isolated environments or on-premises deployment.",
                },
                {
                  icon: Users,
                  title: "Role-based access",
                  desc: "Separate permissions for requestors, signers, and third parties.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3 mx-auto">
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-2">{title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SIGNUP FORM ─── */}
          <div id="signup" className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                Join the pilot / early access
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                This is for companies who want to try the app now and help shape
                the next set of dispute-focused features. We'll review every
                application personally.
              </p>
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
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" size="lg">
                  Apply for early access
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-10 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={teranodeLogo} alt="Teranode" className="h-6" />
            <span className="font-bold text-sm">Sign</span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Secure document workflows with blockchain-backed proof and role-based control.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Login</Link>
            <a href="mailto:contact@teranode.io" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EarlyAccess;
