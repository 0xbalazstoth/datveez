import { ToolboxCategory } from "./toolbox.categories.type";

export interface ToolboxItemType {
  id: string;
  name: string;
  category: ToolboxCategory;
  tip: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  icon: string;
  borderColor: string;
  onDoubleClick?: () => void;
}

export const createNormalizationToolboxItems = (
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => void,
  typeOfNode: any
): ToolboxItemType[] => [
  {
    id: typeOfNode.LowercasingNode.name,
    name: typeOfNode.LowercasingNode.name,
    category: typeOfNode.LowercasingNode.category,
    tip: typeOfNode.LowercasingNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.LowercasingNode.nodeComponentName),
    icon: typeOfNode.LowercasingNode.icon,
    borderColor: typeOfNode.LowercasingNode.borderColor,
  },
];

export const createRemovalToolboxItems = (
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => void,
  typeOfNode: any
): ToolboxItemType[] => [
  {
    id: typeOfNode.PunctuationNode.name,
    name: typeOfNode.PunctuationNode.name,
    category: typeOfNode.PunctuationNode.category,
    tip: typeOfNode.PunctuationNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.PunctuationNode.nodeComponentName),
    icon: typeOfNode.PunctuationNode.icon,
    borderColor: typeOfNode.PunctuationNode.borderColor,
  },
  {
    id: typeOfNode.NumbersNode.name,
    name: typeOfNode.NumbersNode.name,
    category: typeOfNode.NumbersNode.category,
    tip: typeOfNode.NumbersNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.NumbersNode.nodeComponentName),
    icon: typeOfNode.NumbersNode.icon,
    borderColor: typeOfNode.NumbersNode.borderColor,
  },
];

export const createCustomToolboxItems = (
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => void,
  typeOfNode: any
): ToolboxItemType[] => [
  {
    id: typeOfNode.CustomRegexNode.name,
    name: typeOfNode.CustomRegexNode.name,
    category: typeOfNode.CustomRegexNode.category,
    tip: typeOfNode.CustomRegexNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.CustomRegexNode.nodeComponentName),
    icon: typeOfNode.CustomRegexNode.icon,
    borderColor: typeOfNode.CustomRegexNode.borderColor,
  },
];
