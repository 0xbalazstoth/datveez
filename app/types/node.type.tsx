import { ToolboxCategory } from "./toolbox.categories.type";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { VscCaseSensitive, VscRegex } from "react-icons/vsc";
import React from "react";

import {
  lowercasingNode,
  InitialNode,
  punctuationNode,
  numbersNode,
  customRegexNode,
} from "../flow editor/toolbox nodes/index";

const nodeCategoryColors = {
  Normalization: "border-accent",
  Remove: "border-red-300",
  CustomRegex: "border-yellow-300",
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
    isRecommended: true,
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
  NumbersNode: {
    name: "Numbers",
    nodeHandlerId: "NumbersNode",
    nodeComponentName: "numbersNode",
    category: ToolboxCategory.Remove,
    tip: "Remove numbers",
    icon: React.createElement("span", null, "123"),
    borderColor: nodeCategoryColors.Remove,
    isRecommended: true,
  },
  CustomRegexNode: {
    name: "Custom",
    nodeHandlerId: "CustomRegexNode",
    nodeComponentName: "customRegexNode",
    category: ToolboxCategory.CustomRegex,
    tip: "Custom regex",
    icon: <VscRegex className="h-5 w-5" />,
    borderColor: nodeCategoryColors.CustomRegex,
  },
};

const nodeComponentTypes = {
  selectorNode: InitialNode,
  lowercasingNode: lowercasingNode,
  punctuationNode: punctuationNode,
  numbersNode: numbersNode,
  customRegexNode: customRegexNode,
};

export { typeOfNode, nodeCategoryColors, nodeComponentTypes };
