import React, { useEffect } from "react";
import { Step } from "../types/step.type";

interface StepsProps {
  steps: Step[];
}

export default function Steps(props: StepsProps) {
  const { steps } = props;

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  return (
    <div className="flex justify-center">
      <ul className="steps mx-auto">
        {steps
          .sort((a, b) => a.order - b.order)
          .map((step, index) => (
            <li
              key={step.id}
              className={`step text-black ${
                step.isCompleted ? "step-accent" : ""
              }`}
            >
              {step.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
