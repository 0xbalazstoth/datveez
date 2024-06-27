import React, { useState, useRef } from "react";

interface NodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  onStartConnection: (id: string, x: number, y: number) => void;
  onEndConnection: (id: string, x: number, y: number) => void;
}

const NodeItem: React.FC<NodeProps> = ({
  id,
  label,
  x,
  y,
  onStartConnection,
  onEndConnection,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: MouseEvent) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains("connector")) {
      return;
    }

    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    setOffset({ x: startX, y: startY });

    const onMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - startX,
        y: event.clientY - startY,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handleStartConnection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      onStartConnection(
        id,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    }
  };

  const handleEndConnection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      onEndConnection(
        id,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    }
  };

  return (
    <div
      ref={nodeRef}
      className="absolute bg-blue-500 text-white p-2 rounded shadow cursor-move"
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
    >
      {label}
      <div className="flex justify-between mt-2">
        <div
          className="connector bg-red-500 w-4 h-4 rounded-full cursor-pointer"
          onMouseDown={handleStartConnection}
        />
        <div
          className="connector bg-green-500 w-4 h-4 rounded-full cursor-pointer"
          onMouseDown={handleEndConnection}
        />
      </div>
    </div>
  );
};

export default NodeItem;
