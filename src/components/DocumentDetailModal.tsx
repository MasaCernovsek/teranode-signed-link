import { useState } from "react";
import { TreeNode, LifecycleStatus } from "@/data/branchingData";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Shield, UserPlus, UserMinus, ArrowRightLeft,
  CheckCircle2, Clock, FileText, AlertTriangle, Lock, Eye,
  Download, History, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DocumentDetailModalProps {
  node: TreeNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole?: string;
}

const lifecycleSteps: LifecycleStatus[] = ["Draft", "Issued", "Acknowledged", "Signed"];

const lifecycleBadge: Record<LifecycleStatus, { cls: string }> = {
  Draft: { cls: "border-muted-foreground/30 text-muted-foreground bg-muted" },
  Issued: { cls: "border-secondary/30 text-secondary bg-secondary/5" },
  Acknowledged: { cls: "border-warning/30 text-warning bg-warning/5" },
  Signed: { cls: "border-accent/30 text-accent bg-accent/5" },
  Superseded: { cls: "border-muted-foreground/30 text-muted-foreground bg-muted/50" },
};

function getDisputeLabel(node: TreeNode): string {
  if (node.lifecycleStatus === "Draft") return "Under review";
  if (node.lifecycleStatus === "Issued") return "Challenged after issue";
  return "Disputed";
}

const DUMMY_PARTIES = [
  "Apex Homes Ltd",
  "Hughes Bros Construction",
  "CoolAir Systems",
  "Riverside MEP Ltd",
  "SteelFix Engineering",
];

