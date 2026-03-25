import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Upload } from "lucide-react";

interface NewEnvelopeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parties: { name: string; role: string }[];
}

const NewEnvelopeModal = ({ open, onOpenChange, parties }: NewEnvelopeModalProps) => {
  const [signers, setSigners] = useState<string[]>([""]);
  const [envelopeName, setEnvelopeName] = useState("");
  const [docType, setDocType] = useState("");

  const addSigner = () => setSigners([...signers, ""]);
  const removeSigner = (i: number) => setSigners(signers.filter((_, idx) => idx !== i));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Signature Request</DialogTitle>
          <DialogDescription>
            Create a new envelope with documents for signing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Envelope Name</Label>
            <Input
              placeholder="e.g. Change Order #3 — Additional Drainage Works"
              value={envelopeName}
              onChange={(e) => setEnvelopeName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Document Type</Label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="change-order">Change Order</SelectItem>
                <SelectItem value="payment">Payment Application</SelectItem>
                <SelectItem value="notice">Notice</SelectItem>
                <SelectItem value="nda">NDA</SelectItem>
                <SelectItem value="agreement">Agreement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Document</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 25MB</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Signers</Label>
            {signers.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Select
                  value={signers[i]}
                  onValueChange={(v) => {
                    const next = [...signers];
                    next[i] = v;
                    setSigners(next);
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select party..." />
                  </SelectTrigger>
                  <SelectContent>
                    {parties.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name} ({p.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {signers.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeSigner(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" className="gap-1.5" onClick={addSigner}>
              <Plus className="h-3.5 w-3.5" /> Add Signer
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)} className="gap-2">
            <Plus className="h-4 w-4" /> Create Envelope
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewEnvelopeModal;
