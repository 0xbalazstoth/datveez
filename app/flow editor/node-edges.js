import { MarkerType } from "reactflow";
const position = { x: 0, y: 0 };
export const initialNodes = [
  {
    id: "Dataset",
    data: { label: "Dataset", sourceCount: 0, targetCount: 1, isInitial: true },
    position,
    style: {
      borderRadius: "16px",
      background: "linear-gradient(135deg, #A2E6AE, #37AC5C)",
      color: "#fff",
    },
    type: "selectorNode",
  },
];

export const initialEdges = [
  {
    id: "edge-1",
    source: "Dataset",
    target: "node-1",
    type: "custom",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
