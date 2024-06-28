import { initialNodes, initialEdges } from "./node-edges";
import { stratify, tree } from "d3-hierarchy";
import React, { useCallback, useEffect, useState } from "react";
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

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

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
    []
  );

  const onEdgesDelete = useCallback(
    (edgesToRemove) =>
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.includes(edge))),
    []
  );

  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, []);

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
    [nodes, edges]
  );

  const isGraphLoaded = !!document.querySelector(`[data-id="${nodes[0].id}"]`);

  useEffect(() => {
    if (isGraphLoaded) {
      onLayout();
    }
  }, [isGraphLoaded]);

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: {
        label: `Node ${nodes.length + 1}`,
        sourceCount: 1,
        targetCount: 1,
      },
      position: {
        x: lastNode ? lastNode.position.x : Math.random() * 400,
        y: lastNode ? lastNode.position.y + 100 : Math.random() * 400,
      },
      type: "selectorNode",
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <>
      <button onClick={fitView}>Fit Screen</button>
      <button onClick={addNode}>Add Node</button>
      <ReactFlow
        nodes={nodes}
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

const Flow = () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);

export default Flow;
