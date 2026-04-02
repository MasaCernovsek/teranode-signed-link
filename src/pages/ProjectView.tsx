import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";
import BlockchainBadge from "@/components/BlockchainBadge";
import StatusBadge from "@/components/StatusBadge";
import DisputeExportModal from "@/components/DisputeExportModal";
import NewEnvelopeModal from "@/components/NewEnvelopeModal";
import AddParticipantModal from "@/components/AddParticipantModal";
import SubcontractorRequestModal from "@/components/SubcontractorRequestModal";
import BranchingTimeline from "@/components/BranchingTimeline";
import { projects, CURRENT_USER_COMPANY, type ControlTransferType } from "@/data/dummyData";
import {
  ArrowLeft, Link2, CheckCircle2, Clock, FileText,
  Building2, Calendar, Banknote, FileCheck, Shield,
  Plus, Lock, Eye, Download, Send, GitBranch, List,
  AlertTriangle, Activity, Moon, Sun, Users, GitMerge,
  ChevronDown, XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/hooks/useTheme";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exportOpen, setExportOpen] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [addParticipantOpen, setAddParticipantOpen] = useState(false);
  const [subRequestOpen, setSubRequestOpen] = useState(false);
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);
  const [filterOwner, setFilterOwner] = useState<"all" | "mine" | "others">("all");
  const [viewMode, setViewMode] = useState<"list" | "branch">("branch");
  const [filterParty, setFilterParty] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [subRequests, setSubRequests] = useState<{ action: string; date: string; type: "request" }[]>([]);
  const { theme, toggleTheme } = useThemeContext();

  const project = projects.find((p) => p.id === id);
  if (!project) return <div className="p-8">Project not found.</div>;

  // Project-level setting: who can create downstream contracts
  const downstreamPermission = "developer_and_main"; // "developer_only" | "developer_and_main" | "any_party"

  const currentUserParty = project.parties.find(p => p.name === CURRENT_USER_COMPANY);
  const currentUserRole = currentUserParty?.role ?? "";
  const canCreateDownstream = ["Developer", "Main Contractor"].includes(currentUserRole);
  const isSubcontractor = currentUserRole === "Subcontractor";

  const filteredEnvelopes = project.envelopes
    .filter((env) => {
      if (filterOwner === "mine") return env.owner === CURRENT_USER_COMPANY;
      if (filterOwner === "others") return env.owner !== CURRENT_USER_COMPANY;
      return true;
    })
    .filter((env) => {
      if (filterParty !== "all") return env.owner === filterParty;
      return true;
    })
    .filter((env) => {
      if (filterStatus !== "all") return env.status === filterStatus;
      return true;
    })
    .filter((env) => {
      if (filterType !== "all") return env.tags.some(t => t === filterType);
      return true;
    })
    .slice()
    .reverse();

  const myEnvelopeCount = project.envelopes.filter((e) => e.owner === CURRENT_USER_COMPANY).length;
  const othersEnvelopeCount = project.envelopes.filter((e) => e.owner !== CURRENT_USER_COMPANY).length;

  const uniqueParties = [...new Set(project.envelopes.map(e => e.owner))];
  const uniqueStatuses = [...new Set(project.envelopes.map(e => e.status))];
  const uniqueTypes = [...new Set(project.envelopes.flatMap(e => e.tags))];

  const isDisputed = project.status === "In Dispute";

  // Collect all disputed documents across all envelopes
  const allDisputedDocs = project.envelopes.flatMap(e =>
    e.documents.filter(d => d.disputedBy)
  );

  // Activity feed with 24h timestamps
  const activityFeed = [
    { action: `Apex Homes Ltd created "NDA"`, date: "14 Jan 2025, 10:15", type: "create" as const },
    { action: `All parties signed "NDA"`, date: "14 Jan 2025, 14:34", type: "sign" as const },
    { action: `"NDA" anchored to blockchain`, date: "14 Jan 2025, 14:40", type: "blockchain" as const },
    { action: `Apex Homes Ltd created "Master Contract (JCT D&B)"`, date: "20 Jan 2025, 14:30", type: "create" as const },
    { action: `All parties signed "Master Contract"`, date: "20 Jan 2025, 16:12", type: "sign" as const },
    { action: `"Master Contract" anchored to blockchain`, date: "20 Jan 2025, 16:18", type: "blockchain" as const },
    { action: `Hughes Bros Construction created "Change Order #1"`, date: "04 Mar 2025, 11:20", type: "create" as const },
    { action: `Hughes Bros Construction submitted "Payment Application #3"`, date: "01 Apr 2025, 09:00", type: "create" as const },
    { action: `Apex Homes Ltd issued "Pay-Less Notice"`, date: "10 Apr 2025, 09:42", type: "create" as const },
    { action: `"Pay-Less Notice" anchored to blockchain`, date: "10 Apr 2025, 09:45", type: "blockchain" as const },
    ...subRequests.map(r => ({ ...r, type: "request" as const })),
  ].reverse().slice(0, 8);

  // Helper: get parties with deduplicated multi-role display
  const getDisplayParties = () => {
    const partyMap = new Map<string, string[]>();
    project.parties.forEach(p => {
      const existing = partyMap.get(p.name);
      if (existing) {
        if (!existing.includes(p.role)) existing.push(p.role);
      } else {
        partyMap.set(p.name, p.roles ? [...p.roles] : [p.role]);
      }
    });
    return Array.from(partyMap.entries()).map(([name, roles]) => ({ name, roles }));
  };

  const displayParties = getDisplayParties();

  const handleSubRequest = (name: string, reason: string) => {
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, "0")} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][now.getMonth()]} ${now.getFullYear()}, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setSubRequests(prev => [...prev, {
      action: `${CURRENT_USER_COMPANY} requested new subcontractor: ${name} — (awaiting approval)`,
      date: dateStr,
      type: "request",
    }]);
  };

  // Document status badge colors
  const docStatusConfig = {
    Issued: { cls: "border-secondary/30 text-secondary bg-secondary/5", label: "Issued" },
    Acknowledged: { cls: "border-warning/30 text-warning bg-warning/5", label: "Acknowledged" },
    Signed: { cls: "border-accent/30 text-accent bg-accent/5", label: "Signed" },
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:underline">Dashboard</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{project.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AH</span>
            </div>
            <span className="text-sm font-medium text-foreground">Apex Homes Ltd</span>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </button>

          {/* Project Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
                <StatusBadge status={project.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {project.client}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5" /> {project.mainContractor}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {project.startDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Banknote className="h-3.5 w-3.5" /> {project.contractValue}
                </span>
                <Badge variant="outline" className="text-xs">{project.contractType}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="gap-2" onClick={() => setAddChoiceOpen(true)}>
                <Plus className="h-4 w-4" />
                Add to Project
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => setExportOpen(true)}
              >
                <Shield className="h-4 w-4" />
                Export Evidence
              </Button>
            </div>
          </div>

          {/* Two-step Add Choice Dialog */}
          <Dialog open={addChoiceOpen} onOpenChange={setAddChoiceOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add to Project</DialogTitle>
                <DialogDescription>Choose what you'd like to add to this project.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <button
                  onClick={() => { setAddChoiceOpen(false); setAddParticipantOpen(true); }}
                  className="w-full flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-colors text-left"
                >
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Add project participant</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Add a company to the project party list. No documents will be created yet.</p>
                  </div>
                </button>
                {canCreateDownstream ? (
                  <button
                    onClick={() => { setAddChoiceOpen(false); setEnvelopeOpen(true); }}
                    className="w-full flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/30 hover:bg-secondary/[0.02] transition-colors text-left"
                  >
                    <GitMerge className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Create downstream contract</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Create a new branch under your party in the contract timeline.</p>
                    </div>
                  </button>
                ) : (
                  <div className="w-full flex items-start gap-3 p-4 rounded-lg border border-border opacity-50 text-left">
                    <GitMerge className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Create downstream contract</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Not permitted for your role. Only Developer and Main Contractor roles can create downstream contracts.</p>
                    </div>
                  </div>
                )}
                {isSubcontractor && (
                  <button
                    onClick={() => { setAddChoiceOpen(false); setSubRequestOpen(true); }}
                    className="w-full flex items-start gap-3 p-4 rounded-lg border border-border hover:border-warning/30 hover:bg-warning/[0.02] transition-colors text-left"
                  >
                    <Send className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Request new subcontractor</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Submit a request for approval by the Developer or Main Contractor.</p>
                    </div>
                  </button>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Dispute Mode Banner */}
          {isDisputed && (
            <Card className="mb-5 border-destructive/30 bg-destructive/[0.03]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-destructive mb-1">Dispute Mode Active</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      This project has an active dispute. All document modifications are frozen and audit trails are being preserved for evidence.
                    </p>
                    <div className="space-y-1.5">
                      {allDisputedDocs.length > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Contested documents:</span>
                          <span className="font-medium text-foreground">{allDisputedDocs.map(d => d.name).join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Freeze scope:</span>
                        <Badge variant="outline" className="text-xs border-destructive/30 text-destructive bg-destructive/5">
                          Contested documents only
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/5"
                      onClick={() => setExportOpen(true)}
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Export Dispute Evidence Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TOP ROW: Parties (compact) + Activity (wider) */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            {/* Parties */}
            <Card className="col-span-4">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-semibold">Parties Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-4">
                {displayParties.map((party) => {
                  const isTerminated = project.terminatedParties?.includes(party.name);
                  return (
                    <div key={party.name} className={cn("flex items-center gap-2", isTerminated && "opacity-50")}>
                      <Building2 className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        isTerminated ? "text-destructive" : party.name === CURRENT_USER_COMPANY ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {party.name}
                          {party.name === CURRENT_USER_COMPANY && (
                            <span className="text-xs ml-1.5 text-primary font-semibold">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {party.roles.length > 1 ? party.roles.join(", ") : party.roles[0]}
                          {isTerminated && <span className="text-destructive ml-1">— Terminated</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Project Control Timeline + Activity Feed */}
            <Card className="col-span-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Project Control Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Control transfers */}
                <div className="space-y-3 mb-4">
                  {project.ownershipTimeline.map((transfer, i) => {
                    const isWithdrawn = transfer.transferType === "Control withdrawn";
                    return (
                      <div key={i} className="relative pl-5">
                        {i < project.ownershipTimeline.length - 1 && (
                          <div className="absolute left-[7px] top-5 bottom-0 w-px bg-primary/20" />
                        )}
                        <div className={cn(
                          "absolute left-0 top-1 h-3.5 w-3.5 rounded-full flex items-center justify-center",
                          isWithdrawn ? "bg-destructive/15" : "bg-primary/15"
                        )}>
                          {isWithdrawn ? (
                            <XCircle className="h-2.5 w-2.5 text-destructive" />
                          ) : (
                            <Link2 className="h-2.5 w-2.5 text-primary" />
                          )}
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-xs mb-0.5",
                          isWithdrawn
                            ? "border-destructive/20 text-destructive bg-destructive/5"
                            : "border-primary/20 text-primary bg-primary/5"
                        )}>
                          {transfer.transferType ?? "Control transfer"}
                        </Badge>
                        <p className="text-xs font-medium text-foreground leading-snug">{transfer.description}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {transfer.from} → {transfer.to}
                        </p>
                        {transfer.reason && (
                          <p className="text-xs text-destructive mt-0.5">Reason: {transfer.reason}</p>
                        )}
                        {transfer.resultingState && (
                          <p className="text-xs text-muted-foreground mt-0.5 italic">{transfer.resultingState}</p>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground">{transfer.date}</span>
                          {transfer.verified && (
                            <span className="text-xs text-accent flex items-center gap-0.5">
                              <CheckCircle2 className="h-2.5 w-2.5" /> On-chain verified
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Activity feed */}
                {activityFeed.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Activity</p>
                    <div className="space-y-2">
                      {activityFeed.slice(0, 6).map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          {item.type === "blockchain" ? (
                            <Link2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          ) : item.type === "sign" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          ) : item.type === "request" ? (
                            <Send className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                          ) : (
                            <Send className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="text-xs text-foreground leading-snug">{item.action}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {project.ownershipTimeline.length === 0 && activityFeed.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">No activity recorded.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Governing Contract Banner */}
          {project.governingContract && (
            <div className="mb-3 px-4 py-2.5 rounded-lg border border-primary/15 bg-primary/[0.02] flex items-center gap-3">
              <Shield className="h-4 w-4 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">
                  <span className="text-muted-foreground">Governing contract:</span>{" "}
                  {project.governingContract.name} ({project.governingContract.partyA} ↔ {project.governingContract.partyB})
                  <span className="text-muted-foreground"> — anchored to blockchain {project.governingContract.anchoredDate}</span>
                </p>
              </div>
              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
            </div>
          )}

          {/* FULL WIDTH: Contract Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Contract Timeline
                </CardTitle>
                <div className="flex items-center gap-2">
                  {/* Branch / List toggle */}
                  <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
                    <button
                      onClick={() => setViewMode("branch")}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1",
                        viewMode === "branch"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <GitBranch className="h-3 w-3" /> Branch
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1",
                        viewMode === "list"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <List className="h-3 w-3" /> List
                    </button>
                  </div>
                  {/* Filters (list view only) */}
                  {viewMode === "list" && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
                        <button
                          onClick={() => setFilterOwner("all")}
                          className={cn(
                            "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                            filterOwner === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          All ({project.envelopes.length})
                        </button>
                        <button
                          onClick={() => setFilterOwner("mine")}
                          className={cn(
                            "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                            filterOwner === "mine" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Mine ({myEnvelopeCount})
                        </button>
                        <button
                          onClick={() => setFilterOwner("others")}
                          className={cn(
                            "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                            filterOwner === "others" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Others ({othersEnvelopeCount})
                        </button>
                      </div>
                      <select
                        value={filterParty}
                        onChange={(e) => setFilterParty(e.target.value)}
                        className="text-xs bg-muted border-0 rounded-md px-2 py-1.5 text-foreground"
                      >
                        <option value="all">All Parties</option>
                        {uniqueParties.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="text-xs bg-muted border-0 rounded-md px-2 py-1.5 text-foreground"
                      >
                        <option value="all">All Statuses</option>
                        {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="text-xs bg-muted border-0 rounded-md px-2 py-1.5 text-foreground"
                      >
                        <option value="all">All Types</option>
                        {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "branch" ? (
                <BranchingTimeline projectId={project.id} />
              ) : project.envelopes.length === 0 ? (
                /* Empty state */
                <div className="py-12 text-center">
                  <FileText className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                  <h3 className="text-base font-semibold text-foreground mb-1">No documents yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                    Start by creating your first document — upload a contract, notice, or change order and send it for signature.
                  </p>
                  <Button onClick={() => setEnvelopeOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Create First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredEnvelopes.map((env) => {
                    const isMine = env.owner === CURRENT_USER_COMPANY;
                    const isRestricted = env.documents.some((d) => d.accessControl === "restricted") && !isMine;
                    const progressPct = env.totalSigners > 0 ? (env.completedCount / env.totalSigners) * 100 : 0;
                    const isTerminatedOwner = project.terminatedParties?.includes(env.owner);

                    // Check for disputed docs in this envelope
                    const disputedDocs = env.documents.filter(d => d.disputedBy);

                    // Visible-to parties for restricted docs
                    const visibleParties = env.documents.flatMap(d => d.parties);
                    const uniqueVisible = [...new Set(visibleParties)];

                    return (
                      <div
                        key={env.id}
                        className={cn(
                          "p-3 rounded-md border transition-colors",
                          isTerminatedOwner
                            ? "border-muted-foreground/20 bg-muted/30 opacity-60"
                            : isMine
                              ? "border-primary/15 bg-primary/[0.02] hover:bg-primary/5"
                              : "border-border hover:bg-muted/50"
                        )}
                      >
                        {isTerminatedOwner && (
                          <div className="flex items-center gap-1.5 mb-2 text-xs text-destructive">
                            <XCircle className="h-3 w-3" />
                            Party terminated — branch preserved for evidence only
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          {isRestricted ? (
                            <Lock className={cn("h-4 w-4 mt-0.5 shrink-0 text-muted-foreground")} />
                          ) : (
                            <Send className={cn("h-4 w-4 mt-0.5 shrink-0", isMine ? "text-primary" : "text-muted-foreground")} />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="min-w-0">
                                {isRestricted ? (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground italic">
                                      {env.name.split("—")[0].trim()}
                                      <span className="text-xs ml-1.5 text-muted-foreground/70">— Restricted Access</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight whitespace-normal">
                                      Visible to: {uniqueVisible.join(", ")}
                                    </p>
                                  </div>
                                ) : (
                                  <Link
                                    to={`/project/${project.id}/envelope/${env.id}`}
                                    className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                                  >
                                    {env.name}
                                  </Link>
                                )}
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 cursor-help">
                                    {env.date}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Full timestamp: {env.date}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              {/* Primary lifecycle status */}
                              {env.documents.map(d => d.documentStatus && (
                                <Badge
                                  key={d.id + "-lc"}
                                  variant="outline"
                                  className={cn("text-xs px-1.5 py-0 font-medium", docStatusConfig[d.documentStatus]?.cls)}
                                >
                                  {d.documentStatus}
                                </Badge>
                              ))}
                              {/* Dispute badges — separate layer */}
                              {disputedDocs.map(d => {
                                const disputeLabel = d.documentStatus === "Issued" ? "Challenged after issue"
                                  : d.documentStatus === undefined || d.documentStatus === "Acknowledged" ? "Under review"
                                  : "Disputed";
                                return (
                                  <Badge key={d.id + "-disp"} variant="outline" className="text-xs border-destructive/30 text-destructive bg-destructive/5 px-1.5 py-0">
                                    {disputeLabel}
                                  </Badge>
                                );
                              })}
                              {env.status === "In Progress" && (
                                <div className="flex items-center gap-2 flex-1">
                                  <Progress value={progressPct} className="h-1.5 flex-1 max-w-24" />
                                  <span className="text-xs text-muted-foreground">
                                    {env.completedCount}/{env.totalSigners} completed
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Disputed context lines */}
                            {disputedDocs.map(d => (
                              <div key={d.id + "-ctx"} className="flex items-center gap-1.5 mb-1">
                                <span className="text-xs text-destructive">
                                  Contested by {d.disputedBy} on {d.disputeDate}
                                </span>
                              </div>
                            ))}

                            {/* Visible to — full wrapping text */}
                            {isRestricted && uniqueVisible.length > 0 && (
                              <p className="text-xs text-muted-foreground leading-tight whitespace-normal mb-1">
                                Visible to: {uniqueVisible.join(", ")}
                              </p>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn(
                                "text-xs px-1.5 py-0.5 rounded font-medium",
                                isMine ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              )}>
                                {isMine ? "Your Document" : env.owner}
                              </span>
                              {isRestricted && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium flex items-center gap-0.5">
                                  <Lock className="h-2.5 w-2.5" /> Restricted
                                </span>
                              )}
                              {env.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {!isRestricted && (
                              <div className="flex items-center gap-2 mt-2">
                                <Link
                                  to={`/project/${project.id}/envelope/${env.id}`}
                                  className="text-xs text-secondary hover:underline flex items-center gap-1"
                                >
                                  <Eye className="h-3 w-3" /> View Details
                                </Link>
                                <span className="text-muted-foreground">·</span>
                                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                  <Download className="h-3 w-3" /> Download
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredEnvelopes.length === 0 && (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No documents match your filters.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      <DisputeExportModal
        open={exportOpen}
        onOpenChange={setExportOpen}
        documents={project.documents}
      />
      <NewEnvelopeModal
        open={envelopeOpen}
        onOpenChange={setEnvelopeOpen}
        parties={project.parties}
      />
      <AddParticipantModal
        open={addParticipantOpen}
        onOpenChange={setAddParticipantOpen}
      />
      <SubcontractorRequestModal
        open={subRequestOpen}
        onOpenChange={setSubRequestOpen}
        requestingParty={CURRENT_USER_COMPANY}
        onSubmit={handleSubRequest}
      />
    </div>
  );
};

export default ProjectView;
