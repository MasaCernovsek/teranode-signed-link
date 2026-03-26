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
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exportOpen, setExportOpen] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [filterOwner, setFilterOwner] = useState<"all" | "mine" | "others">("all");
  const [viewMode, setViewMode] = useState<"list" | "branch">("list");

  const project = projects.find((p) => p.id === id);
  if (!project) return <div className="p-8">Project not found.</div>;

  const filteredEnvelopes = project.envelopes
    .filter((env) => {
      if (filterOwner === "mine") return env.owner === CURRENT_USER_COMPANY;
      if (filterOwner === "others") return env.owner !== CURRENT_USER_COMPANY;
      return true;
    })
    // Reverse: newer items on top
    .slice()
    .reverse();

  const myEnvelopeCount = project.envelopes.filter((e) => e.owner === CURRENT_USER_COMPANY).length;
  const othersEnvelopeCount = project.envelopes.filter((e) => e.owner !== CURRENT_USER_COMPANY).length;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
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

          {/* Top row: Parties + Ownership */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            {/* Left: Parties */}
            <div className="col-span-3">
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
            </div>

            {/* Centre: Envelope Timeline */}
            <div className="col-span-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Envelope Timeline
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {/* Branch / List toggle */}
                      <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
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
                      </div>
                      {/* Ownership Filter (list view only) */}
                      {viewMode === "list" && (
                        <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
                          <button
                            onClick={() => setFilterOwner("all")}
                            className={cn(
                              "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                              filterOwner === "all"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            All ({project.envelopes.length})
                          </button>
                          <button
                            onClick={() => setFilterOwner("mine")}
                            className={cn(
                              "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                              filterOwner === "mine"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Mine ({myEnvelopeCount})
                          </button>
                          <button
                            onClick={() => setFilterOwner("others")}
                            className={cn(
                              "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                              filterOwner === "others"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Others ({othersEnvelopeCount})
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "branch" ? (
                    <BranchingTimeline projectId={project.id} />
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
                              {/* Icon */}
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
                                {/* Title row */}
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="min-w-0">
                                    {isRestricted ? (
                                      <p className="text-sm font-medium text-muted-foreground italic">
                                        {env.name.split("—")[0].trim()}
                                        <span className="text-xs ml-1.5 text-muted-foreground/70">
                                          — Restricted Access
                                        </span>
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
                                  <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                                    {env.date}
                                  </span>
                                </div>

                                {/* Status + Progress */}
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

                                {/* Owner + Tags */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                    isMine
                                      ? "bg-primary/10 text-primary"
                                      : "bg-muted text-muted-foreground"
                                  )}>
                                    {isMine ? "Your Envelope" : env.owner}
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

                                {/* Actions for accessible envelopes */}
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
                          No envelopes found.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Ownership Timeline */}
            <div className="col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    Ownership Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.ownershipTimeline.map((transfer, i) => (
                    <div key={i} className="relative pl-5 pb-4 last:pb-0">
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
                  {project.ownershipTimeline.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">No transfers recorded.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
