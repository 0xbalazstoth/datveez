import React from "react";

interface BuilderStepProps {
  children: React.ReactNode;
}

export default function BuilderStep(props: BuilderStepProps) {
  const { children } = props;
  return (
    <div className="inset-0 flex-grow rounded-lg bg-transparent bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]">
      {children}
    </div>
  );
}
