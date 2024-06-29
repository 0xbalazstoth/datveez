import { ToolboxCategory } from "./toolbox.categories.type";

const typeOfNode = {
  DatasetNode: "DatasetNode",
  LowercasingNode: {
    name: "Lowercasing",
    nodeHandlerId: "LowercasingNode",
    nodeComponentName: "lowercasingNode",
    category: ToolboxCategory.Normalization,
    tip: "Lowercase text",
  },
  TokenizationNode: {
    name: "Tokenization",
    nodeHandlerId: "TokenizationNode",
    nodeComponentName: "tokenizationNode",
    category: ToolboxCategory.Tokenization,
    tip: "Tokenize text into words",
  },
};

export default typeOfNode;