const DocumentDetailModal = ({ node, open, onOpenChange, userRole }: DocumentDetailModalProps) => {
  const [accessDialog, setAccessDialog] = useState<"give" | "revoke" | null>(null);
  const [transferOpen, setTransferOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState("");
  const [transferParty, setTransferParty] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const [transferDate, setTransferDate] = useState("");

  if (!node) return null;

  const isSuperseded = node.lifecycleStatus === "Superseded";
  const currentStepIndex = lifecycleSteps.indexOf(node.lifecycleStatus);
  const canManageAccess = ["Developer", "Main Contractor"].includes(userRole ?? "");

  const handleAccessConfirm = () => {
    const action = accessDialog === "give" ? "Access granted to" : "Access revoked from";
    toast.success(`${action} ${selectedParty || "selected party"}`, {
      description: `Action recorded for ${node.name}.`,
    });
    setSelectedParty("");
    setAccessDialog(null);
  };

  const handleTransferConfirm = () => {
    toast.success(`Control transferred to ${transferParty || "selected party"}`, {
      description: `Reason: ${transferReason || "—"}. Effective: ${transferDate || "Immediately"}.`,
    });
    setTransferParty("");
    setTransferReason("");
    setTransferDate("");
    setTransferOpen(false);
  };

  const scrollToAudit = () => {
    toast.info("Audit trail", { description: `Blockchain-anchored record for ${node.name}.` });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary shrink-0" />
              {node.name}
            </DialogTitle>
            <DialogDescription className="text-xs">
              {node.party} · {node.date}{node.time ? `, ${node.time}` : ""}
            </DialogDescription>
          </DialogHeader>

          {/* Status badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={cn("text-xs", lifecycleBadge[node.lifecycleStatus].cls)}>
              {node.lifecycleStatus}
            </Badge>
            {node.isDisputed && (
              <Badge variant="outline" className="text-xs border-destructive/30 text-destructive bg-destructive/5">
                {getDisputeLabel(node)}
              </Badge>
            )}
            {node.isMilestone && (
              <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">Milestone</Badge>
            )}
            {node.accessControl === "restricted" && (
              <Badge variant="outline" className="text-xs border-muted-foreground/30 text-muted-foreground bg-muted/50">
                <Lock className="h-2.5 w-2.5 mr-1" /> Restricted
              </Badge>
            )}
          </div>

          <Separator />

          {/* Status history */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status History</p>
            {isSuperseded ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                <Clock className="h-3 w-3" />
                Superseded by {node.supersededBy ?? "a newer version"}
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-wrap">
                {lifecycleSteps.map((step, i) => {
                  const reached = i <= currentStepIndex;
                  return (
                    <div key={step} className="flex items-center gap-1">
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                        reached ? lifecycleBadge[step].cls : "text-muted-foreground/40 bg-muted/30"
                      )}>
                        {reached && i === currentStepIndex ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : reached ? (
                          <CheckCircle2 className="h-3 w-3 opacity-50" />
                        ) : (
                          <Clock className="h-3 w-3 opacity-40" />
                        )}
                        {step}
                      </div>
                      {i < lifecycleSteps.length - 1 && (
                        <span className={cn("text-xs", reached ? "text-muted-foreground" : "text-muted-foreground/30")}>→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dispute information */}
          {node.isDisputed && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Dispute Information
                </p>
                <div className="space-y-1 text-xs">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Status:</span> {getDisputeLabel(node)}
                  </p>
                  {node.disputedBy && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Contested by:</span> {node.disputedBy}
                    </p>
                  )}
                  {node.disputeDate && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Date:</span> {node.disputeDate}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Visible to */}
          {node.accessControl === "restricted" && node.visibleTo && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Eye className="h-3 w-3" /> Access Control
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {node.visibleTo.map(party => (
                    <Badge key={party} variant="secondary" className="text-xs">{party}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Superseded by */}
          {node.supersededBy && (
            <>
              <Separator />
              <div className="text-xs text-muted-foreground italic flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                This document was superseded by <span className="font-medium text-foreground">{node.supersededBy}</span>
              </div>
            </>
          )}

          {/* Blockchain anchor */}
          <Separator />
          <div className="flex items-center gap-2 text-xs">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-muted-foreground">Blockchain anchored:</span>
            <span className="text-foreground font-medium">{node.date}{node.time ? `, ${node.time}` : ""}</span>
            <CheckCircle2 className="h-3 w-3 text-accent" />
          </div>

          {/* Actions */}
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Actions</p>
            {canManageAccess ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button size="sm" className="text-xs gap-1.5 justify-start" onClick={() => setViewerOpen(true)}>
                  <ExternalLink className="h-3 w-3" /> View document
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={() => setAccessDialog("give")}>
                  <UserPlus className="h-3 w-3" /> Give access
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={() => setAccessDialog("revoke")}>
                  <UserMinus className="h-3 w-3" /> Revoke access
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={() => setTransferOpen(true)}>
                  <ArrowRightLeft className="h-3 w-3" /> Transfer control
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={() => toast.success("Evidence package prepared", { description: `Download ready for ${node.name}.` })}>
                  <Download className="h-3 w-3" /> Download evidence
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={scrollToAudit}>
                  <History className="h-3 w-3" /> View audit trail
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button size="sm" className="text-xs gap-1.5 justify-start" onClick={() => setViewerOpen(true)}>
                  <ExternalLink className="h-3 w-3" /> View document
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={() => toast.info("Access change requested", { description: `Request submitted for ${node.name}.` })}>
                  <UserPlus className="h-3 w-3" /> Request access change
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start" onClick={scrollToAudit}>
                  <History className="h-3 w-3" /> View audit trail
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Document viewer placeholder */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> {node.name}
            </DialogTitle>
            <DialogDescription className="text-xs">Document preview</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-64 rounded-md border border-dashed border-muted-foreground/30 bg-muted/20">
            <div className="text-center space-y-2">
              <FileText className="h-10 w-10 text-muted-foreground/40 mx-auto" />
              <p className="text-sm text-muted-foreground">Document viewer placeholder</p>
              <p className="text-xs text-muted-foreground/60">Full document rendering will appear here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Give / Revoke access dialog */}
      <AlertDialog open={accessDialog !== null} onOpenChange={(o) => { if (!o) setAccessDialog(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              {accessDialog === "give" ? "Give access" : "Revoke access"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              {accessDialog === "give"
                ? `Select a party to grant access to "${node.name}".`
                : `Select a party to revoke access from "${node.name}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label className="text-xs text-muted-foreground mb-1.5 block">Party</Label>
            <Select value={selectedParty} onValueChange={setSelectedParty}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a party…" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_PARTIES.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs" onClick={() => setSelectedParty("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-xs" onClick={handleAccessConfirm} disabled={!selectedParty}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Transfer control dialog */}
      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-primary" /> Transfer control
            </DialogTitle>
            <DialogDescription className="text-xs">
              Transfer package control for "{node.name}". This does not reassign the Master Contract.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Transfer to party</Label>
              <Select value={transferParty} onValueChange={setTransferParty}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select a party…" />
                </SelectTrigger>
                <SelectContent>
                  {DUMMY_PARTIES.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Reason</Label>
              <Input className="text-sm" placeholder="e.g. Project restructuring" value={transferReason} onChange={e => setTransferReason(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Effective date</Label>
              <Input type="date" className="text-sm" value={transferDate} onChange={e => setTransferDate(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" className="text-xs" onClick={() => setTransferOpen(false)}>Cancel</Button>
            <Button size="sm" className="text-xs" onClick={handleTransferConfirm} disabled={!transferParty}>Confirm transfer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentDetailModal;
