import { typeOfNode } from "../types/node.type";
import { ToolboxCategory } from "../types/toolbox.categories.type";

interface ToolboxItemProps {
  name: string;
  category?: ToolboxCategory;
  isDropped?: boolean;
  tip?: string;
  id: string | null;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  borderColor: string;
  isRecommended?: boolean;
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
    onClick: onDoubleClick,
    borderColor,
    isRecommended = false,
  } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "o" && onDoubleClick) {
      onDoubleClick();
    }
  };

  return (
    <div className={isRecommended ? "w-full indicator" : "w-full"}>
      {isRecommended ? (
        <span className="indicator-item indicator-top indicator-center badge badge-info">
          recommended
        </span>
      ) : null}
      <div
        className={`bg-base-200 rounded-lg p-2 border-l-4 ${borderColor} w-full dndnode ${
          isDropped ? "w-[250px]" : ""
        } ${!isDropped ? "tooltip" : ""}`}
        draggable={!disabled && onDragStart ? true : false}
        {...(tip ? { "data-tip": tip } : {})}
        onDragStart={(event) =>
          !disabled && onDragStart && onDragStart(event, id as string)
        }
        onDoubleClick={onDoubleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          transform: "translate(0px, 0px)",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div className="flex gap-4 items-center justify-between">
          <div>
            <span className="font-thin text-gray-100">{name}</span>
          </div>
          {icon ? <div>{icon}</div> : null}
        </div>

        {children}
      </div>
    </div>
  );
}
