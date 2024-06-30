import { ToolboxCategory } from "./toolbox.categories.type";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { VscCaseSensitive } from "react-icons/vsc";
import React from "react";

const nodeCategoryColors = {
  Normalization: "border-accent",
  Remove: "border-red-300",
};

const typeOfNode = {
  DatasetNode: "DatasetNode",
  LowercasingNode: {
    name: "Lowercasing",
    nodeHandlerId: "LowercasingNode",
    nodeComponentName: "lowercasingNode",
    category: ToolboxCategory.Normalization,
    tip: "Lowercase text",
    icon: <VscCaseSensitive className="h-5 w-5" />,
    borderColor: nodeCategoryColors.Normalization,
  },
  TokenizationNode: {
    name: "Tokenization",
    nodeHandlerId: "TokenizationNode",
    nodeComponentName: "tokenizationNode",
    category: ToolboxCategory.Tokenization,
    tip: "Tokenize text into words",
    icon: <MdOutlineGeneratingTokens className="h-5 w-5" />,
    borderColor: nodeCategoryColors.Normalization,
  },
  PunctuationNode: {
    name: "Punctuation",
    nodeHandlerId: "PunctuationNode",
    nodeComponentName: "punctuationNode",
    category: ToolboxCategory.Remove,
    tip: "Remove punctuation",
    icon: React.createElement("span", null, "?.!"),
    borderColor: nodeCategoryColors.Remove,
  },
};

export { typeOfNode, nodeCategoryColors };
