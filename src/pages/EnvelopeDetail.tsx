import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";
import BlockchainBadge from "@/components/BlockchainBadge";
import { projects, CURRENT_USER_COMPANY } from "@/data/dummyData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, FileText, CheckCircle2, Clock, Lock, Download,
  Share2, ClipboardList, Send, Building2, Link2,
} from "lucide-react";

const EnvelopeDetail = () => {
  const { id, envId } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  const envelope = project?.envelopes.find((e) => e.id === envId);

  if (!project || !envelope) return <div className="p-8">Envelope not found.</div>;

  const isMine = envelope.owner === CURRENT_USER_COMPANY;
  const progressPct = envelope.totalSigners > 0 ? (envelope.completedCount / envelope.totalSigners) * 100 : 0;

  // Dummy signers data
  const signers = envelope.documents[0]?.parties.flatMap((p) => {
    if (p === "All parties") {
      return project.parties.map((party) => ({
        name: party.name,
        role: party.role,
        signed: envelope.status === "Completed",
      }));
    }
    return [{ name: p, role: "Party", signed: envelope.status === "Completed" || envelope.completedCount > 0 }];
  }) || [];

  // Dummy audit trail
  const auditTrail = [
    { action: "Envelope created", by: envelope.owner, date: envelope.date, icon: Send },
    ...envelope.documents.map((doc) => ({
      action: `Document "${doc.name}" added`,
      by: doc.issuedBy || envelope.owner,
      date: doc.date,
      icon: FileText,
    })),
    ...(envelope.status === "Completed"
      ? [{ action: "All signatures collected — Envelope completed", by: "System", date: envelope.date, icon: CheckCircle2 }]
      : []),
    ...(envelope.documents.some(d => d.blockchainStatus === "verified")
      ? [{ action: "Blockchain anchor created", by: "System", date: envelope.date, icon: Link2 }]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:underline">Dashboard</Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/project/${project.id}`} className="text-secondary hover:underline">{project.name}</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Envelope</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AH</span>
            </div>
            <span className="text-sm font-medium text-foreground">Apex Homes Ltd</span>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 max-w-4xl overflow-y-auto">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {project.name}
          </button>

          {/* Envelope Header */}
          <Card className="mb-5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{envelope.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium",
                        envelope.status === "Completed" ? "border-accent/30 text-accent bg-accent/5" :
                        envelope.status === "In Progress" ? "border-warning/30 text-warning bg-warning/5" :
                        "border-muted-foreground/30 text-muted-foreground"
                      )}
                    >
                      {envelope.status}
                    </Badge>
                    {isMine && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Your Envelope</Badge>
                    )}
                    {envelope.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Building2 className="h-3.5 w-3.5" />
                <span>Owner: <span className="font-medium text-foreground">{envelope.owner}</span></span>
                <span className="mx-2">·</span>
                <span>Created: {envelope.date}</span>
              </div>
              {/* Progress */}
              <div className="flex items-center gap-3">
                <Progress value={progressPct} className="h-2 flex-1 max-w-xs" />
                <span className="text-sm text-muted-foreground">
                  {envelope.completedCount}/{envelope.totalSigners} signatures
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-5">
            {/* Documents */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents ({envelope.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {envelope.documents.map((doc) => {
                  const docIsMine = doc.owner === CURRENT_USER_COMPANY;
                  const docRestricted = doc.accessControl === "restricted" && !docIsMine;

                  return (
                    <div
                      key={doc.id}
                      className={cn(
                        "p-3 rounded-md border transition-colors",
                        docRestricted ? "bg-muted/30" : "hover:bg-muted/50 cursor-pointer"
                      )}
                      onClick={() => !docRestricted && navigate(`/project/${project.id}/document/${doc.id}`)}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {docRestricted ? (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                          ) : (
                            <FileText className="h-3.5 w-3.5 text-primary" />
                          )}
                          <span className="text-sm font-medium text-foreground">
                            {docRestricted ? `${doc.name} — Restricted` : doc.name}
                          </span>
                        </div>
                        <BlockchainBadge status={doc.blockchainStatus} />
                      </div>
                      {!docRestricted && (
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground ml-5">
                          <span>{doc.date}</span>
                          <span>·</span>
                          <span>{doc.issuedBy} → {doc.issuedTo}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Signer Progress + Audit Trail */}
            <div className="space-y-5">
              {/* Signers */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Signer Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {signers.map((signer, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-semibold",
                          signer.signed ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                        )}>
                          {signer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{signer.name}</p>
                          <p className="text-[10px] text-muted-foreground">{signer.role}</p>
                        </div>
                      </div>
                      {signer.signed ? (
                        <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
                          <CheckCircle2 className="h-3 w-3" /> Signed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-warning font-medium">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Audit Trail */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {auditTrail.map((entry, i) => (
                    <div key={i} className="relative pl-5">
                      {i < auditTrail.length - 1 && (
                        <div className="absolute left-[7px] top-5 bottom-0 w-px bg-border" />
                      )}
                      <div className="absolute left-0 top-0.5 h-3.5 w-3.5 rounded-full bg-primary/10 flex items-center justify-center">
                        <entry.icon className="h-2 w-2 text-primary" />
                      </div>
                      <p className="text-xs font-medium text-foreground">{entry.action}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.by} · {entry.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnvelopeDetail;
