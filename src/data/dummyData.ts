export interface Party {
  name: string;
  role: string;
  roles?: string[]; // supports multiple roles for same entity
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  parties: string[];
  blockchainStatus: "verified" | "pending" | "missing";
  issuedBy?: string;
  issuedTo?: string;
  timestamp?: string;
  hash?: string;
  statusNote?: string;
  parentDocId?: string;
  parentDocName?: string;
  owner: string;
  accessControl: "public" | "restricted";
  disputedBy?: string;
  disputeDate?: string;
  disputeReason?: string;
  documentStatus?: "Issued" | "Acknowledged" | "Signed"; // new tri-state
}

export interface Envelope {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "Draft" | "Voided";
  completedCount: number;
  totalSigners: number;
  tags: string[];
  date: string;
  documents: Document[];
  owner: string;
}

export type ControlTransferType = "Control transfer" | "Assignment" | "Novation" | "Access granted" | "Control withdrawn";

export interface OwnershipTransfer {
  from: string;
  to: string;
  date: string;
  description: string;
  verified: boolean;
  transferType?: ControlTransferType;
  reason?: string; // e.g. "Termination / Insolvency"
}

export interface Project {
  id: string;
  name: string;
  client: string;
  mainContractor: string;
  startDate: string;
  contractValue: string;
  contractType: string;
  documentCount: number;
  partyCount: number;
  lastActivity: string;
  status: "Active" | "In Dispute" | "Completed";
  parties: Party[];
  documents: Document[];
  envelopes: Envelope[];
  ownershipTimeline: OwnershipTransfer[];
  governingContract?: {
    name: string;
    partyA: string;
    partyB: string;
    anchoredDate: string;
  };
  terminatedParties?: string[]; // party names whose branches are terminated
}

// Current logged-in user's company
export const CURRENT_USER_COMPANY = "Apex Homes Ltd";

