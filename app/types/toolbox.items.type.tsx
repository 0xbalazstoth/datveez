import { ToolboxCategory } from "./toolbox.categories.type";

export interface ToolboxItemType {
  id: string;
  name: string;
  category: ToolboxCategory;
  tip: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  icon: string;
  borderColor: string;
  onClick?: () => void;
}

export const createNormalizationToolboxItems = (
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => void,
  handleLowercasing: () => void,
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
    onClick: handleLowercasing,
  },
  {
    id: typeOfNode.TokenizationNode.name,
    name: typeOfNode.TokenizationNode.name,
    category: typeOfNode.TokenizationNode.category,
    tip: typeOfNode.TokenizationNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.TokenizationNode.nodeComponentName),
    icon: typeOfNode.TokenizationNode.icon,
    borderColor: typeOfNode.TokenizationNode.borderColor,
  },
];
