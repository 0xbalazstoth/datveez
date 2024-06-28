import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const charIds = ["a", "b", "c", "d"];

export default memo(function CustomNode({ data, isConnectable, xPos, yPos }) {
  const { targetCount, sourceCount } = data;
  console.log({ xPos, yPos });
  return (
    <>
      {/* Target dots for each number of sourceCount */}
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
        }}
      >
        {data.label}
      </div>
      {/* Source dots for each number of targetCount */}
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
    </>
  );
});
