import { ToolboxCategory } from "./toolbox.categories.type";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { VscCaseSensitive, VscRegex } from "react-icons/vsc";
import React from "react";
import { GiStopSign } from "react-icons/gi";
import { TbColumns } from "react-icons/tb";

import {
  LowercasingNode,
  InitialNode,
  punctuationNode,
  numbersNode,
  CustomRegexNode,
  StopwordsNode,
} from "../flow editor/toolbox nodes/index";
import SpecialCharactersNode from "../flow editor/toolbox nodes/SpecialCharactersNode";
import URLSNode from "../flow editor/toolbox nodes/URLSNode";
import ColumnNode from "../flow editor/toolbox nodes/ColumnNode";

const nodeCategoryColors = {
  Normalization: "border-accent",
  Remove: "border-red-300",
  CustomRegex: "border-yellow-300",
  Column: "border-blue-300",
};

const typeOfNode = {
  DatasetNode: "DatasetNode",
  LowercasingNode: {
    name: "Lowercasing",
    nodeHandlerId: "LowercasingNode",
    nodeComponentName: "LowercasingNode",
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
    nodeComponentName: "CustomRegexNode",
    category: ToolboxCategory.CustomRegex,
    tip: "Custom regex",
    icon: <VscRegex className="h-5 w-5" />,
    borderColor: nodeCategoryColors.CustomRegex,
  },
  SpecialCharactersNode: {
    name: "Special Characters",
    nodeHandlerId: "SpecialCharactersNode",
    nodeComponentName: "SpecialCharactersNode",
    category: ToolboxCategory.Remove,
    tip: "Remove special characters",
    icon: React.createElement("span", null, "!@#"),
    borderColor: nodeCategoryColors.Remove,
  },
  URLSNode: {
    name: "URLS",
    nodeHandlerId: "URLSNode",
    nodeComponentName: "URLSNode",
    category: ToolboxCategory.Remove,
    tip: "Remove URLs",
    icon: React.createElement("span", null, "http(s)"),
    borderColor: nodeCategoryColors.Remove,
  },
  StopwordsNode: {
    name: "Stopwords",
    nodeHandlerId: "StopwordsNode",
    nodeComponentName: "StopwordsNode",
    category: ToolboxCategory.Remove,
    tip: "Remove stopwords",
    icon: <GiStopSign className="h-5 w-5" />,
    borderColor: nodeCategoryColors.Remove,
  },
  ColumnNode: {
    name: "Column",
    nodeHandlerId: "ColumnNode",
    nodeComponentName: "ColumnNode",
    category: ToolboxCategory.Column,
    tip: "Column",
    icon: <TbColumns className="h-5 w-5" />,
    borderColor: nodeCategoryColors.Column,
  },
};

const nodeComponentTypes = {
  selectorNode: InitialNode,
  LowercasingNode: LowercasingNode,
  punctuationNode: punctuationNode,
  numbersNode: numbersNode,
  CustomRegexNode: CustomRegexNode,
  StopwordsNode: StopwordsNode,
  URLSNode: URLSNode,
  ColumnNode: ColumnNode,
  SpecialCharactersNode: SpecialCharactersNode,
};

export { typeOfNode, nodeCategoryColors, nodeComponentTypes };
