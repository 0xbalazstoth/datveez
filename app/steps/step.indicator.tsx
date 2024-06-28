import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Step } from "../types/step.type";

interface StepIndicatorProps {
  currentStepIndex: number;
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
}

export default function StepIndicator(props: StepIndicatorProps) {
  const { currentStepIndex, steps, setSteps, setCurrentStepIndex } = props;

  const goToNextStep = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      if (currentStepIndex < newSteps.length - 1) {
        newSteps[currentStepIndex].isCompleted = true;
      }
      return newSteps;
    });
    setCurrentStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, steps.length - 1)
    );
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        if (newIndex < newSteps.length) {
          newSteps[newIndex].isCompleted = false;
        }
        return newSteps;
      });
      return newIndex;
    });
  };

  return (
    <div className="flex flex-row gap-3">
      {currentStepIndex !== 0 ? (
        <button className="btn" onClick={goToPreviousStep}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      ) : null}

      {currentStepIndex !== steps.length - 1 ? (
        <button className="btn" onClick={goToNextStep}>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}
