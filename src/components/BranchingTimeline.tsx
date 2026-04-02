import { useState, useRef, useCallback } from "react";
import { branchingNodes, partyTracks, TreeNode, LifecycleStatus } from "@/data/branchingData";
import { ZoomIn, ZoomOut, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentDetailModal from "@/components/DocumentDetailModal";

interface BranchingTimelineProps {
  projectId: string;
  userRole?: string;
}

const NODE_W = 200;
const NODE_H = 72; // fixed compact height: title + party + date + badge row
const COL_GAP = 80;
const ROW_GAP = 40;
const TRACK_LABEL_W = 180;
const PADDING_TOP = 20;
const PADDING_RIGHT = 100;

const trackColors = ["#8E9196", "#2150B5", "#E8930C", "#22A55D"];

const lifecycleConfig: Record<LifecycleStatus, { bg: string; fg: string }> = {
  Draft: { bg: "#F3F4F6", fg: "#6B7280" },
  Issued: { bg: "#DBEAFE", fg: "#2563EB" },
  Acknowledged: { bg: "#FEF9C3", fg: "#CA8A04" },
  Signed: { bg: "#DCFCE7", fg: "#16A34A" },
  Superseded: { bg: "#E5E7EB", fg: "#9CA3AF" },
};

function getDisputeLabel(node: TreeNode): string {
  if (node.lifecycleStatus === "Draft") return "Under review";
  if (node.lifecycleStatus === "Issued") return "Challenged after issue";
  return "Disputed";
}

const BranchingTimeline = ({ projectId, userRole }: BranchingTimelineProps) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mainNodes = branchingNodes.filter(n => n.lifecycleStatus !== "Superseded");
  const supersededNodes = branchingNodes.filter(n => n.lifecycleStatus === "Superseded");

  const activeTracks = new Set(mainNodes.map((n) => n.partyTrack));
  const activePartyTracks = partyTracks.filter((t) => activeTracks.has(t.trackIndex));

  const trackPositionMap = new Map<number, number>();
  activePartyTracks.forEach((track, i) => {
    trackPositionMap.set(track.trackIndex, i);
  });

  const trackY = new Map<number, number>();
  let cumY = PADDING_TOP;
  for (let i = 0; i < activePartyTracks.length; i++) {
    trackY.set(i, cumY);
    cumY += NODE_H + ROW_GAP;
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
    return y + NODE_H / 2;
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

  function renderNode(node: TreeNode, isSuperSeded = false) {
    const pos = getRemappedNodePos(node);
    const trackColor = trackColors[node.partyTrack];
    const isHovered = hoveredNode === node.id;
    const isDimmed = hoveredNode && !connectedIds.has(node.id);
    const lcCfg = lifecycleConfig[node.lifecycleStatus];
    const isSuperseded = node.lifecycleStatus === "Superseded";
    const offsetY = isSuperSeded ? 12 : 0;

    const titleMaxLen = 26;
    const partyMaxLen = 28;
    const title = node.name.length > titleMaxLen ? node.name.slice(0, titleMaxLen - 1) + "…" : node.name;
    const party = node.party.length > partyMaxLen ? node.party.slice(0, partyMaxLen - 1) + "…" : node.party;

    const lcLabel = node.lifecycleStatus;
    const lcBadgeW = lcLabel.length * 6.5 + 12;

    // Dispute badge
    const hasDispute = node.isDisputed;
    const disputeLabel = hasDispute ? getDisputeLabel(node) : "";
    const disputeBadgeW = hasDispute ? disputeLabel.length * 5.5 + 12 : 0;
    const disputeX = 10 + lcBadgeW + 4;

    return (
      <g
        key={node.id}
        transform={`translate(${pos.x}, ${pos.y + offsetY})`}
        onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        className="cursor-pointer"
        opacity={isDimmed ? 0.2 : isSuperseded ? 0.45 : 1}
      >
        <rect
          x={0} y={0} width={NODE_W} height={NODE_H}
          rx={node.isMilestone ? 12 : 8}
          fill="white"
          stroke={node.isDisputed ? "#EF4444" : isSuperseded ? "#D1D5DB" : node.lifecycleStatus === "Draft" ? "#8E9196" : trackColor}
          strokeWidth={isHovered ? 2.5 : node.isMilestone ? 2.5 : 1.5}
          strokeDasharray={node.lifecycleStatus === "Draft" ? "6 3" : isSuperseded ? "4 2" : "none"}
          className="transition-all"
        />
        {node.isMilestone && (
          <rect
            x={-3} y={-3} width={NODE_W + 6} height={NODE_H + 6}
            rx={14} fill="none"
            stroke={node.lifecycleStatus === "Draft" ? "#8E9196" : trackColor}
            strokeWidth={1} strokeDasharray="6 3" opacity={0.4}
          />
        )}
        {node.isDisputed && (
          <rect
            x={-2} y={-2} width={NODE_W + 4} height={NODE_H + 4}
            rx={10} fill="none" stroke="#EF4444" strokeWidth={1} opacity={0.3}
          />
        )}

        {/* Title */}
        <text x={10} y={16} fontSize={12} fontWeight={600} fill={isSuperseded ? "#9CA3AF" : "#1a1a2e"} fontFamily="Inter, sans-serif">
          {title}
        </text>
        {/* Party */}
        <text x={10} y={29} fontSize={11} fill={isSuperseded ? "#9CA3AF" : trackColor} fontFamily="Inter, sans-serif" fontWeight={500}>
          {party}
        </text>
        {/* Date */}
        <text x={10} y={41} fontSize={11} fill="#8E9196" fontFamily="Inter, sans-serif">
          {node.date}
        </text>

        {/* Lifecycle badge */}
        <rect x={10} y={48} width={lcBadgeW} height={16} rx={3} fill={lcCfg.bg} />
        <text x={14} y={59} fontSize={10} fontWeight={600} fill={lcCfg.fg} fontFamily="Inter, sans-serif">
          {lcLabel}
        </text>

        {/* Dispute badge */}
        {hasDispute && (
          <>
            <rect x={disputeX} y={48} width={disputeBadgeW} height={16} rx={3} fill="#FEE2E2" />
            <text x={disputeX + 4} y={59} fontSize={10} fontWeight={600} fill="#EF4444" fontFamily="Inter, sans-serif">
              {disputeLabel}
            </text>
          </>
        )}
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
          {activePartyTracks.map((track) => {
            const y = getTrackCenterY(track.trackIndex);
            return (
              <g key={track.trackIndex}>
                <line
                  x1={TRACK_LABEL_W - 10} y1={y} x2={svgW - 20} y2={y}
                  stroke={track.colorHex} strokeWidth={1} strokeDasharray="4 4" opacity={0.2}
                />
                <text
                  x={10} y={y} dominantBaseline="middle"
                  fill={track.colorHex} fontSize={12} fontWeight={600} fontFamily="Inter, sans-serif"
                >
                  {track.trackIndex === 0 ? "Shared" : track.name}
                </text>
              </g>
            );
          })}

          {edges.map(({ from, to }, i) => {
            const fromPos = getRemappedNodePos(from);
            const toPos = getRemappedNodePos(to);
            const x1 = fromPos.x + NODE_W;
            const y1 = fromPos.y + NODE_H / 2;
            const x2 = toPos.x;
            const y2 = toPos.y + NODE_H / 2;
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

          {mainNodes.map((node) => renderNode(node))}
          {supersededNodes.map((node) => renderNode(node, true))}
        </svg>
      </div>

      {branchingNodes.filter(n => n.blockingNote).map(node => (
        <div key={node.id} className="mt-2 px-3 py-2 rounded-md bg-warning/5 border border-warning/20">
          <p className="text-xs text-warning font-medium flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3" />
            {node.name}: {node.blockingNote}
          </p>
        </div>
      ))}

      <DocumentDetailModal
        node={selectedNode}
        open={!!selectedNode}
        onOpenChange={(open) => { if (!open) setSelectedNode(null); }}
        userRole={userRole}
      />
    </div>
  );
};

export default BranchingTimeline;
