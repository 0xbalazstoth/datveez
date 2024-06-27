"use client";

import { useState } from "react";
import ToolboxItem from "../components/toolbox.item";
import StepsLayout from "../layouts/steps.layout";
import BuilderStep from "../steps/builder.step";
import Sidebar from "../components/sidebar";
import Steps from "../components/steps";
import { Step, StepName } from "../types/step.type";
import { ToolboxCategory } from "../types/toolbox.categories.type";
import { v4 as uuidv4 } from "uuid";
import Canvas from "../components/canvas";

interface StepsPageProps {}

export default function StepsPage(props: StepsPageProps) {
  const {} = props;

  const steps: Step[] = [
    {
      name: StepName.Build,
      isCompleted: true,
      order: 1,
      id: crypto.randomUUID(),
    },
    {
      name: "Build",
      isCompleted: true,
      order: 2,
      id: crypto.randomUUID(),
    },
    {
      name: "Normalize",
      isCompleted: false,
      order: 3,
      id: crypto.randomUUID(),
    },
  ];

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

          <div className="divider"></div>

          {/* Upload dataset step */}

          {/* Build step */}
          {/* https://retejs.org/examples/connection-path */}
          <BuilderStep>
            <Canvas />ą
          </BuilderStep>

          {/* Normalize step */}
        </div>
        <Sidebar>
          <div className="flex flex-col gap-2 mt-10">
            <ToolboxItem
              id={crypto.randomUUID()}
              name="Lowercasing"
              category={ToolboxCategory.Remove}
              tip="Lowercase all text"
            ></ToolboxItem>
            <ToolboxItem
              id={crypto.randomUUID()}
              name="Tokenization"
              category={ToolboxCategory.Tokenization}
              tip="Tokenize text into words"
            ></ToolboxItem>
            <ToolboxItem
              id={crypto.randomUUID()}
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
