// components/step.indicator.tsx
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSteps } from "../contexts/steps.context";
import { useEffect } from "react";

export default function StepIndicator() {
  const {
    steps,
    currentStepIndex,
    goToNextStep,
    goToPreviousStep,
    uploadedFile,
  } = useSteps();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && uploadedFile !== null) {
        goToNextStep();
      } else if (e.key === "ArrowLeft") {
        goToPreviousStep();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextStep, goToPreviousStep, uploadedFile]);

  return (
    <div className="flex flex-row gap-3">
      {currentStepIndex !== 0 ? (
        <button className="btn" onClick={goToPreviousStep}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      ) : null}

      {currentStepIndex !== steps.length - 1 ? (
        <button
          className={`btn ${uploadedFile === null ? "cursor-not-allowed" : ""}`}
          onClick={() => uploadedFile && goToNextStep()}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}
