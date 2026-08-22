import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { exploreGraph, getNeighbors, getNode } from "../api/graph";
import { ApiError } from "../api/client";
import { ErrorState } from "../components/EmptyErrorStates";
import { GraphSkeleton } from "../components/LoadingState";
import { GraphView } from "../components/GraphView";
import { Legend } from "../components/Legend";
import { NodeDetailsPanel } from "../components/NodeDetailsPanel";
import { StatsSection } from "../components/StatsSection";
import { GraphData, GraphNode } from "../types";

function mergeGraphs(base: GraphData, addition: GraphData): GraphData {
  const nodeMap = new Map(base.nodes.map((n) => [n.id, n]));
  for (const n of addition.nodes) nodeMap.set(n.id, n);
  const edgeMap = new Map(base.edges.map((e) => [e.id, e]));
  for (const e of addition.edges) edgeMap.set(e.id, e);
  return { nodes: Array.from(nodeMap.values()), edges: Array.from(edgeMap.values()) };
}

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeIdParam = searchParams.get("nodeId");

  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [exploring, setExploring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (nodeIdParam) {
        const [graph, node] = await Promise.all([
          exploreGraph({ nodeId: nodeIdParam }),
          getNode(nodeIdParam),
        ]);
        setGraphData(graph);
        setSelectedNode(node);
        setSelectedDegree(node.degree);
      } else {
        const graph = await exploreGraph({});
        setGraphData(graph);
        setSelectedNode(null);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load the graph.");
    } finally {
      setLoading(false);
    }
  }, [nodeIdParam]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  async function handleNodeClick(node: GraphNode) {
    setSelectedNode(node);
    setSearchParams({ nodeId: node.id }, { replace: true });
    try {
      const full = await getNode(node.id);
      setSelectedDegree(full.degree);
    } catch {
      setSelectedDegree(undefined);
    }
  }

  async function handleExploreConnections() {
    if (!selectedNode) return;
    setExploring(true);
    try {
      const neighbors = await getNeighbors(selectedNode.id, 60);
      setGraphData((prev) => mergeGraphs(prev, neighbors));
    } catch {
      // Non-fatal - the graph just doesn't grow this time.
    } finally {
      setExploring(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">Explore</h1>
        <p className="text-sm text-text-muted">
          Search or click into a node to see how skills, technologies, projects, roles, and
          companies connect.
        </p>
      </div>

      <div className="card px-4 py-3">
        <Legend compact />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-h-[420px]">
          {loading ? (
            <GraphSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={loadInitial} offline />
          ) : (
            <GraphView
              data={graphData}
              selectedNodeId={selectedNode?.id ?? null}
              onNodeClick={handleNodeClick}
            />
          )}
        </div>

        <div className="min-h-[240px] lg:min-h-0">
          {selectedNode ? (
            <NodeDetailsPanel
              node={selectedNode}
              degree={selectedDegree}
              exploring={exploring}
              onExplore={handleExploreConnections}
              onClose={() => {
                setSelectedNode(null);
                setSearchParams({}, { replace: true });
              }}
            />
          ) : (
            <div className="card flex h-full min-h-[240px] flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="text-sm text-text-muted">
                Select a node in the graph to see its details and connections.
              </p>
            </div>
          )}
        </div>
      </div>

      <StatsSection />
    </div>
  );
}
