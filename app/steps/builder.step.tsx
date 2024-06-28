import { useRef } from "react";
import Modal from "../components/modal";
import Flow from "../flow editor/flow";

interface BuilderStepProps {}

export default function BuilderStep(props: BuilderStepProps) {
  const {} = props;
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