export const projects: Project[] = [
  {
    id: "riverside",
    name: "Riverside Residential — Phase 2",
    client: "Apex Homes Ltd",
    mainContractor: "Hughes Bros Construction",
    startDate: "14 Jan 2025",
    contractValue: "£2.4M",
    contractType: "JCT Design & Build",
    documentCount: 6,
    partyCount: 3,
    lastActivity: "10 Apr 2025",
    status: "Active",
    governingContract: {
      name: "Master Contract (JCT D&B)",
      partyA: "Apex Homes Ltd",
      partyB: "Hughes Bros Construction",
      anchoredDate: "20 Jan 2025, 16:18",
    },
    parties: [
      { name: "Apex Homes Ltd", role: "Developer" },
      { name: "Hughes Bros Construction", role: "Main Contractor" },
      { name: "RM Groundworks Ltd", role: "Subcontractor" },
    ],
    terminatedParties: [],
    envelopes: [
      {
        id: "env-nda",
        name: "NDA — Mutual Confidentiality Agreement for Riverside Phase 2",
        status: "Completed",
        completedCount: 3,
        totalSigners: 3,
        tags: ["NDA"],
        date: "14 Jan 2025, 14:34",
        owner: "Apex Homes Ltd",
        documents: [
          {
            id: "nda",
            name: "NDA",
            type: "Agreement",
            date: "14 Jan 2025",
            parties: ["All parties"],
            blockchainStatus: "verified",
            issuedBy: "Apex Homes Ltd",
            issuedTo: "All parties",
            timestamp: "14 Jan 2025, 10:15",
            hash: "0x8b2f...a41e",
            statusNote: "Executed by all parties",
            owner: "Apex Homes Ltd",
            accessControl: "public",
            documentStatus: "Signed",
          },
        ],
      },
      {
        id: "env-master",
        name: "Master Contract (JCT D&B) — Riverside Residential Phase 2 Main Works",
        status: "Completed",
        completedCount: 2,
        totalSigners: 2,
        tags: ["Contract"],
        date: "20 Jan 2025, 16:12",
        owner: "Apex Homes Ltd",
        documents: [
          {
            id: "master-contract",
            name: "Master Contract (JCT D&B)",
            type: "Contract",
            date: "20 Jan 2025",
            parties: ["All parties"],
            blockchainStatus: "verified",
            issuedBy: "Apex Homes Ltd",
            issuedTo: "Hughes Bros Construction",
            timestamp: "20 Jan 2025, 14:30",
            hash: "0x1c4d...b73f",
            statusNote: "Fully executed",
            owner: "Apex Homes Ltd",
            accessControl: "public",
            documentStatus: "Signed",
          },
        ],
      },
      {
        id: "env-co1",
        name: "Change Order #1 — Additional Foundation Works Due to Ground Conditions",
        status: "Completed",
        completedCount: 2,
        totalSigners: 2,
        tags: ["Change Order"],
        date: "04 Mar 2025, 11:20",
        owner: "Hughes Bros Construction",
        documents: [
          {
            id: "change-order-1",
            name: "Change Order #1",
            type: "Change Order",
            date: "4 Mar 2025",
            parties: ["Apex Homes", "Hughes Bros"],
            blockchainStatus: "verified",
            issuedBy: "Hughes Bros Construction",
            issuedTo: "Apex Homes Ltd",
            timestamp: "04 Mar 2025, 11:20",
            hash: "0x5e9a...c28d",
            statusNote: "Approved and signed",
            owner: "Hughes Bros Construction",
            accessControl: "public",
            documentStatus: "Signed",
          },
        ],
      },
      {
        id: "env-pa3",
        name: "Payment Application #3 — March 2025 Interim Valuation",
        status: "In Progress",
        completedCount: 1,
        totalSigners: 2,
        tags: ["Payment"],
        date: "01 Apr 2025, 09:00",
        owner: "Hughes Bros Construction",
        documents: [
          {
            id: "payment-app-3",
            name: "Payment Application #3",
            type: "Payment",
            date: "1 Apr 2025",
            parties: ["Hughes Bros"],
            blockchainStatus: "verified",
            issuedBy: "Hughes Bros Construction",
            issuedTo: "Apex Homes Ltd",
            timestamp: "01 Apr 2025, 09:00",
            hash: "0x7d3b...e51a",
            statusNote: "Submitted for review",
            owner: "Hughes Bros Construction",
            accessControl: "restricted",
            documentStatus: "Issued",
            disputedBy: "Apex Homes Ltd",
            disputeDate: "10 Apr 2025",
            disputeReason: "Valuation disputed — quantities not agreed",
          },
        ],
      },
      {
        id: "env-pln",
        name: "Pay-Less Notice — Response to Payment Application #3",
        status: "Completed",
        completedCount: 1,
        totalSigners: 1,
        tags: ["Notice"],
        date: "10 Apr 2025, 09:42",
        owner: "Apex Homes Ltd",
        documents: [
          {
            id: "pay-less-notice",
            name: "Pay-Less Notice",
            type: "Notice",
            date: "10 Apr 2025",
            parties: ["Apex Homes"],
            blockchainStatus: "verified",
            issuedBy: "Apex Homes Ltd",
            issuedTo: "Hughes Bros Construction Ltd",
            timestamp: "10 Apr 2025, 09:42",
            hash: "0x3f7a...d92c",
            statusNote: "Served within contractual window",
            parentDocId: "payment-app-3",
            parentDocName: "Payment Application #3",
            owner: "Apex Homes Ltd",
            accessControl: "public",
            documentStatus: "Signed",
            disputedBy: "Hughes Bros Construction",
            disputeDate: "12 Apr 2025",
            disputeReason: "Notice timing contested",
          },
        ],
      },
      {
        id: "env-co2",
        name: "Change Order #2 — Revised Electrical Layout for Units 4–8",
        status: "In Progress",
        completedCount: 0,
        totalSigners: 2,
        tags: ["Change Order"],
        date: "Pending",
        owner: "Hughes Bros Construction",
        documents: [
          {
            id: "change-order-2",
            name: "Change Order #2",
            type: "Change Order",
            date: "—",
            parties: ["Apex Homes"],
            blockchainStatus: "pending",
            issuedBy: "Hughes Bros Construction",
            issuedTo: "Apex Homes Ltd",
            timestamp: "Pending",
            statusNote: "Awaiting signature from Apex Homes",
            owner: "Hughes Bros Construction",
            accessControl: "restricted",
            documentStatus: "Acknowledged",
          },
        ],
      },
      {
        id: "env-sub",
        name: "Subcontractor Agreement — RM Groundworks Ltd Piling & Excavation Package",
        status: "Completed",
        completedCount: 2,
        totalSigners: 2,
        tags: ["Contract", "Subcontract"],
        date: "28 Jan 2025, 15:15",
        owner: "RM Groundworks Ltd",
        documents: [
          {
            id: "sub-agreement",
            name: "Subcontractor Agreement",
            type: "Contract",
            date: "28 Jan 2025",
            parties: ["Hughes Bros", "RM Groundworks"],
            blockchainStatus: "verified",
            issuedBy: "Hughes Bros Construction",
            issuedTo: "RM Groundworks Ltd",
            timestamp: "28 Jan 2025, 15:15",
            hash: "0x2a8c...f19b",
            statusNote: "Fully executed",
            owner: "RM Groundworks Ltd",
            accessControl: "restricted",
            documentStatus: "Signed",
          },
        ],
      },
    ],
    documents: [
      {
        id: "nda",
        name: "NDA",
        type: "Agreement",
        date: "14 Jan 2025",
        parties: ["All parties"],
        blockchainStatus: "verified",
        issuedBy: "Apex Homes Ltd",
        issuedTo: "All parties",
        timestamp: "14 Jan 2025, 10:15",
        hash: "0x8b2f...a41e",
        statusNote: "Executed by all parties",
        owner: "Apex Homes Ltd",
        accessControl: "public",
        documentStatus: "Signed",
      },
      {
        id: "master-contract",
        name: "Master Contract (JCT D&B)",
        type: "Contract",
        date: "20 Jan 2025",
        parties: ["All parties"],
        blockchainStatus: "verified",
        issuedBy: "Apex Homes Ltd",
        issuedTo: "Hughes Bros Construction",
        timestamp: "20 Jan 2025, 14:30",
        hash: "0x1c4d...b73f",
        statusNote: "Fully executed",
        owner: "Apex Homes Ltd",
        accessControl: "public",
        documentStatus: "Signed",
      },
      {
        id: "change-order-1",
        name: "Change Order #1",
        type: "Change Order",
        date: "4 Mar 2025",
        parties: ["Apex Homes", "Hughes Bros"],
        blockchainStatus: "verified",
        issuedBy: "Hughes Bros Construction",
        issuedTo: "Apex Homes Ltd",
        timestamp: "04 Mar 2025, 11:20",
        hash: "0x5e9a...c28d",
        statusNote: "Approved and signed",
        owner: "Hughes Bros Construction",
        accessControl: "public",
        documentStatus: "Signed",
      },
      {
        id: "payment-app-3",
        name: "Payment Application #3",
        type: "Payment",
        date: "1 Apr 2025",
        parties: ["Hughes Bros"],
        blockchainStatus: "verified",
        issuedBy: "Hughes Bros Construction",
        issuedTo: "Apex Homes Ltd",
        timestamp: "01 Apr 2025, 09:00",
        hash: "0x7d3b...e51a",
        statusNote: "Submitted for review",
        owner: "Hughes Bros Construction",
        accessControl: "restricted",
        documentStatus: "Issued",
        disputedBy: "Apex Homes Ltd",
        disputeDate: "10 Apr 2025",
        disputeReason: "Valuation disputed — quantities not agreed",
      },
      {
        id: "pay-less-notice",
        name: "Pay-Less Notice",
        type: "Notice",
        date: "10 Apr 2025",
        parties: ["Apex Homes"],
        blockchainStatus: "verified",
        issuedBy: "Apex Homes Ltd",
        issuedTo: "Hughes Bros Construction Ltd",
        timestamp: "10 Apr 2025, 09:42",
        hash: "0x3f7a...d92c",
        statusNote: "Served within contractual window",
        parentDocId: "payment-app-3",
        parentDocName: "Payment Application #3",
        owner: "Apex Homes Ltd",
        accessControl: "public",
        documentStatus: "Signed",
        disputedBy: "Hughes Bros Construction",
        disputeDate: "12 Apr 2025",
        disputeReason: "Notice timing contested",
      },
      {
        id: "change-order-2",
        name: "Change Order #2",
        type: "Change Order",
        date: "—",
        parties: ["Apex Homes"],
        blockchainStatus: "pending",
        issuedBy: "Hughes Bros Construction",
        issuedTo: "Apex Homes Ltd",
        timestamp: "Pending",
        statusNote: "Awaiting signature from Apex Homes",
        owner: "Hughes Bros Construction",
        accessControl: "restricted",
        documentStatus: "Acknowledged",
      },
    ],
    ownershipTimeline: [
      {
        from: "Apex Homes Ltd",
        to: "Hughes Bros Construction",
        date: "20 Jan 2025",
        description: "Main works control delegated under JCT D&B",
        verified: true,
        transferType: "Control transfer",
      },
      {
        from: "Hughes Bros Construction",
        to: "RM Groundworks Ltd",
        date: "3 Feb 2025",
        description: "Piling & excavation package site access",
        verified: true,
        transferType: "Access granted",
      },
    ],
  },
  {
    id: "manchester",
    name: "Manchester Fit-Out — Block C",
    client: "Northern Developments PLC",
    mainContractor: "Balfour Group",
    startDate: "1 Mar 2025",
    contractValue: "£5.1M",
    contractType: "NEC4 Option A",
    documentCount: 8,
    partyCount: 4,
    lastActivity: "8 Apr 2025",
    status: "In Dispute",
    governingContract: {
      name: "Main Works Contract (NEC4)",
      partyA: "Northern Developments PLC",
      partyB: "Balfour Group",
      anchoredDate: "01 Mar 2025, 10:00",
    },
    parties: [
      { name: "Northern Developments PLC", role: "Developer" },
      { name: "Balfour Group", role: "Main Contractor" },
      { name: "Spark Electrical Ltd", role: "Subcontractor" },
      { name: "CoolAir Systems", role: "Subcontractor" },
    ],
    terminatedParties: ["CoolAir Systems"],
    documents: [],
    envelopes: [],
    ownershipTimeline: [
      {
        from: "Northern Developments PLC",
        to: "Balfour Group",
        date: "01 Mar 2025",
        description: "Main works control delegated under NEC4",
        verified: true,
        transferType: "Control transfer",
      },
      {
        from: "Balfour Group",
        to: "CoolAir Systems",
        date: "15 Mar 2025",
        description: "HVAC package access granted",
        verified: true,
        transferType: "Access granted",
      },
      {
        from: "CoolAir Systems",
        to: "Balfour Group",
        date: "05 Apr 2025",
        description: "HVAC package control reverted due to insolvency",
        verified: true,
        transferType: "Control withdrawn",
        reason: "Termination / Insolvency",
      },
    ],
  },
  {
    id: "m62",
    name: "M62 Infrastructure — Section 4",
    client: "Highways England",
    mainContractor: "Kier Highways",
    startDate: "15 Nov 2024",
    contractValue: "£12.8M",
    contractType: "NEC3 Option C",
    documentCount: 14,
    partyCount: 5,
    lastActivity: "2 Apr 2025",
    status: "Active",
    parties: [
      { name: "Highways England", role: "Client" },
      { name: "Kier Highways", role: "Main Contractor" },
      { name: "WSP Engineering", role: "Consultant" },
      { name: "Tarmac Ltd", role: "Subcontractor" },
      { name: "Volker Fitzpatrick", role: "Subcontractor" },
    ],
    documents: [],
    envelopes: [],
    ownershipTimeline: [],
  },
  {
    id: "canary",
    name: "Canary Wharf Tower — Refurb",
    client: "Canary Wharf Group",
    mainContractor: "Mace Ltd",
    startDate: "10 Sep 2024",
    contractValue: "£8.6M",
    contractType: "JCT Standard Building",
    documentCount: 11,
    partyCount: 4,
    lastActivity: "15 Mar 2025",
    status: "Completed",
    parties: [
      { name: "Canary Wharf Group", role: "Client" },
      { name: "Mace Ltd", role: "Main Contractor" },
      { name: "Mace Ltd", role: "Consultant", roles: ["Main Contractor", "Consultant"] },
      { name: "Arup", role: "Consultant" },
      { name: "ISG Interior Services", role: "Subcontractor" },
    ],
    documents: [],
    envelopes: [],
    ownershipTimeline: [],
  },
];
