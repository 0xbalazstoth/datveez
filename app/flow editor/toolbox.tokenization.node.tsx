import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { ToolboxCategory } from "../types/toolbox.categories.type";

function TokenizationNode() {
  return (
    <ToolboxItem
      id={Math.random().toString()}
      name="Tokenization"
      category={ToolboxCategory.Tokenization}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-accent"
        itemType="tokenization_target"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-300"
        itemType="tokenization_source"
      />
    </ToolboxItem>
  );
}

export default memo(TokenizationNode);
