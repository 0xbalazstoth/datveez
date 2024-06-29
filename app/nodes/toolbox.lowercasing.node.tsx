import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { ToolboxCategory } from "../types/toolbox.categories.type";

function LowercasingNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name="Lowercasing"
      category={ToolboxCategory.Remove}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
      />
    </ToolboxItem>
  );
}

export default memo(LowercasingNode);
