import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import { typeOfNode } from "../types/node.type";

function LowercasingNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name={typeOfNode.LowercasingNode.name}
      category={typeOfNode.LowercasingNode.category}
      icon={typeOfNode.LowercasingNode.icon}
      borderColor={typeOfNode.LowercasingNode.borderColor}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
        id={typeOfNode.LowercasingNode.nodeHandlerId}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
        id={typeOfNode.LowercasingNode.nodeHandlerId}
      />
    </ToolboxItem>
  );
}

export default memo(LowercasingNode);
