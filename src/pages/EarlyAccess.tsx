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
  ListOrdered,
} from "lucide-react";

import featureActions from "@/assets/feature-actions.svg";
import featureSigningOrders from "@/assets/feature-signing-orders.svg";
import featurePin from "@/assets/feature-pin.svg";
import featureTags from "@/assets/feature-tags.svg";
import teranodeLogo from "@/assets/teranode-logo.svg";
import landingVerifyChain from "@/assets/landing-verify-chain.png";
import landingAddRecipients from "@/assets/landing-add-recipients.png";

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
      desc: "Send PDF or Word contracts, notices, and approvals for signature.",
      image: landingAddRecipients,
    },
    {
      icon: Link2,
      title: "Blockchain-backed timestamps",
      desc: "Anchor each signed document to an independent, tamper-proof record.",
      image: landingVerifyChain,
    },
    {
      icon: ListOrdered,
      title: "Custom signing flows",
      desc: "Set sequential or custom signing orders for recipients to review and sign documents.",
      image: featureSigningOrders,
    },
    {
      icon: Tag,
      title: "Tags and organisation",
      desc: "Organise documents by project, counterparty, and type for faster retrieval.",
      image: featureTags,
    },
    {
      icon: Bell,
      title: "Action dates and reminders",
      desc: "Track expirations, renewals, and key contract milestones with reminders.",
      image: featureActions,
    },
    {
      icon: Lock,
      title: "PIN-protected access",
      desc: "Add an extra security layer with a one-time PIN for sensitive documents.",
      image: featurePin,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src={teranodeLogo} alt="Teranode" className="h-7" />
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
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE SECTION ── light background, operational feel */}
      <section className="py-20 px-6 bg-background">
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

          {/* 3x2 on desktop, 2x3 tablet, 1x6 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {liveFeatures.map(({ icon: Icon, title, desc, image }) => (
              <Card key={title} className="border border-border overflow-hidden bg-background">
                <CardContent className="p-0">
                  <div className="bg-muted/30 p-4 flex items-center justify-center border-b border-border aspect-[4/3]">
                    <img
                      src={image}
                      alt={title}
                      className="max-w-full max-h-full object-contain rounded-md"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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

          <p className="text-center text-xs text-muted-foreground mb-2">
            Built for developers, main contractors, subcontractors, consultants, and multi-stakeholder project teams (including consortia and joint delivery teams).
          </p>
          <p className="text-center text-sm font-semibold text-primary">
            The app is up and running and used by legal teams today.
          </p>
        </div>
      </section>

      {/* ── FUTURE SECTION ── dark band, dramatic contrast */}
      <section className="py-20 px-6 bg-[hsl(230,30%,12%)] text-white">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-primary/15 px-3 py-1 rounded-full mb-6">
            In development with pilot users
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
            Built around real disputes, not just signatures.
          </h2>
          <p className="text-white/70 max-w-2xl mb-12 leading-relaxed">
            We're building Project Chain of Custody — a branching record of
            contracts, notices, payment applications, change orders, access and
            control events, and disputes across all project parties. Designed for
            multi-stakeholder construction projects, consortia, joint delivery
            teams, and downstream subcontracting relationships.
          </p>

          {/* Project Chain of Custody — hero visual */}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur mb-6 overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <GitBranch className="h-5 w-5 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Project Chain of Custody</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  A branching timeline of project documents and downstream
                  relationships — showing how contracts, variations, sub-contracts,
                  and payment applications flow across multiple organisations and
                  consortia members.
                </p>
              </div>
              <div className="md:col-span-3 p-6 flex items-center justify-center border-l border-white/10">
                <svg viewBox="0 0 520 220" className="w-full max-w-lg" aria-label="Branching contract timeline concept">
                  {/* Main track */}
                  <line x1="50" y1="70" x2="470" y2="70" stroke="hsl(263, 100%, 31%)" strokeWidth="2" strokeDasharray="4 2" opacity="0.4" />
                  {/* Branch lines */}
                  <line x1="170" y1="70" x2="290" y2="130" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
                  <line x1="170" y1="70" x2="290" y2="180" stroke="#f97316" strokeWidth="2" opacity="0.5" />
                  <line x1="290" y1="130" x2="380" y2="130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />
                  <line x1="380" y1="130" x2="470" y2="70" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />
                  <line x1="290" y1="180" x2="470" y2="70" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

                  {/* Nodes */}
                  <circle cx="50" cy="70" r="14" fill="hsl(263, 100%, 31%)" opacity="0.9" />
                  <text x="50" y="74" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">MC</text>
                  <text x="50" y="96" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Master</text>

                  <circle cx="170" cy="70" r="12" fill="hsl(263, 100%, 31%)" opacity="0.9" />
                  <text x="170" y="74" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">V1</text>
                  <text x="170" y="96" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Variation</text>

                  <circle cx="290" cy="130" r="11" fill="#3b82f6" />
                  <text x="290" y="134" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">SC</text>
                  <text x="290" y="152" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Sub-contract</text>

                  <circle cx="380" cy="130" r="9" fill="#3b82f6" opacity="0.7" />
                  <text x="380" y="134" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">SC2</text>
                  <text x="380" y="152" textAnchor="middle" fill="white" opacity="0.5" fontSize="7">Downstream</text>

                  <circle cx="290" cy="180" r="11" fill="#f97316" />
                  <text x="290" y="184" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PA</text>
                  <text x="290" y="200" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Payment App</text>

                  {/* Convergence */}
                  <circle cx="470" cy="70" r="20" fill="hsl(263, 100%, 31%)" opacity="0.15" />
                  <circle cx="470" cy="70" r="14" fill="hsl(263, 100%, 31%)" opacity="0.9" />
                  <text x="470" y="74" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PC</text>
                  <text x="470" y="96" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Completion</text>

                  {/* Org labels */}
                  <text x="50" y="22" textAnchor="middle" fill="white" opacity="0.35" fontSize="7">Apex Homes</text>
                  <text x="290" y="22" textAnchor="middle" fill="#3b82f6" opacity="0.5" fontSize="7">Hughes Bros</text>
                  <text x="380" y="22" textAnchor="middle" fill="#f97316" opacity="0.5" fontSize="7">JV Partner</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Dispute + Export */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
              <div className="p-5 flex items-center justify-center border-b border-white/10 min-h-[140px]">
                <svg viewBox="0 0 240 100" className="w-full max-w-[200px]" aria-label="Disputed document concept">
                  <rect x="10" y="10" width="100" height="80" rx="6" fill="transparent" stroke="#ef4444" strokeWidth="2" />
                  <text x="60" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Payment App #4</text>
                  <rect x="30" y="52" width="60" height="16" rx="3" fill="#ef4444" opacity="0.2" />
                  <text x="60" y="63" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="600">Disputed</text>
                  <rect x="130" y="20" width="100" height="60" rx="6" fill="transparent" stroke="white" strokeWidth="1" opacity="0.2" />
                  <text x="180" y="42" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">History preserved</text>
                  <text x="180" y="56" textAnchor="middle" fill="white" opacity="0.5" fontSize="8">Evidence locked</text>
                  <line x1="110" y1="50" x2="130" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              </div>
              <div className="p-5">
                <AlertTriangle className="h-4 w-4 text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1 text-white">Dispute Mode</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Surface contested documents, preserve history, and keep evidence intact. Built for adjudication, not just filing.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
              <div className="p-5 flex items-center justify-center border-b border-white/10 min-h-[140px]">
                <svg viewBox="0 0 240 100" className="w-full max-w-[200px]" aria-label="Evidence export concept">
                  <rect x="20" y="10" width="90" height="80" rx="6" fill="transparent" stroke="white" strokeWidth="1" opacity="0.3" />
                  <text x="65" y="32" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">Evidence Bundle</text>
                  <line x1="35" y1="42" x2="95" y2="42" stroke="white" strokeWidth="1" opacity="0.2" />
                  <text x="65" y="55" textAnchor="middle" fill="white" opacity="0.5" fontSize="7">✓ Audit trail</text>
                  <text x="65" y="67" textAnchor="middle" fill="white" opacity="0.5" fontSize="7">✓ Blockchain proof</text>
                  <text x="65" y="79" textAnchor="middle" fill="white" opacity="0.5" fontSize="7">✓ Chain of custody</text>
                  <rect x="140" y="30" width="80" height="40" rx="6" fill="hsl(263, 100%, 31%)" opacity="0.9" />
                  <text x="180" y="54" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Export PDF</text>
                  <path d="M 110 50 L 140 50" stroke="hsl(263, 100%, 31%)" strokeWidth="2" markerEnd="url(#arrow-dark)" />
                  <defs>
                    <marker id="arrow-dark" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 Z" fill="hsl(263, 100%, 31%)" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="p-5">
                <Download className="h-4 w-4 text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1 text-white">One-click evidence export</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Assemble a dispute bundle with full audit trail and blockchain verification — ready for adjudicators, lawyers, or mediators.
                </p>
              </div>
            </div>
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
                  <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
          <div className="flex items-center gap-3">
            <img src={teranodeLogo} alt="Teranode" className="h-6" />
            <span className="font-bold text-sm">Sign</span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Secure document workflows with blockchain-backed proof and role-based control.
          </p>
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
