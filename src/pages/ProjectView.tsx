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
import BranchingTimeline from "@/components/BranchingTimeline";
import { projects, CURRENT_USER_COMPANY } from "@/data/dummyData";
import {
  ArrowLeft, Link2, CheckCircle2, Clock, FileText,
  Building2, Calendar, Banknote, FileCheck, Shield,
  Plus, Lock, Eye, Download, Send, GitBranch, List,
  AlertTriangle, Filter, Activity,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exportOpen, setExportOpen] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [filterOwner, setFilterOwner] = useState<"all" | "mine" | "others">("all");
  const [viewMode, setViewMode] = useState<"list" | "branch">("branch");
  const [filterParty, setFilterParty] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const project = projects.find((p) => p.id === id);
  if (!project) return <div className="p-8">Project not found.</div>;

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

  // Unique filter values
  const uniqueParties = [...new Set(project.envelopes.map(e => e.owner))];
  const uniqueStatuses = [...new Set(project.envelopes.map(e => e.status))];
  const uniqueTypes = [...new Set(project.envelopes.flatMap(e => e.tags))];

  // Dispute info for "In Dispute" projects
  const isDisputed = project.status === "In Dispute";
  const disputedEnvelopes = project.envelopes.filter(e =>
    e.documents.some(d => d.blockchainStatus === "verified" && d.statusNote?.toLowerCase().includes("disputed")) ||
    e.tags.includes("Notice")
  );

  // Activity feed (dummy)
  const activityFeed = [
    ...project.envelopes.slice().reverse().flatMap(env => [
      { action: `${env.owner} created "${env.name.split("—")[0].trim()}"`, date: env.date, type: "create" as const },
      ...(env.status === "Completed" ? [{ action: `All parties signed "${env.name.split("—")[0].trim()}"`, date: env.date, type: "sign" as const }] : []),
      ...env.documents.filter(d => d.blockchainStatus === "verified").map(d => ({
        action: `"${d.name}" anchored to blockchain`, date: d.timestamp || d.date, type: "blockchain" as const,
      })),
    ]),
  ].slice(0, 10);

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
              <Button
                onClick={() => setEnvelopeOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Envelope
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

          {/* Dispute Mode Banner */}
          {isDisputed && (
            <Card className="mb-5 border-destructive/30 bg-destructive/[0.03]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-destructive mb-1">Dispute Mode Active</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      This project has an active dispute. All document modifications are frozen and audit trails are being preserved for evidence.
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Contested document:</span>
                        <span className="font-medium text-foreground">Pay-Less Notice</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Raised by:</span>
                        <span className="font-medium text-foreground">Hughes Bros Construction</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Dispute date:</span>
                        <span className="font-medium text-foreground">10 Mar 2025</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Relevant documents:</span>
                        <span className="font-medium text-foreground">Payment Application #3, Pay-Less Notice, Change Order #1</span>
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

          {/* TOP ROW: Parties + Ownership side-by-side */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Parties */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Parties Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.parties.map((party) => (
                  <div key={party.name} className="flex items-start gap-2">
                    <div className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center mt-0.5 shrink-0",
                      party.name === CURRENT_USER_COMPANY
                        ? "bg-primary/15"
                        : "bg-muted"
                    )}>
                      <Building2 className={cn(
                        "h-3.5 w-3.5",
                        party.name === CURRENT_USER_COMPANY ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {party.name}
                        {party.name === CURRENT_USER_COMPANY && (
                          <span className="text-[10px] ml-1.5 text-primary font-semibold">(You)</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{party.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ownership Timeline + Activity Feed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Activity & Ownership
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Ownership transfers */}
                <div className="space-y-3 mb-4">
                  {project.ownershipTimeline.map((transfer, i) => (
                    <div key={i} className="relative pl-5">
                      {i < project.ownershipTimeline.length - 1 && (
                        <div className="absolute left-[7px] top-5 bottom-0 w-px bg-primary/20" />
                      )}
                      <div className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full bg-primary/15 flex items-center justify-center">
                        <Link2 className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <p className="text-xs font-medium text-foreground leading-snug">{transfer.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {transfer.from} → {transfer.to}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-muted-foreground">{transfer.date}</span>
                        {transfer.verified && (
                          <span className="text-[10px] text-accent flex items-center gap-0.5">
                            <CheckCircle2 className="h-2.5 w-2.5" /> On-chain verified
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity feed */}
                {activityFeed.length > 0 && (
                  <>
                    <div className="border-t pt-3">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Activity</p>
                      <div className="space-y-2">
                        {activityFeed.slice(0, 6).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                              {item.type === "blockchain" ? (
                                <Link2 className="h-2 w-2 text-accent" />
                              ) : item.type === "sign" ? (
                                <CheckCircle2 className="h-2 w-2 text-accent" />
                              ) : (
                                <Send className="h-2 w-2 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="text-[11px] text-foreground leading-snug">{item.action}</p>
                              <p className="text-[10px] text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {project.ownershipTimeline.length === 0 && activityFeed.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">No activity recorded.</p>
                )}
              </CardContent>
            </Card>
          </div>

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
                      {/* Advanced filters */}
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
                  <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary/40" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">No documents yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                    Start by creating your first envelope — upload a contract, notice, or change order and send it for signature.
                  </p>
                  <Button onClick={() => setEnvelopeOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Create First Envelope
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredEnvelopes.map((env) => {
                    const isMine = env.owner === CURRENT_USER_COMPANY;
                    const isRestricted = env.documents.some((d) => d.accessControl === "restricted") && !isMine;
                    const progressPct = env.totalSigners > 0 ? (env.completedCount / env.totalSigners) * 100 : 0;

                    return (
                      <div
                        key={env.id}
                        className={cn(
                          "p-3 rounded-md border transition-colors",
                          isMine
                            ? "border-primary/15 bg-primary/[0.02] hover:bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                            isMine ? "bg-primary/10" : "bg-muted"
                          )}>
                            {isRestricted ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Send className={cn("h-4 w-4", isMine ? "text-primary" : "text-muted-foreground")} />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="min-w-0">
                                {isRestricted ? (
                                  <p className="text-sm font-medium text-muted-foreground italic">
                                    {env.name.split("—")[0].trim()}
                                    <span className="text-xs ml-1.5 text-muted-foreground/70">— Restricted Access</span>
                                  </p>
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
                                  <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 cursor-help">
                                    {env.date}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Full timestamp: {env.date}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            <div className="flex items-center gap-3 mb-1.5">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-[10px] px-1.5 py-0 font-medium",
                                  env.status === "Completed"
                                    ? "border-accent/30 text-accent bg-accent/5"
                                    : env.status === "In Progress"
                                      ? "border-warning/30 text-warning bg-warning/5"
                                      : "border-muted-foreground/30 text-muted-foreground"
                                )}
                              >
                                {env.status}
                              </Badge>
                              {env.status === "In Progress" && (
                                <div className="flex items-center gap-2 flex-1">
                                  <Progress value={progressPct} className="h-1.5 flex-1 max-w-24" />
                                  <span className="text-[10px] text-muted-foreground">
                                    {env.completedCount}/{env.totalSigners} completed
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                isMine ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              )}>
                                {isMine ? "Your Document" : env.owner}
                              </span>
                              {isRestricted && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium flex items-center gap-0.5">
                                  <Lock className="h-2.5 w-2.5" /> Restricted
                                </span>
                              )}
                              {env.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {!isRestricted && (
                              <div className="flex items-center gap-2 mt-2">
                                <Link
                                  to={`/project/${project.id}/envelope/${env.id}`}
                                  className="text-[11px] text-secondary hover:underline flex items-center gap-1"
                                >
                                  <Eye className="h-3 w-3" /> View Details
                                </Link>
                                <span className="text-muted-foreground">·</span>
                                <button className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1">
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
    </div>
  );
};

export default ProjectView;
