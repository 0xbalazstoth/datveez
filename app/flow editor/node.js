import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const charIds = ["a", "b", "c", "d"];

export default memo(function CustomNode({
  data,
  isConnectable,
  xPos,
  yPos,
  id,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { targetCount, sourceCount } = data;

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Array.from({ length: sourceCount }).map((_, index) => {
        const dotPosition = index * 20 + 20 + "%";
        return (
          <Handle
            key={index}
            type="target"
            id={charIds[index]}
            position={Position.Top}
            style={{ left: dotPosition, background: "#000" }}
          />
        );
      })}
      <div
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "16px",
          fontSize: "12px",
          border: data.isInitial ? "none" : "1px solid #000",
          position: "relative",
        }}
      >
        {data.label}
        {isHovered && (
          <button
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
            onClick={() => data.onDelete(id)}
          >
            x
          </button>
        )}
      </div>
      {Array.from({ length: targetCount }).map((_, index) => {
        const dotPosition = index * 20 + 20 + "%";
        return (
          <Handle
            key={index}
            type="source"
            id={charIds[index]}
            position={Position.Bottom}
            style={{ left: dotPosition, background: "#000" }}
          />
        );
      })}
    </div>
  );
});
