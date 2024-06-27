"use client";

import ToolboxItem from "../components/toolbox.item";
import BuilderLayout from "../layouts/builder.layout";
import GridLayout from "../layouts/grid.layout";
import Sidebar from "../components/sidebar";
import Steps from "../components/steps";
import Step from "../types/step.type";

interface BuilderPageProps {}

export default function BuilderPage(props: BuilderPageProps) {
  const {} = props;

  const steps: Step[] = [
    {
      name: "Upload",
      isCompleted: true,
      order: 1,
      id: Math.random().toString(),
    },
    {
      name: "Build",
      isCompleted: false,
      order: 2,
      id: Math.random().toString(),
    },
    {
      name: "Normalize",
      isCompleted: false,
      order: 3,
      id: Math.random().toString(),
    },
  ];

  return (
    <BuilderLayout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col min-h-screen">
          <Steps steps={steps}></Steps>

          <div className="divider"></div>

          <GridLayout>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-secondary drawer-button lg:hidden mt-4"
            >
              Open drawer
            </label>
          </GridLayout>
        </div>
        <Sidebar>
          <div className="flex flex-col gap-2 mt-10">
            <ToolboxItem name="Lowercasing"></ToolboxItem>
            <ToolboxItem name="Tokenization"></ToolboxItem>
          </div>
        </Sidebar>
      </div>
    </BuilderLayout>
  );
}
