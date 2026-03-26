import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { branchingNodes, partyTracks, TreeNode } from "@/data/branchingData";
import { Link2, CheckCircle2, Clock, AlertTriangle, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BranchingTimelineProps {
  projectId: string;
}

const NODE_W = 180;
const NODE_H = 80;
const COL_GAP = 80;
const ROW_GAP = 40;
const TRACK_LABEL_W = 180;
const PADDING_TOP = 20;
const PADDING_RIGHT = 100;

const statusConfig = {
  verified: { icon: Link2, label: "Blockchain Verified", cls: "border-accent bg-accent/5 text-accent" },
  signed: { icon: CheckCircle2, label: "Signed ✓", cls: "border-accent bg-accent/5 text-accent" },
  pending: { icon: Clock, label: "Pending ⏳", cls: "border-warning bg-warning/5 text-warning" },
  disputed: { icon: AlertTriangle, label: "Disputed ⚠", cls: "border-destructive bg-destructive/5 text-destructive" },
  future: { icon: Clock, label: "Not Yet Issued", cls: "border-muted-foreground/40 bg-muted/30 text-muted-foreground" },
};

const trackColors = ["#8E9196", "#2150B5", "#E8930C", "#22A55D"];

function getNodePos(node: TreeNode) {
  const x = TRACK_LABEL_W + node.column * (NODE_W + COL_GAP);
  const y = PADDING_TOP + node.partyTrack * (NODE_H + ROW_GAP);
  return { x, y };
}

const BranchingTimeline = ({ projectId }: BranchingTimelineProps) => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxCol = Math.max(...branchingNodes.map((n) => n.column));
  const maxTrack = Math.max(...branchingNodes.map((n) => n.partyTrack));
  const svgW = TRACK_LABEL_W + (maxCol + 1) * (NODE_W + COL_GAP) + PADDING_RIGHT;
  const svgH = PADDING_TOP + (maxTrack + 1) * (NODE_H + ROW_GAP) + 40;

  // Find all nodes connected to hovered node
  const getConnectedIds = useCallback((nodeId: string | null): Set<string> => {
    if (!nodeId) return new Set();
    const ids = new Set<string>();
    const traverse = (id: string) => {
      if (ids.has(id)) return;
      ids.add(id);
      const node = branchingNodes.find((n) => n.id === id);
      if (node) node.parentIds.forEach(traverse);
      // Also traverse children
      branchingNodes.filter((n) => n.parentIds.includes(id)).forEach((n) => traverse(n.id));
    };
    traverse(nodeId);
    return ids;
  }, []);

  const connectedIds = getConnectedIds(hoveredNode);

  // Draw edges
  const edges: { from: TreeNode; to: TreeNode }[] = [];
  branchingNodes.forEach((node) => {
    node.parentIds.forEach((pid) => {
      const parent = branchingNodes.find((n) => n.id === pid);
      if (parent) edges.push({ from: parent, to: node });
    });
  });

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="relative">
      {/* Zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-card border rounded-md shadow-sm p-1">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleZoomIn}>
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleZoomOut}>
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleZoomReset}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <span className="text-[10px] text-muted-foreground px-1">{Math.round(zoom * 100)}%</span>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-auto border rounded-lg bg-muted/20"
        style={{ maxHeight: 500 }}
      >
        <svg
          width={svgW * zoom}
          height={svgH * zoom}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="select-none"
        >
          {/* Track labels (fixed-ish on left) */}
          {partyTracks.map((track) => {
            const y = PADDING_TOP + track.trackIndex * (NODE_H + ROW_GAP) + NODE_H / 2;
            return (
              <g key={track.trackIndex}>
                {/* Track line */}
                <line
                  x1={TRACK_LABEL_W - 10}
                  y1={y}
                  x2={svgW - 20}
                  y2={y}
                  stroke={track.colorHex}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.2}
                />
                {/* Label */}
                <text
                  x={10}
                  y={y}
                  dominantBaseline="middle"
                  fill={track.colorHex}
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="Inter, sans-serif"
                >
                  {track.trackIndex === 0 ? "Shared" : track.name}
                </text>
              </g>
            );
          })}

          {/* Edges */}
          {edges.map(({ from, to }, i) => {
            const fromPos = getNodePos(from);
            const toPos = getNodePos(to);
            const x1 = fromPos.x + NODE_W;
            const y1 = fromPos.y + NODE_H / 2;
            const x2 = toPos.x;
            const y2 = toPos.y + NODE_H / 2;

            const isHighlighted = hoveredNode && connectedIds.has(from.id) && connectedIds.has(to.id);
            const edgeColor = trackColors[to.partyTrack] || "#8E9196";
            const isCrossingTracks = from.partyTrack !== to.partyTrack;

            // Control points for curved lines
            const midX = (x1 + x2) / 2;

            return (
              <g key={i}>
                <path
                  d={isCrossingTracks
                    ? `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
                    : `M ${x1} ${y1} L ${x2} ${y2}`
                  }
                  stroke={edgeColor}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  fill="none"
                  opacity={hoveredNode ? (isHighlighted ? 1 : 0.15) : 0.6}
                  className="transition-opacity"
                />
                {/* Chain link icon on cross-track edges */}
                {isCrossingTracks && (
                  <g transform={`translate(${midX - 6}, ${(y1 + y2) / 2 - 6})`}>
                    <circle cx={6} cy={6} r={7} fill="white" stroke={edgeColor} strokeWidth={1} />
                    <text
                      x={6}
                      y={7}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={8}
                    >
                      🔗
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {branchingNodes.map((node) => {
            const pos = getNodePos(node);
            const cfg = statusConfig[node.status];
            const trackColor = trackColors[node.partyTrack];
            const isHovered = hoveredNode === node.id;
            const isDimmed = hoveredNode && !connectedIds.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => navigate(`/project/${projectId}/document/${node.id}`)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                opacity={isDimmed ? 0.2 : 1}
              >
                {/* Node card */}
                <rect
                  x={0}
                  y={0}
                  width={NODE_W}
                  height={NODE_H}
                  rx={node.isMilestone ? 12 : 8}
                  fill="white"
                  stroke={node.isDisputed ? "#EF4444" : node.status === "future" ? "#8E9196" : trackColor}
                  strokeWidth={isHovered ? 2.5 : node.isMilestone ? 2.5 : 1.5}
                  strokeDasharray={node.status === "future" ? "6 3" : "none"}
                  className="transition-all"
                />
                {/* Milestone: larger appearance */}
                {node.isMilestone && (
                  <rect
                    x={-3}
                    y={-3}
                    width={NODE_W + 6}
                    height={NODE_H + 6}
                    rx={14}
                    fill="none"
                    stroke={node.status === "future" ? "#8E9196" : trackColor}
                    strokeWidth={1}
                    strokeDasharray="6 3"
                    opacity={0.4}
                  />
                )}
                {/* Disputed red glow */}
                {node.isDisputed && (
                  <rect
                    x={-2}
                    y={-2}
                    width={NODE_W + 4}
                    height={NODE_H + 4}
                    rx={10}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                )}
                {/* Name */}
                <text
                  x={10}
                  y={22}
                  fontSize={10.5}
                  fontWeight={600}
                  fill="#1a1a2e"
                  fontFamily="Inter, sans-serif"
                >
                  {node.name.length > 24 ? node.name.slice(0, 22) + "…" : node.name}
                </text>
                {/* Party */}
                <text
                  x={10}
                  y={38}
                  fontSize={9}
                  fill={trackColor}
                  fontFamily="Inter, sans-serif"
                  fontWeight={500}
                >
                  {node.party.length > 28 ? node.party.slice(0, 26) + "…" : node.party}
                </text>
                {/* Date */}
                <text
                  x={10}
                  y={52}
                  fontSize={8.5}
                  fill="#8E9196"
                  fontFamily="Inter, sans-serif"
                >
                  {node.date}
                </text>
                {/* Status badge */}
                <rect
                  x={10}
                  y={58}
                  width={node.status === "verified" ? 90 : 60}
                  height={14}
                  rx={3}
                  fill={
                    node.isDisputed ? "#FEE2E2" :
                    node.status === "verified" ? "#DCFCE7" :
                    node.status === "signed" ? "#DCFCE7" :
                    node.status === "pending" ? "#FEF9C3" :
                    "#F3F4F6"
                  }
                />
                <text
                  x={14}
                  y={68}
                  fontSize={7.5}
                  fontWeight={600}
                  fill={
                    node.isDisputed ? "#EF4444" :
                    node.status === "verified" ? "#16A34A" :
                    node.status === "signed" ? "#16A34A" :
                    node.status === "pending" ? "#CA8A04" :
                    "#6B7280"
                  }
                  fontFamily="Inter, sans-serif"
                >
                  {node.isDisputed ? "Disputed ⚠" : cfg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Blocking note for milestone */}
      {branchingNodes.filter(n => n.blockingNote).map(node => (
        <div key={node.id} className="mt-2 px-3 py-2 rounded-md bg-warning/5 border border-warning/20">
          <p className="text-[11px] text-warning font-medium flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3" />
            {node.name}: {node.blockingNote}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BranchingTimeline;
