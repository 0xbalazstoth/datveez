import ToolboxCategory from "../types/toolbox.categories.type";

interface ToolboxItemProps {
  name: string;
  category: ToolboxCategory;
}

const categories = [
  { name: ToolboxCategory.Remove, color: "bg-red-300" },
  { name: ToolboxCategory.Tokenization, color: "bg-yellow-300" },
  { name: ToolboxCategory.Normalization, color: "bg-green-300" },
];

export default function ToolboxItem(props: ToolboxItemProps) {
  const { name, category } = props;

  return (
    <div className="bg-base-200 rounded-lg p-2 border-l-4 border-accent">
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
    </div>
  );
}
