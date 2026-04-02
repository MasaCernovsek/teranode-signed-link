// Branching timeline data for the document tree view

export type LifecycleStatus = "Draft" | "Issued" | "Acknowledged" | "Signed" | "Superseded";

export interface TreeNode {
  id: string;
  name: string;
  party: string;
  partyTrack: number; // 0 = shared, 1 = Apex, 2 = Hughes, 3 = RM Groundworks
  date: string;
  time?: string;
  lifecycleStatus: LifecycleStatus;
  parentIds: string[]; // supports convergence (multiple parents)
  isMilestone?: boolean;
  isDisputed?: boolean;
  disputedBy?: string;
  disputeDate?: string;
  blockingNote?: string;
  column: number; // horizontal position (left to right, 0-based)
  accessControl?: "public" | "restricted";
  visibleTo?: string[];
  supersededBy?: string; // name of the newer document that supersedes this one
}

export interface PartyTrack {
  name: string;
  color: string; // tailwind-friendly color class
  colorHex: string;
  trackIndex: number;
  terminated?: boolean;
  terminatedDate?: string;
}

export const partyTracks: PartyTrack[] = [
  { name: "Shared", color: "text-muted-foreground", colorHex: "#8E9196", trackIndex: 0 },
  { name: "Apex Homes Ltd", color: "text-secondary", colorHex: "#2150B5", trackIndex: 1 },
  { name: "Hughes Bros Construction", color: "text-warning", colorHex: "#E8930C", trackIndex: 2 },
  { name: "RM Groundworks Ltd", color: "text-accent", colorHex: "#22A55D", trackIndex: 3 },
];

export const branchingNodes: TreeNode[] = [
  // ROOT — Column 0 (shared)
  {
    id: "master-contract",
    name: "Master Contract (JCT D&B)",
    party: "All Parties",
    partyTrack: 0,
    date: "20 Jan 2025",
    lifecycleStatus: "Signed",
    parentIds: [],
    column: 0,
    accessControl: "public",
  },
  // BRANCH A — Apex Homes (track 1)
  {
    id: "amendment-sow",
    name: "Amendment to SOW",
    party: "Apex Homes Ltd",
    partyTrack: 1,
    date: "14 Feb 2025",
    lifecycleStatus: "Signed",
    parentIds: ["master-contract"],
    column: 1,
    accessControl: "public",
  },
  {
    id: "revised-payment-schedule",
    name: "Revised Payment Schedule",
    party: "Apex Homes Ltd",
    partyTrack: 1,
    date: "20 Feb 2025",
    lifecycleStatus: "Acknowledged",
    parentIds: ["amendment-sow"],
    column: 2,
    accessControl: "public",
  },
  {
    id: "change-order-3",
    name: "Change Order #3",
    party: "Apex Homes Ltd",
    partyTrack: 1,
    date: "10 Mar 2025",
    lifecycleStatus: "Issued",
    parentIds: ["revised-payment-schedule"],
    column: 3,
    accessControl: "public",
  },
  // Superseded example — old version of Change Order #3
  {
    id: "change-order-3-v1",
    name: "Change Order #3 (v1)",
    party: "Apex Homes Ltd",
    partyTrack: 1,
    date: "8 Mar 2025",
    lifecycleStatus: "Superseded",
    parentIds: ["revised-payment-schedule"],
    column: 3,
    accessControl: "public",
    supersededBy: "Change Order #3",
  },
  // BRANCH B — Hughes Bros (track 2)
  {
    id: "subcontract-agreement",
    name: "Subcontract Agreement (RM Groundworks)",
    party: "Hughes Bros Construction",
    partyTrack: 2,
    date: "3 Feb 2025",
    lifecycleStatus: "Signed",
    parentIds: ["master-contract"],
    column: 1,
    accessControl: "restricted",
    visibleTo: ["Hughes Bros Construction", "RM Groundworks Ltd"],
  },
  {
    id: "payment-app-4",
    name: "Payment Application #4",
    party: "Hughes Bros Construction",
    partyTrack: 2,
    date: "1 Apr 2025",
    lifecycleStatus: "Issued",
    parentIds: ["subcontract-agreement"],
    column: 3,
    accessControl: "restricted",
    visibleTo: ["Hughes Bros Construction", "Apex Homes Ltd"],
    isDisputed: true,
    disputedBy: "Apex Homes Ltd",
    disputeDate: "10 Apr 2025",
  },
  {
    id: "pay-less-notice-tree",
    name: "Pay-Less Notice",
    party: "Apex Homes → Hughes Bros",
    partyTrack: 2,
    date: "10 Apr 2025",
    lifecycleStatus: "Signed",
    isDisputed: true,
    disputedBy: "Hughes Bros Construction",
    disputeDate: "12 Apr 2025",
    parentIds: ["payment-app-4"],
    column: 4,
    accessControl: "public",
  },
  // BRANCH B.1 — RM Groundworks (track 3)
  {
    id: "site-commencement",
    name: "Site Commencement Notice",
    party: "RM Groundworks Ltd",
    partyTrack: 3,
    date: "5 Feb 2025",
    lifecycleStatus: "Signed",
    parentIds: ["subcontract-agreement"],
    column: 2,
    accessControl: "restricted",
    visibleTo: ["Hughes Bros Construction", "RM Groundworks Ltd"],
  },
  {
    id: "variation-request-1",
    name: "Variation Request #1",
    party: "RM Groundworks Ltd",
    partyTrack: 3,
    date: "22 Mar 2025",
    lifecycleStatus: "Issued",
    parentIds: ["site-commencement"],
    column: 3,
    accessControl: "restricted",
    visibleTo: ["Hughes Bros Construction", "RM Groundworks Ltd"],
  },
  // CONVERGENCE — Column 5 (shared milestone)
  {
    id: "practical-completion",
    name: "Practical Completion Certificate",
    party: "All Parties",
    partyTrack: 0,
    date: "Not Yet Issued",
    lifecycleStatus: "Draft",
    parentIds: ["change-order-3", "pay-less-notice-tree"],
    isMilestone: true,
    blockingNote: "Requires: Change Order #3 (pending) + Payment Application #4 (complete)",
    column: 5,
    accessControl: "public",
  },
];
