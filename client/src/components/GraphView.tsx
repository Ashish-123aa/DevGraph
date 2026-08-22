import cytoscape, { Core, ElementDefinition } from "cytoscape";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { GraphData, GraphNode } from "../types";
import { nodeDisplayName, visualForLabels } from "../utils/entityVisuals";

interface GraphViewProps {
  data: GraphData;
  selectedNodeId?: string | null;
  onNodeClick?: (node: GraphNode) => void;
}

function toElements(data: GraphData, selectedNodeId?: string | null): ElementDefinition[] {
  const nodeEls: ElementDefinition[] = data.nodes.map((n) => {
    const visual = visualForLabels(n.labels);
    return {
      data: {
        id: n.id,
        label: nodeDisplayName(n.props),
        color: visual.color,
        raw: n,
      },
      selected: n.id === selectedNodeId,
    };
  });

  const nodeIds = new Set(data.nodes.map((n) => n.id));
  const edgeEls: ElementDefinition[] = data.edges
    .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
    .map((e) => ({
      data: { id: e.id, source: e.source, target: e.target, label: e.type },
    }));

  return [...nodeEls, ...edgeEls];
}

export function GraphView({ data, selectedNodeId, onNodeClick }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: toElements(data, selectedNodeId),
      style: [
        {
          selector: "node",
          style: {
            "background-color": "data(color)",
            label: "data(label)",
            color: "#E6E8EB",
            "font-size": 10,
            "font-family": "Inter, sans-serif",
            "text-valign": "bottom",
            "text-margin-y": 6,
            width: 24,
            height: 24,
            "border-width": 2,
            "border-color": "#0B0E14",
            "text-outline-width": 2,
            "text-outline-color": "#0B0E14",
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": 3,
            "border-color": "#4FD1C5",
            width: 32,
            height: 32,
          },
        },
        {
          selector: "edge",
          style: {
            width: 1.4,
            "line-color": "#2A3140",
            "target-arrow-color": "#2A3140",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.7,
            "curve-style": "bezier",
            label: "data(label)",
            "font-size": 8,
            "font-family": "'JetBrains Mono', monospace",
            color: "#5A6474",
            "text-rotation": "autorotate",
            "text-background-color": "#0B0E14",
            "text-background-opacity": 0.85,
            "text-background-padding": "2px",
          },
        },
        {
          selector: "edge:selected",
          style: { "line-color": "#4FD1C5", "target-arrow-color": "#4FD1C5", width: 2 },
        },
      ],
      layout: { name: "cose", animate: false, padding: 40, nodeRepulsion: 8000 } as any,
      minZoom: 0.2,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    });

    cy.on("tap", "node", (evt) => {
      const raw = evt.target.data("raw") as GraphNode;
      onNodeClick?.(raw);
    });

    cy.on("mouseover", "node", (evt) => {
      containerRef.current!.style.cursor = "pointer";
      evt.target.style("border-color", "#4FD1C5");
    });
    cy.on("mouseout", "node", (evt) => {
      containerRef.current!.style.cursor = "default";
      if (!evt.target.selected()) evt.target.style("border-color", "#0B0E14");
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !selectedNodeId) return;
    cy.nodes().unselect();
    const node = cy.getElementById(selectedNodeId);
    if (node.nonempty()) {
      node.select();
      cy.animate({ center: { eles: node }, zoom: Math.max(cy.zoom(), 1.1) }, { duration: 300 });
    }
  }, [selectedNodeId]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full rounded-card border border-border bg-surface" />
      <div className="absolute bottom-3 right-3 flex flex-col gap-1 rounded-md border border-border bg-surface/90 p-1 backdrop-blur">
        <button
          className="rounded p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-primary"
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          className="rounded p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-primary"
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          className="rounded p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-primary"
          onClick={() => cyRef.current?.fit(undefined, 40)}
          aria-label="Fit graph"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
