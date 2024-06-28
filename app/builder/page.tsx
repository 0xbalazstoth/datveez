"use client";

import { useRef, useState } from "react";
import ToolboxItem from "../components/toolbox.item";
import StepsLayout from "../layouts/steps.layout";
import BuilderStep from "../steps/builder.step";
import Sidebar from "../components/sidebar";
import Steps from "../components/steps";
import { Step, StepName } from "../types/step.type";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import Flow from "../flow editor/flow";
import Modal from "../components/modal";
import {
  PlusIcon,
  MagnifyingGlassPlusIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

interface StepsPageProps {}

export default function StepsPage(props: StepsPageProps) {
  const {} = props;

  const steps: Step[] = [
    {
      name: StepName.Upload,
      isCompleted: true,
      order: 1,
      id: Math.random().toString(),
    },
    {
      name: StepName.Build,
      isCompleted: true,
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

  const datasetModalRef = useRef<HTMLDialogElement>(null);

  const handleDatasetModalOpen = () => {
    datasetModalRef.current?.showModal();

    console.log("OPEN DA");
  };

  const handleDatasetModalClose = () => {
    datasetModalRef.current?.close();
  };

  const handleGetConnections = (connections: any) => {
    console.log("Connections from Flow:", connections);
    // Do something with the connections
  };

  return (
    <StepsLayout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col min-h-screen">
          <div className="flex flex-col justify-center items-center">
            <Steps steps={steps}></Steps>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-black drawer-button lg:hidden mt-4 w-[300px]"
            >
              Show toolbox
            </label>
          </div>

          {/* Upload dataset step */}

          {/* Build step */}
          <BuilderStep>
            <Flow
              handleDatasetModalOpen={handleDatasetModalOpen}
              onGetConnections={handleGetConnections}
            ></Flow>
          </BuilderStep>

          <Modal
            title="Dataset parameters"
            onClose={handleDatasetModalClose}
            id="dataset_modal"
            ref={datasetModalRef}
          >
            <span>Dataset modal</span>
          </Modal>

          {/* Normalize step */}
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
    </StepsLayout>
  );
}
