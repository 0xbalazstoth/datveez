import { typeOfNode } from "../types/node.type";
import { ToolboxCategory } from "../types/toolbox.categories.type";

interface ToolboxItemProps {
  name: string;
  category?: ToolboxCategory;
  isDropped?: boolean;
  tip?: string;
  id: string;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  borderColor: string;
}

export default function ToolboxItem(props: ToolboxItemProps) {
  const {
    name,
    isDropped = false,
    tip,
    onDragStart,
    id,
    children,
    disabled = false,
    icon,
    onClick,
    borderColor,
  } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "o" && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`bg-base-200 rounded-lg p-2 border-l-4 ${borderColor} dndnode ${
        isDropped ? "w-[250px]" : ""
      } ${!isDropped ? "tooltip" : ""}`}
      draggable={!disabled && onDragStart ? true : false}
      {...(tip ? { "data-tip": tip } : {})}
      onDragStart={(event) =>
        !disabled && onDragStart && onDragStart(event, id)
      }
      onDoubleClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make div focusable to receive key events
      style={{ transform: "translate(0px, 0px)", opacity: disabled ? 0.5 : 1 }}
    >
      <div className="flex gap-4 items-center justify-between">
        <div>
          <span className="font-thin text-gray-100">{name}</span>
        </div>
        {icon ? <div>{icon}</div> : null}
      </div>

      {children}
    </div>
  );
}
