interface ToolboxItemProps {
  name: string;
}

export default function ToolboxItem(props: ToolboxItemProps) {
  const { name } = props;

  return (
    <div className="bg-base-200 rounded-lg p-2">
      <div className="bg-white h-full w-2"></div>
      <span>{name}</span>
    </div>
  );
}
