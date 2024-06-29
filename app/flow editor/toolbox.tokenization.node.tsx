import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import typeOfNode from "../types/node.type";

function TokenizationNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name={typeOfNode.TokenizationNode.name}
      category={typeOfNode.TokenizationNode.category}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
        id={typeOfNode.TokenizationNode.nodeHandlerId}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
        id={typeOfNode.TokenizationNode.nodeHandlerId}
      />
    </ToolboxItem>
  );
}

export default memo(TokenizationNode);
