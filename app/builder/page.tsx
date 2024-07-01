"use client";

import { useEffect, useState } from "react";
import ToolboxItem from "../components/toolbox.item";
import StepsLayout from "../layouts/steps.layout";
import Sidebar from "../components/sidebar";
import Steps from "../components/steps";
import SmallScreenMessage from "../components/small.screen.message";
import BuilderStep from "../steps/builder.step";
import UploadStep from "../steps/upload.step";
import NormalizeStep from "../steps/normalize.step";
import StepIndicator from "../components/step.indicator";
import { StepsProvider, useSteps } from "../contexts/steps.context";
import { StepName } from "../types/step.type";
import { nodeCategoryColors, typeOfNode } from "../types/node.type";
import ToolboxGroup from "../components/toolbox.group";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  createNormalizationToolboxItems,
  createRemovalToolboxItems,
  createCustomToolboxItems,
  ToolboxItemType,
} from "../types/toolbox.items.type";

interface StepsPageProps {}

const StepsPageContent = (props: StepsPageProps) => {
  const {} = props;

  const { steps, currentStepIndex, uploadedFile } = useSteps();

  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    const target = `target-${nodeType}`;
    const source = `source-${nodeType}`;
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("target", target);
    event.dataTransfer.setData("source", source);
    event.dataTransfer.effectAllowed = "move";
  };

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

  const normalizationToolboxItems = createNormalizationToolboxItems(
    onDragStart,
    typeOfNode
  );

  const removalToolboxItems = createRemovalToolboxItems(
    onDragStart,
    typeOfNode
  );

  const customToolboxItems = createCustomToolboxItems(onDragStart, typeOfNode);

  return (
    <StepsLayout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col min-h-screen">
          <div className="relative flex flex-row items-center">
            <StepIndicator />

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Steps steps={steps}></Steps>
            </div>

            {uploadedFile ? (
              <div className="ml-auto badge badge-neutral p-4 text-white font-bold flex gap-2">
                <InformationCircleIcon className="h-6 w-6" />
                Navigate with arrow keys!
              </div>
            ) : null}
          </div>

          <div className="divider"></div>

          {/* Render the current step */}
          {renderCurrentStep()}
        </div>
        <Sidebar>
          <div className="flex flex-col gap-2 mt-10">
            <ToolboxGroup
              borderColor={nodeCategoryColors.Normalization}
              title={`Normalization (${normalizationToolboxItems.length})`}
            >
              {normalizationToolboxItems.map(
                (item: ToolboxItemType, index: React.Key) => (
                  <ToolboxItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    tip={item.tip}
                    onDragStart={item.onDragStart}
                    icon={item.icon}
                    borderColor={item.borderColor}
                    onClick={item.onDoubleClick}
                    isRecommended={item.isRecommended}
                  />
                )
              )}
            </ToolboxGroup>

            <ToolboxGroup
              borderColor={nodeCategoryColors.Remove}
              title={`Removal (${removalToolboxItems.length})`}
            >
              {removalToolboxItems.map(
                (item: ToolboxItemType, index: React.Key) => (
                  <ToolboxItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    tip={item.tip}
                    onDragStart={item.onDragStart}
                    icon={item.icon}
                    borderColor={item.borderColor}
                    onClick={item.onDoubleClick}
                    isRecommended={item.isRecommended}
                  />
                )
              )}
            </ToolboxGroup>

            <ToolboxGroup
              borderColor={nodeCategoryColors.CustomRegex}
              title={`Custom (${customToolboxItems.length})`}
            >
              {customToolboxItems.map(
                (item: ToolboxItemType, index: React.Key) => (
                  <ToolboxItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    tip={item.tip}
                    onDragStart={item.onDragStart}
                    icon={item.icon}
                    borderColor={item.borderColor}
                    onClick={item.onDoubleClick}
                    isRecommended={item.isRecommended}
                  />
                )
              )}
            </ToolboxGroup>
          </div>
        </Sidebar>
      </div>
    </StepsLayout>
  );
};

export default function StepsPage(props: StepsPageProps) {
  return (
    <StepsProvider>
      <StepsPageContent {...props} />
    </StepsProvider>
  );
}
