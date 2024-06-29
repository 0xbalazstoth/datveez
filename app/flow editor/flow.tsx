import { initialNodes, initialEdges } from "./node-edges";
import { TreeLayout, stratify, tree } from "d3-hierarchy";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ComponentType,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Connection,
  Edge,
  EdgeTypes,
  EdgeProps,
  MiniMap,
  Controls,
  Background,
  ReactFlowInstance,
} from "reactflow";
import { MarkerType } from "reactflow";
import InitialNode from "./node";
import CustomEdge from "./edge";
import { IoSaveOutline } from "react-icons/io5";

import {
  PlusIcon,
  MagnifyingGlassPlusIcon,
  CircleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import "reactflow/dist/style.css";
import typeOfNode from "../types/node.type";
import lowercasingNode from "./toolbox.lowercasing.node";
import tokenizationNode from "./toolbox.tokenization.node";

const nodeTypes = {
  selectorNode: InitialNode,
  lowercasingNode: lowercasingNode,
  tokenizationNode: tokenizationNode,
};

const edgeTypes: EdgeTypes = {
  selectorEdge: CustomEdge as ComponentType<EdgeProps>,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const defaultEdgeOptions = {
  animated: true,
  type: "custom",
  markerEnd: { type: MarkerType.ArrowClosed },
};

const g: TreeLayout<any> = tree();

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  if (nodes.length === 0) return { nodes, edges };

  if (typeof window === "undefined") {
    // Return nodes and edges as they are for server-side rendering
    return { nodes, edges };
  }

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    ?.getBoundingClientRect() || { width: 50, height: 50 };

  const hierarchy = stratify()
    .id((node: any) => node.id)
    .parentId(
      (node: any) =>
        edges.find((edge: { target: any }) => edge.target === node.id)?.source
    );
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

const getOrderedPath = (nodes: any, edges: any) => {
  const nodeMap = new Map();
  nodes.forEach((node: { id: any }) => {
    nodeMap.set(node.id, { ...node, edges: [] });
  });

  edges.forEach((edge: { source: any }) => {
    const sourceNode = nodeMap.get(edge.source);
    if (sourceNode) {
      sourceNode.edges.push(edge);
    }
  });

  const path: { from: any; to: any }[] = [];
  const traverse = (nodeId: string) => {
    const currentNode = nodeMap.get(nodeId);
    if (currentNode) {
      currentNode.edges.forEach((edge: { source: any; target: any }) => {
        path.push({ from: edge.source, to: edge.target });
        traverse(edge.target);
      });
    }
  };

  traverse(typeOfNode.DatasetNode);
  return path;
};

const logEdgeConnections = (edges: any) => {
  const edgeMap = new Map();
  edges.forEach((edge: { source: any; target: any }) => {
    if (!edgeMap.has(edge.source)) {
      edgeMap.set(edge.source, []);
    }
    edgeMap.get(edge.source).push(edge.target);
  });

  edgeMap.forEach((targets, source) => {
    console.log(`Node ${source} is connected to nodes: ${targets.join(", ")}`);
  });
};

function LayoutFlow({
  handleDatasetModalOpen,
  onGetConnections,
  connectionType,
}: {
  handleDatasetModalOpen: any;
  onGetConnections: any;
  connectionType: "one-to-one" | "one-to-many";
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView, screenToFlowPosition, setViewport } = useReactFlow();
  const layoutInitialized = useRef(false);

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const flowKey = "flow";

  const saveFlow = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) ?? "");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const { source, target } = params;

      if (connectionType === "one-to-one") {
        const sourceConnected = edges.some((edge) => edge.source === source);
        const targetConnected = edges.some((edge) => edge.target === target);

        if (!sourceConnected && !targetConnected) {
          setEdges((eds) =>
            addEdge(
              {
                ...params,
                type: "custom",
                markerEnd: { type: MarkerType.ArrowClosed },
              },
              eds
            )
          );
          saveFlow();
        }
      } else {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              type: "custom",
              markerEnd: { type: MarkerType.ArrowClosed },
            },
            eds
          )
        );
        saveFlow();
      }
    },
    [connectionType, edges, setEdges, saveFlow]
  );

  const onEdgesDelete = useCallback(
    (edgesToRemove: Edge<any>[]) => {
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.includes(edge)));
      saveFlow();
    },
    [setEdges, saveFlow]
  );

  const onEdgeClick = useCallback(
    (event: { stopPropagation: () => void }, edge: { id: string }) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      saveFlow();
    },
    [setEdges, saveFlow]
  );

  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
        saveFlow();
      });
    },
    [nodes, edges, setNodes, setEdges, fitView, saveFlow]
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !layoutInitialized.current &&
      document.querySelector(`[data-id="${nodes[0].id}"]`)
    ) {
      layoutInitialized.current = true;
      onLayout("");
    }
  }, [nodes, onLayout]);

  useEffect(() => {
    onRestore();
  }, [onRestore]);

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      saveFlow();
    },
    [setNodes, setEdges, saveFlow]
  );

  const clearAllExceptDataset = () => {
    setNodes((nds) => nds.filter((node) => node.data.isInitial));
    setEdges([]);
    saveFlow();
  };

  useEffect(() => {
    const path = getOrderedPath(nodes, edges);
    console.log("Ordered Path:", path);
    logEdgeConnections(edges);

    onGetConnections(edges);
    saveFlow();
  }, [nodes, edges, onGetConnections, saveFlow]);

  const nodeClassName = (node: any) => node.type;

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: any;
      clientY: any;
    }) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: `${type} node`,
          sourceCount: 1,
          targetCount: 1,
          isInitial: false,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      saveFlow();
    },
    [screenToFlowPosition, setNodes, saveFlow]
  );

  return (
    <>
      <div className="flex justify-between gap-3">
        <div className="flex flex-row gap-3">
          <button className="btn " onClick={() => fitView()}>
            <MagnifyingGlassPlusIcon className="h-5 w-5" />
            Fit Screen
          </button>

          <button className="btn btn-accent" onClick={saveFlow}>
            <IoSaveOutline className="h-5 w-5" />
            Save
          </button>

          <button
            className="btn border-2 bg-white text-black hover:bg-gray-100"
            onClick={handleDatasetModalOpen}
          >
            <CircleStackIcon className="h-5 w-5" />
            Dataset parameters
          </button>
        </div>
        <div className="flex flex-row gap-3">
          <button className="btn" onClick={clearAllExceptDataset}>
            <XMarkIcon className="h-5 w-5" />
            Clear
          </button>
        </div>
      </div>
      <ReactFlow
        className="inset-0 flex-grow rounded-lg bg-transparent"
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
        attributionPosition="top-right"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName}></MiniMap>
        <Controls></Controls>
        <Background></Background>
      </ReactFlow>
    </>
  );
}

const Flow = ({
  handleDatasetModalOpen,
  onGetConnections,
}: {
  handleDatasetModalOpen: any;
  onGetConnections: any;
}) => (
  <ReactFlowProvider>
    <LayoutFlow
      handleDatasetModalOpen={handleDatasetModalOpen}
      onGetConnections={onGetConnections}
      connectionType="one-to-one"
    />
  </ReactFlowProvider>
);

export default Flow;
