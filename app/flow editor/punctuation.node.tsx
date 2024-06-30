import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { typeOfNode } from "../types/node.type";

function PunctuationNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name={typeOfNode.PunctuationNode.name}
      category={typeOfNode.PunctuationNode.category}
      icon={typeOfNode.PunctuationNode.icon}
      borderColor={typeOfNode.PunctuationNode.borderColor}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
        id={typeOfNode.PunctuationNode.nodeHandlerId}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
        id={typeOfNode.PunctuationNode.nodeHandlerId}
      />
    </ToolboxItem>
  );
}

export default memo(PunctuationNode);
