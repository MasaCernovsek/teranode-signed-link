import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";
import BlockchainBadge from "@/components/BlockchainBadge";
import { projects, CURRENT_USER_COMPANY } from "@/data/dummyData";
import {
  ArrowLeft, CheckCircle2, Download, Share2, ClipboardList,
  Link2, Building2, Calendar, Hash, Lock,
} from "lucide-react";

const DocumentDetail = () => {
  const { id, docId } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  // Search in both top-level documents and envelope documents
  let document = project?.documents.find((d) => d.id === docId);
  if (!document) {
    for (const env of project?.envelopes || []) {
      const found = env.documents.find((d) => d.id === docId);
      if (found) { document = found; break; }
    }
  }

  if (!project || !document) return <div className="p-8">Document not found.</div>;

  const isMine = document.owner === CURRENT_USER_COMPANY;
  const isRestricted = document.accessControl === "restricted" && !isMine;

  if (isRestricted) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-secondary hover:underline">Dashboard</Link>
              <span className="text-muted-foreground">/</span>
              <Link to={`/project/${project.id}`} className="text-secondary hover:underline">{project.name}</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Restricted</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">AH</span>
              </div>
              <span className="text-sm font-medium text-foreground">Apex Homes Ltd</span>
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <Card className="max-w-md">
              <CardContent className="p-8 text-center">
                <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">Access Restricted</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  This document is owned by <span className="font-medium text-foreground">{document.owner}</span> and you do not have permission to view its details.
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Contact the document owner or your project administrator to request access.
                </p>
                <Button variant="outline" onClick={() => navigate(`/project/${project.id}`)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Project
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

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
            <span className="text-foreground font-medium">{document.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AH</span>
            </div>
            <span className="text-sm font-medium text-foreground">Apex Homes Ltd</span>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 max-w-3xl">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {project.name}
          </button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                    <Badge variant="outline">{document.type}</Badge>
                    {isMine && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                        Your Document
                      </Badge>
                    )}
                  </div>
                  <BlockchainBadge status={document.blockchainStatus} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Owner info */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Owned by:</span>
                <span className="text-xs font-medium text-foreground">{document.owner}</span>
                {isMine && <Badge variant="secondary" className="text-[10px] ml-auto">You</Badge>}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Issued by
                  </p>
                  <p className="text-sm font-medium">{document.issuedBy}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Issued to
                  </p>
                  <p className="text-sm font-medium">{document.issuedTo}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Timestamp
                  </p>
                  <p className="text-sm font-medium">{document.timestamp}</p>
                </div>
              </div>

              {/* Blockchain Anchor */}
              {document.hash && (
                <div className="border rounded-lg p-4 bg-accent/5 border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Blockchain Anchor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono flex items-center gap-1.5">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      {document.hash}
                    </code>
                    <span className="text-sm text-accent flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified on BSV blockchain
                    </span>
                  </div>
                </div>
              )}

              {/* Status */}
              {document.statusNote && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{document.statusNote} ✓</span>
                </div>
              )}

              {/* Linked Documents */}
              {document.parentDocId && (
                <div className="border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-2">Linked Documents</p>
                  <Link
                    to={`/project/${project.id}/document/${document.parentDocId}`}
                    className="text-sm font-medium text-secondary hover:underline flex items-center gap-1.5"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    → {document.parentDocName} (parent document)
                  </Link>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 border-t">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" className="gap-2">
                  <ClipboardList className="h-4 w-4" /> View Audit Trail
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DocumentDetail;
