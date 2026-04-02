import { TreeNode, LifecycleStatus } from "@/data/branchingData";
import { CURRENT_USER_COMPANY } from "@/data/dummyData";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Shield, UserPlus, UserMinus, ArrowRightLeft,
  CheckCircle2, Clock, FileText, AlertTriangle, Lock, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

const DocumentDetailModal = ({ node, open, onOpenChange, userRole }: DocumentDetailModalProps) => {
  const { toast } = useToast();
  if (!node) return null;

  const isSuperseded = node.lifecycleStatus === "Superseded";
  const currentStepIndex = lifecycleSteps.indexOf(node.lifecycleStatus);
  const canManageAccess = ["Developer", "Main Contractor"].includes(userRole ?? "");

  const handleAction = (action: string) => {
    toast({
      title: `${action} — confirmed`,
      description: `Action "${action}" recorded for ${node.name}.`,
    });
  };

  return (
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

        {/* Status history timeline */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status History</p>
          {isSuperseded ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <Clock className="h-3 w-3" />
              Superseded by {node.supersededBy ?? "a newer version"}
            </div>
          ) : (
            <div className="flex items-center gap-1">
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
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => handleAction("Give access")}>
                <UserPlus className="h-3 w-3" /> Give access
              </Button>
              <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => handleAction("Revoke access")}>
                <UserMinus className="h-3 w-3" /> Revoke access
              </Button>
              <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => handleAction("Transfer control")}>
                <ArrowRightLeft className="h-3 w-3" /> Transfer control
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => handleAction("Request access change")}>
              <UserPlus className="h-3 w-3" /> Request access change
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailModal;
