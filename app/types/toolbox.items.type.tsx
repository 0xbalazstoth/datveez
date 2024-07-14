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
  isRecommended?: boolean;
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
    isRecommended: typeOfNode.LowercasingNode.isRecommended,
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
    isRecommended: typeOfNode.PunctuationNode.isRecommended,
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
    isRecommended: typeOfNode.NumbersNode.isRecommended,
  },
  {
    id: typeOfNode.SpecialCharactersNode.name,
    name: typeOfNode.SpecialCharactersNode.name,
    category: typeOfNode.SpecialCharactersNode.category,
    tip: typeOfNode.SpecialCharactersNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.SpecialCharactersNode.nodeComponentName),
    icon: typeOfNode.SpecialCharactersNode.icon,
    borderColor: typeOfNode.SpecialCharactersNode.borderColor,
    isRecommended: typeOfNode.SpecialCharactersNode.isRecommended,
  },
  {
    id: typeOfNode.URLSNode.name,
    name: typeOfNode.URLSNode.name,
    category: typeOfNode.URLSNode.category,
    tip: typeOfNode.URLSNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.URLSNode.nodeComponentName),
    icon: typeOfNode.URLSNode.icon,
    borderColor: typeOfNode.URLSNode.borderColor,
    isRecommended: typeOfNode.URLSNode.isRecommended,
  },
  {
    id: typeOfNode.StopwordsNode.name,
    name: typeOfNode.StopwordsNode.name,
    category: typeOfNode.StopwordsNode.category,
    tip: typeOfNode.StopwordsNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.StopwordsNode.nodeComponentName),
    icon: typeOfNode.StopwordsNode.icon,
    borderColor: typeOfNode.StopwordsNode.borderColor,
    isRecommended: typeOfNode.StopwordsNode.isRecommended,
  },
  {
    id: typeOfNode.EmojiNode.name,
    name: typeOfNode.EmojiNode.name,
    category: typeOfNode.EmojiNode.category,
    tip: typeOfNode.EmojiNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.EmojiNode.nodeComponentName),
    icon: typeOfNode.EmojiNode.icon,
    borderColor: typeOfNode.EmojiNode.borderColor,
    isRecommended: typeOfNode.EmojiNode.isRecommended,
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
    isRecommended: typeOfNode.CustomRegexNode.isRecommended,
  },
];

export const createColumnToolboxItems = (
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => void,
  typeOfNode: any
): ToolboxItemType[] => [
  {
    id: typeOfNode.ColumnNode.name,
    name: typeOfNode.ColumnNode.name,
    category: typeOfNode.ColumnNode.category,
    tip: typeOfNode.ColumnNode.tip,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
      onDragStart(event, typeOfNode.ColumnNode.nodeComponentName),
    icon: typeOfNode.ColumnNode.icon,
    borderColor: typeOfNode.ColumnNode.borderColor,
  },
];
