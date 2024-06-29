import { MarkerType } from "reactflow";
import "./node-edges.style.css";
import typeOfNode from "../types/node.type";

const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: typeOfNode.DatasetNode,
    data: {
      label: "Dataset",
      sourceCount: 0,
      targetCount: 1,
      isInitial: true,
    },
    position,
    className: "animated-gradient",
    type: "selectorNode",
  },
];

export const initialEdges = [];
