import { initialNodes, initialEdges } from "./node-edges";
import { stratify, tree } from "d3-hierarchy";
import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import { MarkerType } from "reactflow";
import CustomNode from "./node";
import CustomEdge from "./edge";
import {
  PlusIcon,
  MagnifyingGlassPlusIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

import "reactflow/dist/style.css";

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  animated: true,
  type: "custom",
  markerEnd: { type: MarkerType.ArrowClosed },
};

const g = tree();

const getLayoutedElements = (nodes, edges, options) => {
  if (nodes.length === 0) return { nodes, edges };

  if (typeof window === "undefined") {
    // Return nodes and edges as they are for server-side rendering
    return { nodes, edges };
  }

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    ?.getBoundingClientRect() || { width: 50, height: 50 };

  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout.descendants().map((node) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    })),
    edges,
  };
};

const getOrderedPath = (nodes, edges) => {
  const nodeMap = new Map();
  nodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, edges: [] });
  });

  edges.forEach((edge) => {
    const sourceNode = nodeMap.get(edge.source);
    if (sourceNode) {
      sourceNode.edges.push(edge);
    }
  });

  const path = [];
  const traverse = (nodeId) => {
    const currentNode = nodeMap.get(nodeId);
    if (currentNode) {
      currentNode.edges.forEach((edge) => {
        path.push({ from: edge.source, to: edge.target });
        traverse(edge.target);
      });
    }
  };

  // Assuming the initial node is "Dataset"
  traverse("Dataset");
  return path;
};

const logEdgeConnections = (edges) => {
  const edgeMap = new Map();
  edges.forEach((edge) => {
    if (!edgeMap.has(edge.source)) {
      edgeMap.set(edge.source, []);
    }
    edgeMap.get(edge.source).push(edge.target);
  });

  edgeMap.forEach((targets, source) => {
    console.log(`Node ${source} is connected to nodes: ${targets.join(", ")}`);
  });
};

function LayoutFlow({ handleDatasetModalOpen, onGetConnections }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const layoutInitialized = useRef(false);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onEdgesDelete = useCallback(
    (edgesToRemove) =>
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.includes(edge))),
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, setNodes, setEdges, fitView]
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !layoutInitialized.current &&
      document.querySelector(`[data-id="${nodes[0].id}"]`)
    ) {
      layoutInitialized.current = true;
      onLayout();
    }
  }, [nodes, onLayout]);

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: {
        label: `Node ${nodes.length + 1}`,
        sourceCount: 1,
        targetCount: 1,
        onDelete: deleteNode,
      },
      position: {
        x: lastNode ? lastNode.position.x : Math.random() * 400,
        y: lastNode ? lastNode.position.y + 100 : Math.random() * 400,
      },
      type: "selectorNode",
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    const path = getOrderedPath(nodes, edges);
    console.log("Ordered Path:", path);
    logEdgeConnections(edges);

    onGetConnections(edges);
  }, [nodes, edges, onGetConnections]);

  return (
    <>
      <div className="flex gap-3 mt-[-60px]">
        <button className="btn " onClick={fitView}>
          <MagnifyingGlassPlusIcon className="h-5 w-5" />
          Fit Screen
        </button>
        <button className="btn " onClick={addNode}>
          <PlusIcon className="h-5 w-5" />
          Add Node
        </button>
        <button
          className="btn border-2 bg-white text-black hover:bg-gray-100"
          onClick={handleDatasetModalOpen}
        >
          <CircleStackIcon className="h-5 w-5" />
          Dataset parameters
        </button>
      </div>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onDelete: deleteNode },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      />
    </>
  );
}

const Flow = ({ onGetConnections, handleDatasetModalOpen }) => (
  <ReactFlowProvider>
    <LayoutFlow
      handleDatasetModalOpen={handleDatasetModalOpen}
      onGetConnections={onGetConnections}
    />
  </ReactFlowProvider>
);

export default Flow;
