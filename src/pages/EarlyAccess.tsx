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
  Shield,
  Clock,
  Users,
  Server,
  FileText,
  Link2,
  Tag,
  Bell,
  GitBranch,
  AlertTriangle,
  Download,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";

import landingVerifyChain from "@/assets/landing-verify-chain.png";
import landingAddRecipients from "@/assets/landing-add-recipients.png";
import landingActionDates from "@/assets/landing-action-dates.png";
import landingPinSecurity from "@/assets/landing-pin-security.png";
import landingTags from "@/assets/landing-tags.png";

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

  const liveFeatures = [
    {
      icon: FileText,
      title: "Upload and request signatures",
      desc: "Send PDF or Word contracts, notices, and approvals for signature with a clear audit of who signed and when.",
      image: landingAddRecipients,
      imageAlt: "Add recipients and assign signing roles in Teranode Sign",
      hero: true,
    },
    {
      icon: Link2,
      title: "Blockchain-backed timestamps",
      desc: "Every signed document is anchored to the blockchain, creating an independent, tamper-proof record of when it was executed.",
      image: landingVerifyChain,
      imageAlt: "Verify document signature on blockchain",
    },
    {
      icon: Tag,
      title: "Tags and document organisation",
      desc: "Organise documents by project, counterparty, and type. Find what you need without digging through email.",
      image: landingTags,
      imageAlt: "Organise envelopes with custom tags",
    },
    {
      icon: Bell,
      title: "Action dates and reminders",
      desc: "Set reminders for expirations, renewals, and important project milestones so nothing falls through the cracks.",
      image: landingActionDates,
      imageAlt: "Set action dates during envelope setup",
    },
    {
      icon: Lock,
      title: "PIN-protected document access",
      desc: "Add an extra layer of security by requiring a one-time PIN for recipients to access sensitive documents.",
      image: landingPinSecurity,
      imageAlt: "Require PIN for secure document access",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-primary">Teranode</span> Sign
          </span>
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

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Your contracts, signed and provable.{" "}
            <span className="text-primary">Built for construction disputes.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Teranode Sign is a working app you can use today to sign and anchor
            project documents to the blockchain — and we're now recruiting
            construction teams to shape our next features for disputes and chain
            of custody.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Button size="lg" onClick={scrollToSignup} className="text-base px-8">
              Request early access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8">
              <Link to="/">Start trial</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            For construction teams — developers, main contractors, and subcontractors.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/40 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Link2, label: "Blockchain-backed timestamps" },
            { icon: Shield, label: "Tamper-proof audit trail" },
            { icon: Users, label: "Role-based access & signing" },
            { icon: Server, label: "Cloud-hosted or on-premises" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What's live */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">
            Available in the app today
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What's live and ready now
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Teranode Sign is a real product, not a waitlist. Teams can sign up
            and start using it immediately to manage, sign, and timestamp
            construction documents.
          </p>

          {/* Hero feature card — Add Recipients */}
          <Card className="border border-border mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{liveFeatures[0].title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {liveFeatures[0].desc}
                  </p>
                </div>
                <div className="bg-muted/30 p-6 flex items-center justify-center">
                  <div className="rounded-lg border border-border shadow-sm overflow-hidden max-w-sm">
                    <img
                      src={liveFeatures[0].image}
                      alt={liveFeatures[0].imageAlt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supporting feature cards — 2x2 grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {liveFeatures.slice(1).map(({ icon: Icon, title, desc, image, imageAlt }) => (
              <Card key={title} className="border border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/30 p-4 flex items-center justify-center border-b border-border">
                    <div className="rounded-lg border border-border shadow-sm overflow-hidden max-w-[240px]">
                      <img
                        src={image}
                        alt={imageAlt}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm font-semibold text-primary">
            This is not a mockup — the app is already running and usable today.
          </p>
        </div>
      </section>

      {/* What we're building next */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
            In development with pilot users
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Built around real disputes, not just signatures.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            We're building Project Chain of Custody — a branching record of
            contracts, notices, payment applications, change orders, access and
            control events, and disputes across all project parties. It's
            designed for the way construction documentation actually works: messy,
            multi-party, and time-critical.
          </p>

          {/* Branching timeline — hero visual for future section */}
          <Card className="border border-border mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <GitBranch className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Contract Timeline</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A branching timeline of project documents and downstream
                    relationships — not a flat list, but a tree that reflects how
                    construction contracts actually flow.
                  </p>
                </div>
                <div className="md:col-span-3 bg-muted/40 p-6 flex items-center justify-center border-l border-border">
                  {/* SVG product concept — branching timeline */}
                  <svg viewBox="0 0 480 200" className="w-full max-w-md" aria-label="Branching contract timeline concept">
                    {/* Track lines */}
                    <line x1="60" y1="60" x2="420" y2="60" className="stroke-[hsl(var(--primary))]" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />
                    <line x1="180" y1="60" x2="300" y2="120" className="stroke-[hsl(var(--chart-2))]" strokeWidth="2" opacity="0.4" />
                    <line x1="180" y1="60" x2="300" y2="160" className="stroke-[hsl(var(--chart-3))]" strokeWidth="2" opacity="0.4" />
                    <line x1="300" y1="120" x2="420" y2="60" className="stroke-[hsl(var(--chart-2))]" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />
                    <line x1="300" y1="160" x2="420" y2="60" className="stroke-[hsl(var(--chart-3))]" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />

                    {/* Nodes */}
                    <circle cx="60" cy="60" r="12" className="fill-primary" opacity="0.9" />
                    <text x="60" y="64" textAnchor="middle" className="fill-primary-foreground" fontSize="8" fontWeight="bold">MC</text>
                    <text x="60" y="85" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Master</text>

                    <circle cx="180" cy="60" r="12" className="fill-primary" opacity="0.9" />
                    <text x="180" y="64" textAnchor="middle" className="fill-primary-foreground" fontSize="8" fontWeight="bold">V1</text>
                    <text x="180" y="85" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Variation</text>

                    <circle cx="300" cy="120" r="10" className="fill-[hsl(var(--chart-2))]" />
                    <text x="300" y="124" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">SC</text>
                    <text x="300" y="143" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Sub-contract</text>

                    <circle cx="300" cy="160" r="10" className="fill-[hsl(var(--chart-3))]" />
                    <text x="300" y="164" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PA</text>
                    <text x="300" y="183" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Payment App</text>

                    {/* Convergence node */}
                    <circle cx="420" cy="60" r="16" className="fill-primary" opacity="0.15" />
                    <circle cx="420" cy="60" r="12" className="fill-primary" opacity="0.9" />
                    <text x="420" y="64" textAnchor="middle" className="fill-primary-foreground" fontSize="7" fontWeight="bold">PC</text>
                    <text x="420" y="85" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Completion</text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute + Export cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Card className="border border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted/40 p-5 flex items-center justify-center border-b border-border min-h-[140px]">
                  {/* SVG — disputed document state */}
                  <svg viewBox="0 0 240 100" className="w-full max-w-[200px]" aria-label="Disputed document concept">
                    <rect x="10" y="10" width="100" height="80" rx="6" className="fill-background stroke-destructive" strokeWidth="2" />
                    <text x="60" y="40" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">Payment App #4</text>
                    <rect x="30" y="52" width="60" height="16" rx="3" className="fill-destructive" opacity="0.15" />
                    <text x="60" y="63" textAnchor="middle" className="fill-destructive" fontSize="7" fontWeight="600">Disputed</text>
                    <rect x="130" y="20" width="100" height="60" rx="6" className="fill-background stroke-border" strokeWidth="1.5" />
                    <text x="180" y="42" textAnchor="middle" className="fill-muted-foreground" fontSize="8">History preserved</text>
                    <text x="180" y="56" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Evidence locked</text>
                    <line x1="110" y1="50" x2="130" y2="50" className="stroke-destructive" strokeWidth="1.5" strokeDasharray="3 2" />
                  </svg>
                </div>
                <div className="p-5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Dispute Mode</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Surface contested documents, preserve history, and keep evidence intact. Built for adjudication, not just filing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted/40 p-5 flex items-center justify-center border-b border-border min-h-[140px]">
                  {/* SVG — evidence export */}
                  <svg viewBox="0 0 240 100" className="w-full max-w-[200px]" aria-label="Evidence export concept">
                    <rect x="20" y="10" width="90" height="80" rx="6" className="fill-background stroke-border" strokeWidth="1.5" />
                    <text x="65" y="32" textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="600">Evidence Bundle</text>
                    <line x1="35" y1="42" x2="95" y2="42" className="stroke-border" strokeWidth="1" />
                    <text x="65" y="55" textAnchor="middle" className="fill-muted-foreground" fontSize="7">✓ Audit trail</text>
                    <text x="65" y="67" textAnchor="middle" className="fill-muted-foreground" fontSize="7">✓ Blockchain proof</text>
                    <text x="65" y="79" textAnchor="middle" className="fill-muted-foreground" fontSize="7">✓ Chain of custody</text>
                    <rect x="140" y="30" width="80" height="40" rx="6" className="fill-primary" opacity="0.9" />
                    <text x="180" y="54" textAnchor="middle" className="fill-primary-foreground" fontSize="9" fontWeight="600">Export PDF</text>
                    <path d="M 110 50 L 140 50" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow)" />
                    <defs>
                      <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                        <path d="M 0 0 L 6 3 L 0 6 Z" className="fill-primary" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                <div className="p-5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">One-click evidence export</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Assemble a dispute bundle with full audit trail and blockchain verification — ready for adjudicators, lawyers, or mediators.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Teranode Sign */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
            Why Teranode Sign
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Secure and compliant workflows",
                desc: "Signing workflows designed for regulated industries — construction, infrastructure, and engineering.",
              },
              {
                icon: Link2,
                title: "Tamper-proof records",
                desc: "Blockchain verification means no one can alter a record after the fact. Every document has an independent proof of integrity.",
              },
              {
                icon: Server,
                title: "Full control over data",
                desc: "Choose cloud-hosted isolated environments or on-premises deployment. Your documents stay where you need them.",
              },
              {
                icon: Users,
                title: "Role-based access",
                desc: "Separate permissions for requestors, signers, and third parties. See only what you're cleared to see.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border border-border">
                <CardContent className="p-5 flex gap-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who this pilot is for */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
            Who this pilot is for
          </h2>
          <ul className="space-y-4">
            {[
              "Developers or main contractors dealing with payment disputes, adjudication, or contentious variations",
              "Commercial managers, QSs, legal teams, or project managers responsible for documentation and evidence",
              "Specialist subcontractors who need better visibility and proof of what was issued, signed, or disputed",
              "Teams willing to give 20–30 minutes of feedback per month during the pilot",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Signup form */}
      <section id="signup" className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">
            Join the pilot / early access
          </h2>
          <p className="text-muted-foreground text-center mb-8 text-sm leading-relaxed">
            This is for companies who want to try the app now and help shape the
            next set of dispute-focused features. We'll review every application
            personally.
          </p>

          {submitted ? (
            <Card className="border-accent">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Thanks for applying</h3>
                <p className="text-sm text-muted-foreground">
                  We'll review and get back to you within 2 working days.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Name</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Email</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Company</label>
                  <Input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Role</label>
                  <Input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Commercial Manager"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block">Company type</label>
                <Select
                  value={form.companyType}
                  onValueChange={(v) => setForm({ ...form, companyType: v })}
                >
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
                <label className="text-xs font-medium mb-1.5 block">
                  Biggest documentation pain
                </label>
                <Textarea
                  value={form.pain}
                  onChange={(e) => setForm({ ...form, pain: e.target.value })}
                  placeholder="What's the hardest part of managing project documents today?"
                  className="min-h-[80px]"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Apply for early access
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-sm">
              <span className="text-primary">Teranode</span> Sign
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              Secure document workflows with blockchain-backed proof and role-based control.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Login
            </Link>
            <a href="mailto:contact@teranode.io" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EarlyAccess;
