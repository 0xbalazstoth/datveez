import React, { useState } from "react";

interface NodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
}

const NodeItem: React.FC<NodeProps> = ({ id, label, x, y }) => {
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrag = (e: MouseEvent) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  return (
    <div
      className="absolute bg-blue-500 text-white p-2 rounded shadow cursor-move"
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
    >
      {label}
    </div>
  );
};

export default NodeItem;
