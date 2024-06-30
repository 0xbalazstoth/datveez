import { useState } from "react";

interface ToolboxGroupProps {
  title: string;
  children: React.ReactNode;
  borderColor: string;
}

export default function ToolboxGroup(props: ToolboxGroupProps) {
  const { title, children, borderColor } = props;
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`border-l-4 ${borderColor} collapse collapse-plus bg-gray-800`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="collapse-title text-xl font-medium text-white">
        {title}
      </div>
      <div className="collapse-content">
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
