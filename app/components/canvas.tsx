import React, { useState } from "react";
import NodeItem from "./node";

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
}

const initialNodes: NodeData[] = [
  { id: "node-1", label: "Node 1", x: 100, y: 100 },
  { id: "node-2", label: "Node 2", x: 300, y: 200 },
];

const Canvas: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);

  return (
    <div className="relative w-full h-screen">
      {nodes.map((node) => (
        <NodeItem key={node.id} {...node} />
      ))}
    </div>
  );
};

export default Canvas;
