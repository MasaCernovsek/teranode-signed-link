import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { branchingNodes, partyTracks, TreeNode, LifecycleStatus } from "@/data/branchingData";
import { ZoomIn, ZoomOut, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BranchingTimelineProps {
  projectId: string;
}

const NODE_W = 210;
const BASE_NODE_H = 68;
const COL_GAP = 80;
const ROW_GAP = 40;
const TRACK_LABEL_W = 180;
const PADDING_TOP = 20;
const PADDING_RIGHT = 100;

const trackColors = ["#8E9196", "#2150B5", "#E8930C", "#22A55D"];

// Lifecycle badge config
const lifecycleConfig: Record<LifecycleStatus, { bg: string; fg: string }> = {
  Draft: { bg: "#F3F4F6", fg: "#6B7280" },
  Issued: { bg: "#DBEAFE", fg: "#2563EB" },
  Acknowledged: { bg: "#FEF9C3", fg: "#CA8A04" },
  Signed: { bg: "#DCFCE7", fg: "#16A34A" },
  Superseded: { bg: "#E5E7EB", fg: "#9CA3AF" },
};

// Calculate dynamic node height based on content
function getNodeHeight(node: TreeNode): number {
  let h = BASE_NODE_H; // name + party + date + lifecycle badge row
  if (node.isDisputed) h += 12; // dispute badge
  if (node.isDisputed && node.disputedBy) h += 11; // dispute context
  if (node.supersededBy) h += 11; // superseded label
  if (node.accessControl === "restricted" && node.visibleTo) {
    // Estimate lines for visible-to text
    const text = "Visible to: " + node.visibleTo.join(", ");
    const lines = Math.ceil(text.length / 32);
    h += lines * 11 + 2;
  }
  return h;
}

const BranchingTimeline = ({ projectId }: BranchingTimelineProps) => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter out superseded nodes from normal flow — render them offset
  const mainNodes = branchingNodes.filter(n => n.lifecycleStatus !== "Superseded");
  const supersededNodes = branchingNodes.filter(n => n.lifecycleStatus === "Superseded");

  // Determine which tracks have nodes
  const activeTracks = new Set(mainNodes.map((n) => n.partyTrack));
  const activePartyTracks = partyTracks.filter((t) => activeTracks.has(t.trackIndex));

  const trackPositionMap = new Map<number, number>();
  activePartyTracks.forEach((track, i) => {
    trackPositionMap.set(track.trackIndex, i);
  });

  // Use max node height per track for row positioning
  const trackMaxH = new Map<number, number>();
  branchingNodes.forEach(n => {
    const h = getNodeHeight(n);
    const mapped = trackPositionMap.get(n.partyTrack) ?? n.partyTrack;
    trackMaxH.set(mapped, Math.max(trackMaxH.get(mapped) ?? BASE_NODE_H, h));
  });

  // Cumulative Y positions per track
  const trackY = new Map<number, number>();
  let cumY = PADDING_TOP;
  for (let i = 0; i < activePartyTracks.length; i++) {
    trackY.set(i, cumY);
    cumY += (trackMaxH.get(i) ?? BASE_NODE_H) + ROW_GAP;
  }

  function getRemappedNodePos(node: TreeNode) {
    const x = TRACK_LABEL_W + node.column * (NODE_W + COL_GAP);
    const mappedTrack = trackPositionMap.get(node.partyTrack) ?? node.partyTrack;
    const y = trackY.get(mappedTrack) ?? PADDING_TOP;
    return { x, y };
  }

  function getTrackCenterY(trackIndex: number) {
    const mapped = trackPositionMap.get(trackIndex) ?? trackIndex;
    const y = trackY.get(mapped) ?? PADDING_TOP;
    const h = trackMaxH.get(mapped) ?? BASE_NODE_H;
    return y + h / 2;
  }

  const maxCol = Math.max(...branchingNodes.map((n) => n.column));
  const svgW = TRACK_LABEL_W + (maxCol + 1) * (NODE_W + COL_GAP) + PADDING_RIGHT;
  const svgH = cumY + 20;

  const getConnectedIds = useCallback((nodeId: string | null): Set<string> => {
    if (!nodeId) return new Set();
    const ids = new Set<string>();
    const traverse = (id: string) => {
      if (ids.has(id)) return;
      ids.add(id);
      const node = branchingNodes.find((n) => n.id === id);
      if (node) node.parentIds.forEach(traverse);
      branchingNodes.filter((n) => n.parentIds.includes(id)).forEach((n) => traverse(n.id));
    };
    traverse(nodeId);
    return ids;
  }, []);

  const connectedIds = getConnectedIds(hoveredNode);

  const edges: { from: TreeNode; to: TreeNode }[] = [];
  mainNodes.forEach((node) => {
    node.parentIds.forEach((pid) => {
      const parent = branchingNodes.find((n) => n.id === pid);
      if (parent && parent.lifecycleStatus !== "Superseded") edges.push({ from: parent, to: node });
    });
  });

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleZoomReset = () => setZoom(1);

  // Context-aware dispute label
  function getDisputeLabel(node: TreeNode): string {
    if (node.lifecycleStatus === "Draft") return "Under review";
    if (node.lifecycleStatus === "Issued") return "Challenged after issue";
    return "Disputed";
  }

  function renderNode(node: TreeNode, isSuperSeded = false) {
    const pos = getRemappedNodePos(node);
    const nodeH = getNodeHeight(node);
    const trackColor = trackColors[node.partyTrack];
    const isHovered = hoveredNode === node.id;
    const isDimmed = hoveredNode && !connectedIds.has(node.id);
    const lcCfg = lifecycleConfig[node.lifecycleStatus];
    const isSuperseded = node.lifecycleStatus === "Superseded";

    // Offset superseded nodes slightly below
    const offsetY = isSuperSeded ? 12 : 0;

    let cursorY = 16; // starting y for first text line

    return (
      <g
        key={node.id}
        transform={`translate(${pos.x}, ${pos.y + offsetY})`}
        onClick={() => navigate(`/project/${projectId}/document/${node.id}`)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        className="cursor-pointer"
        opacity={isDimmed ? 0.2 : isSuperseded ? 0.45 : 1}
      >
        {/* Card background */}
        <rect
          x={0} y={0} width={NODE_W} height={nodeH}
          rx={node.isMilestone ? 12 : 8}
          fill="white"
          stroke={node.isDisputed ? "#EF4444" : isSuperseded ? "#D1D5DB" : node.lifecycleStatus === "Draft" ? "#8E9196" : trackColor}
          strokeWidth={isHovered ? 2.5 : node.isMilestone ? 2.5 : 1.5}
          strokeDasharray={node.lifecycleStatus === "Draft" ? "6 3" : isSuperseded ? "4 2" : "none"}
          className="transition-all"
        />
        {node.isMilestone && (
          <rect
            x={-3} y={-3} width={NODE_W + 6} height={nodeH + 6}
            rx={14} fill="none"
            stroke={node.lifecycleStatus === "Draft" ? "#8E9196" : trackColor}
            strokeWidth={1} strokeDasharray="6 3" opacity={0.4}
          />
        )}
        {node.isDisputed && (
          <rect
            x={-2} y={-2} width={NODE_W + 4} height={nodeH + 4}
            rx={10} fill="none" stroke="#EF4444" strokeWidth={1} opacity={0.3}
          />
        )}

        {/* Name */}
        <text x={10} y={cursorY} fontSize={12} fontWeight={600} fill={isSuperseded ? "#9CA3AF" : "#1a1a2e"} fontFamily="Inter, sans-serif">
          {node.name.length > 24 ? node.name.slice(0, 22) + "…" : node.name}
        </text>
        {/* Party */}
        <text x={10} y={cursorY + 13} fontSize={12} fill={isSuperseded ? "#9CA3AF" : trackColor} fontFamily="Inter, sans-serif" fontWeight={500}>
          {node.party.length > 28 ? node.party.slice(0, 26) + "…" : node.party}
        </text>
        {/* Date */}
        <text x={10} y={cursorY + 25} fontSize={12} fill="#8E9196" fontFamily="Inter, sans-serif">
          {node.date}
        </text>

        {/* Lifecycle status badge — always primary */}
        {(() => {
          const badgeY = cursorY + 32;
          const label = node.lifecycleStatus;
          const badgeW = label.length * 6.5 + 12;
          return (
            <>
              <rect x={10} y={badgeY} width={badgeW} height={16} rx={3} fill={lcCfg.bg} />
              <text x={14} y={badgeY + 11} fontSize={12} fontWeight={600} fill={lcCfg.fg} fontFamily="Inter, sans-serif">
                {label}
              </text>
            </>
          );
        })()}

        {/* Dispute badge — separate from lifecycle */}
        {node.isDisputed && (() => {
          const badgeY = cursorY + 32;
          const lcLabel = node.lifecycleStatus;
          const lcW = lcLabel.length * 6.5 + 12;
          const disputeLabel = getDisputeLabel(node);
          const disputeW = disputeLabel.length * 6 + 12;
          const disputeX = 10 + lcW + 6;
          return (
            <>
              <rect x={disputeX} y={badgeY} width={disputeW} height={16} rx={3} fill="#FEE2E2" />
              <text x={disputeX + 4} y={badgeY + 11} fontSize={12} fontWeight={600} fill="#EF4444" fontFamily="Inter, sans-serif">
                {disputeLabel}
              </text>
            </>
          );
        })()}

        {/* Disputed context line */}
        {node.isDisputed && node.disputedBy && (
          <text x={10} y={cursorY + 60} fontSize={12} fill="#EF4444" fontFamily="Inter, sans-serif">
            {node.disputedBy} · {node.disputeDate}
          </text>
        )}

        {/* Superseded label */}
        {node.supersededBy && (
          <text
            x={10}
            y={cursorY + (node.isDisputed && node.disputedBy ? 72 : 60)}
            fontSize={12} fill="#9CA3AF" fontFamily="Inter, sans-serif" fontStyle="italic"
          >
            Superseded by {node.supersededBy}
          </text>
        )}

        {/* Restricted access — full-width wrapping text */}
        {node.accessControl === "restricted" && node.visibleTo && (() => {
          const baseY = cursorY + (node.isDisputed && node.disputedBy ? 72 : node.isDisputed ? 60 : node.supersededBy ? 72 : 52);
          const fullText = "Visible to: " + node.visibleTo.join(", ");
          // Simple line-breaking for SVG
          const maxChars = 32;
          const lines: string[] = [];
          let remaining = fullText;
          while (remaining.length > 0) {
            if (remaining.length <= maxChars) {
              lines.push(remaining);
              break;
            }
            let breakAt = remaining.lastIndexOf(", ", maxChars);
            if (breakAt === -1 || breakAt < 10) breakAt = maxChars;
            else breakAt += 2;
            lines.push(remaining.slice(0, breakAt));
            remaining = remaining.slice(breakAt);
          }
          return lines.map((line, li) => (
            <text
              key={li}
              x={10}
              y={baseY + li * 12}
              fontSize={12}
              fill="#8E9196"
              fontFamily="Inter, sans-serif"
            >
              {line}
            </text>
          ));
        })()}
      </g>
    );
  }

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
        <span className="text-xs text-muted-foreground px-1">{Math.round(zoom * 100)}%</span>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-auto border rounded-lg bg-muted/20"
        style={{ maxHeight: 550 }}
      >
        <svg
          width={svgW * zoom}
          height={svgH * zoom}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="select-none"
        >
          {/* Track labels — only active tracks */}
          {activePartyTracks.map((track) => {
            const y = getTrackCenterY(track.trackIndex);
            return (
              <g key={track.trackIndex}>
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
                <text
                  x={10}
                  y={y}
                  dominantBaseline="middle"
                  fill={track.colorHex}
                  fontSize={12}
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
            const fromPos = getRemappedNodePos(from);
            const toPos = getRemappedNodePos(to);
            const fromH = getNodeHeight(from);
            const toH = getNodeHeight(to);
            const x1 = fromPos.x + NODE_W;
            const y1 = fromPos.y + fromH / 2;
            const x2 = toPos.x;
            const y2 = toPos.y + toH / 2;

            const isHighlighted = hoveredNode && connectedIds.has(from.id) && connectedIds.has(to.id);
            const edgeColor = trackColors[to.partyTrack] || "#8E9196";
            const isCrossingTracks = from.partyTrack !== to.partyTrack;
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
                {isCrossingTracks && (
                  <g transform={`translate(${midX - 6}, ${(y1 + y2) / 2 - 6})`}>
                    <circle cx={6} cy={6} r={7} fill="white" stroke={edgeColor} strokeWidth={1} />
                    <text x={6} y={7} textAnchor="middle" dominantBaseline="middle" fontSize={8}>🔗</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Main nodes */}
          {mainNodes.map((node) => renderNode(node))}

          {/* Superseded nodes — muted, offset */}
          {supersededNodes.map((node) => renderNode(node, true))}
        </svg>
      </div>

      {/* Blocking note for milestone */}
      {branchingNodes.filter(n => n.blockingNote).map(node => (
        <div key={node.id} className="mt-2 px-3 py-2 rounded-md bg-warning/5 border border-warning/20">
          <p className="text-xs text-warning font-medium flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3" />
            {node.name}: {node.blockingNote}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BranchingTimeline;
