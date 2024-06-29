import { MarkerType } from "reactflow";
import "./node-edges.style.css";

const position = { x: 0, y: 0 };
export const initialNodes = [
  {
    id: "Dataset",
    data: { label: "Dataset", sourceCount: 0, targetCount: 1, isInitial: true },
    position,
    className: "animated-gradient",
    type: "selectorNode",
  },
];

export const initialEdges = [];
