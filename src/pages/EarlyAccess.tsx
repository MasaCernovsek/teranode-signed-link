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
  ChevronDown,
} from "lucide-react";

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
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            What's live and ready now
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Teranode Sign is a real product, not a waitlist. Teams can sign up
            and start using it immediately to manage, sign, and timestamp
            construction documents.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              {
                icon: FileText,
                title: "Upload and request signatures",
                desc: "Send PDF or Word contracts, notices, and approvals for signature with a clear audit of who signed and when.",
              },
              {
                icon: Link2,
                title: "Blockchain-backed timestamps",
                desc: "Every signed document is anchored to the blockchain, creating an independent, tamper-proof record of when it was executed.",
              },
              {
                icon: Tag,
                title: "Tags and document organisation",
                desc: "Organise documents by project, counterparty, and type. Find what you need without digging through email.",
              },
              {
                icon: Bell,
                title: "Action dates and reminders",
                desc: "Set reminders for expirations, renewals, and important project milestones so nothing falls through the cracks.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border border-border">
                <CardContent className="p-6 flex gap-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: GitBranch,
                title: "Contract Timeline",
                desc: "A branching timeline of project documents and downstream relationships — not a flat list, but a tree that reflects how construction contracts actually flow.",
              },
              {
                icon: AlertTriangle,
                title: "Dispute Mode",
                desc: "Surface contested documents, preserve history, and keep evidence intact. Built for adjudication, not just filing.",
              },
              {
                icon: Download,
                title: "One-click evidence export",
                desc: "Assemble a dispute bundle with full audit trail and blockchain verification — ready for adjudicators, lawyers, or mediators.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border border-border">
                <CardContent className="p-6">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
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
