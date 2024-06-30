import { useRef } from "react";
import Modal from "../components/modal";
import Flow from "../flow editor/flow";
import { useSteps } from "../contexts/steps.context";

interface BuilderStepProps {}

export default function BuilderStep(props: BuilderStepProps) {
  const {} = props;
  const { uploadedFile, fileData } = useSteps();
  const datasetModalRef = useRef<HTMLDialogElement>(null);

  const handleDatasetModalOpen = () => {
    datasetModalRef.current?.showModal();
  };

  const handleDatasetModalClose = () => {
    datasetModalRef.current?.close();
  };

  const handleGetConnections = (connections: any) => {
    console.log("Connections from Flow:", connections);
  };

  return (
    <>
      <Flow
        handleDatasetModalOpen={handleDatasetModalOpen}
        onGetConnections={handleGetConnections}
      />

      <Modal
        title="Dataset parameters"
        onClose={handleDatasetModalClose}
        id="dataset_modal"
        ref={datasetModalRef}
      >
        <span>{uploadedFile?.name}</span>
      </Modal>
    </>
  );
}
