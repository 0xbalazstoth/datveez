import React, { useState, useRef, useEffect } from "react";
import NodeItem from "./node";

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Connection {
  from: { id: string; x: number; y: number };
  to: { id: string; x: number; y: number };
}

const initialNodes: NodeData[] = [
  { id: "node-1", label: "Node 1", x: 100, y: 100 },
  { id: "node-2", label: "Node 2", x: 300, y: 200 },
];

const Canvas: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentConnection, setCurrentConnection] = useState<{
    from: { id: string; x: number; y: number } | null;
  }>({ from: null });
  const [tempConnection, setTempConnection] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartConnection = (id: string, x: number, y: number) => {
    setCurrentConnection({ from: { id, x, y } });
    setTempConnection({ x, y });
  };

  const handleEndConnection = (id: string, x: number, y: number) => {
    if (currentConnection.from) {
      setConnections([
        ...connections,
        { from: currentConnection.from, to: { id, x, y } },
      ]);
      setCurrentConnection({ from: null });
      setTempConnection(null);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (currentConnection.from) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setTempConnection({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  useEffect(() => {
    const drawConnections = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((connection) => {
        context.beginPath();
        context.moveTo(connection.from.x, connection.from.y);
        context.quadraticCurveTo(
          (connection.from.x + connection.to.x) / 2,
          (connection.from.y + connection.to.y) / 2,
          connection.to.x,
          connection.to.y
        );
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();
      });

      if (currentConnection.from && tempConnection) {
        context.beginPath();
        context.moveTo(currentConnection.from.x, currentConnection.from.y);
        context.quadraticCurveTo(
          (currentConnection.from.x + tempConnection.x) / 2,
          (currentConnection.from.y + tempConnection.y) / 2,
          tempConnection.x,
          tempConnection.y
        );
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.setLineDash([5, 5]); // dashed line for loose connection
        context.stroke();
        context.setLineDash([]); // reset to solid line
      }
    };

    drawConnections();
  }, [connections, currentConnection, tempConnection]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentConnection]);

  return (
    <div className="relative w-full h-screen">
      <canvas
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {nodes.map((node) => (
        <NodeItem
          key={node.id}
          {...node}
          onStartConnection={handleStartConnection}
          onEndConnection={handleEndConnection}
        />
      ))}
    </div>
  );
};

export default Canvas;
