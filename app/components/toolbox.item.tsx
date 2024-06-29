import { ToolboxCategory } from "../types/toolbox.categories.type";

interface ToolboxItemProps {
  name: string;
  category: ToolboxCategory;
  isDropped?: boolean;
  tip?: string;
  id: string;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
  children?: React.ReactNode;
}

const categories = [
  {
    name: ToolboxCategory.Remove,
    color: "bg-red-300",
  },
  {
    name: ToolboxCategory.Tokenization,
    color: "bg-yellow-300",
  },
  {
    name: ToolboxCategory.Normalization,
    color: "bg-green-300",
  },
];

export default function ToolboxItem(props: ToolboxItemProps) {
  const {
    name,
    category,
    isDropped = false,
    tip,
    onDragStart,
    id,
    children,
  } = props;

  return (
    <div
      className={`bg-base-200 rounded-lg p-2 border-l-4 border-accent dndnode ${
        isDropped ? "w-[250px]" : ""
      } ${!isDropped ? "tooltip" : ""}`}
      draggable={onDragStart ? true : false}
      {...(tip ? { "data-tip": tip } : {})}
      onDragStart={(event) => onDragStart && onDragStart(event, id)}
      style={{ transform: "translate(0px, 0px)" }}
    >
      <div className="flex gap-4 items-center justify-between">
        <div>
          <span className="font-thin text-gray-100">{name}</span>
        </div>
        <div
          className={`flex ${
            categories.find((c) => c.name === category)?.color
          } h-3 w-8 rounded-lg`}
        ></div>
      </div>

      {children}
    </div>
  );
}
