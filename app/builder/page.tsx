"use client";

import { useState, useEffect } from "react";
import ToolboxItem from "../components/toolbox.item";
import StepsLayout from "../layouts/steps.layout";
import Sidebar from "../components/sidebar";
import Steps from "../components/steps";
import { Step, StepName } from "../types/step.type";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import SmallScreenMessage from "../components/small.screen.message";
import BuilderStep from "../steps/builder.step";
import UploadStep from "../steps/upload.step";
import NormalizeStep from "../steps/normalize.step";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Toast from "../components/toast";
import { ToastType } from "../types/toast.type";

interface StepsPageProps {}

const initialSteps: Step[] = [
  {
    name: StepName.Upload,
    isCompleted: true,
    order: 1,
    id: Math.random().toString(),
  },
  {
    name: StepName.Build,
    isCompleted: false,
    order: 2,
    id: Math.random().toString(),
  },
  {
    name: StepName.Normalize,
    isCompleted: false,
    order: 3,
    id: Math.random().toString(),
  },
];

export default function StepsPage(props: StepsPageProps) {
  const {} = props;

  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  if (!isClient) {
    return null;
  }

  if (isScreenSmall) {
    return <SmallScreenMessage />;
  }

  const renderCurrentStep = () => {
    switch (steps[currentStepIndex].name) {
      case StepName.Upload:
        return <UploadStep />;
      case StepName.Build:
        return <BuilderStep />;
      case StepName.Normalize:
        return <NormalizeStep />;
      default:
        return null;
    }
  };

  return (
    <StepsLayout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col min-h-screen">
          <div className="relative flex flex-row items-center">
            <div className="flex flex-row gap-3">
              {currentStepIndex !== 0 ? (
                <button className="btn" onClick={goToPreviousStep}>
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              ) : null}

              {currentStepIndex !== initialSteps.length - 1 ? (
                <button className="btn" onClick={goToNextStep}>
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Steps steps={steps}></Steps>
            </div>
          </div>

          <div className="divider"></div>

          {/* Render the current step */}
          {renderCurrentStep()}
        </div>
        <Sidebar>
          <div className="flex flex-col gap-2 mt-10">
            <ToolboxItem
              id={Math.random().toString()}
              name="Lowercasing"
              category={ToolboxCategory.Remove}
              tip="Lowercase all text"
            ></ToolboxItem>
            <ToolboxItem
              id={Math.random().toString()}
              name="Tokenization"
              category={ToolboxCategory.Tokenization}
              tip="Tokenize text into words"
            ></ToolboxItem>
            <ToolboxItem
              id={Math.random().toString()}
              name="Normalization"
              category={ToolboxCategory.Normalization}
              tip="Normalize text by removing special characters"
            ></ToolboxItem>
          </div>
        </Sidebar>
      </div>

      <Toast
        type={ToastType.Warning}
        message="You have to upload your dataset first!"
      ></Toast>
    </StepsLayout>
  );
}
