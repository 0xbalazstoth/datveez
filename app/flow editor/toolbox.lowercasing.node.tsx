import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import typeOfNode from "../types/node.type";

function LowercasingNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name="Lowercasing"
      category={ToolboxCategory.Normalization}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
        id={`target-${typeOfNode.LowercasingNode}`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
        id={`source-${typeOfNode.LowercasingNode}`}
      />
    </ToolboxItem>
  );
}

export default memo(LowercasingNode);
