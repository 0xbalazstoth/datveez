// steps/builder.step.tsx
import { useRef, useEffect, useState } from "react";
import Modal from "../components/modal";
import Flow from "../flow editor/flow";
import { useSteps } from "../contexts/steps.context";

interface BuilderStepProps {}

export default function BuilderStep(props: BuilderStepProps) {
  const {} = props;
  const { uploadedFile } = useSteps();
  const datasetModalRef = useRef<HTMLDialogElement>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleDatasetModalOpen = () => {
    datasetModalRef.current?.showModal();
  };

  const handleDatasetModalClose = () => {
    datasetModalRef.current?.close();
  };

  const handleGetConnections = (connections: any) => {
    console.log("Connections from Flow:", connections);
  };

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (content) {
          setFileContent(content.toString());
        }
      };
      reader.readAsText(uploadedFile);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (fileContent) {
      console.log("File content in BuilderStep:", fileContent);
    }
  }, [fileContent]);

  return (
    <>
      <Flow
        handleDatasetModalOpen={handleDatasetModalOpen}
        onGetConnections={handleGetConnections}
      ></Flow>

      <Modal
        title="Dataset parameters"
        onClose={handleDatasetModalClose}
        id="dataset_modal"
        ref={datasetModalRef}
      >
        <span>Dataset modal</span>
      </Modal>
    </>
  );
}
