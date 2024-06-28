import { MarkerType } from "reactflow";
import "./node-edges.style.css";

const position = { x: 0, y: 0 };
export const initialNodes = [
  {
    id: "Dataset",
    data: { label: "Dataset", sourceCount: 0, targetCount: 1, isInitial: true },
    position,
    // style: {
    //   borderRadius: "16px",
    //   background: "linear-gradient(135deg, #0B4ADB, #09C1FD)",
    //   color: "#fff",
    // },
    className: "animated-gradient",
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
