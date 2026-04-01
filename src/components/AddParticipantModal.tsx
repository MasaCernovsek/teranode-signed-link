import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users } from "lucide-react";

interface AddParticipantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddParticipantModal = ({ open, onOpenChange }: AddParticipantModalProps) => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Add Project Participant
          </DialogTitle>
          <DialogDescription>
            Add a company to the project party list. No documents will be created yet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              placeholder="e.g. Taylor Plumbing Ltd"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                <SelectItem value="Consultant">Consultant</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Primary Contact Name</Label>
            <Input
              placeholder="e.g. John Taylor"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              type="email"
              placeholder="e.g. john@taylorplumbing.co.uk"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Participant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipantModal;
