import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface SubcontractorRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestingParty: string;
  onSubmit?: (name: string, reason: string) => void;
}

const SubcontractorRequestModal = ({ open, onOpenChange, requestingParty, onSubmit }: SubcontractorRequestModalProps) => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onSubmit?.(name, reason);
    setName("");
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Request New Subcontractor
          </DialogTitle>
          <DialogDescription>
            Submit a request for a new subcontractor. This will be sent to the Developer / Main Contractor for approval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Requesting party</p>
            <p className="text-sm font-medium text-foreground">{requestingParty}</p>
          </div>
          <div className="space-y-2">
            <Label>Proposed Subcontractor Name</Label>
            <Input
              placeholder="e.g. Taylor Plumbing Ltd"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Reason / Notes</Label>
            <Textarea
              placeholder="e.g. Additional plumbing works required for Phase 2 extension"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()} className="gap-2">
            <Send className="h-4 w-4" /> Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubcontractorRequestModal;
