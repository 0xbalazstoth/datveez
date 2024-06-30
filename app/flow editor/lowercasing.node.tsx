import React, { memo, useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../components/toolbox.item";
import { typeOfNode } from "../types/node.type";
import Modal from "../components/modal";
import ReactDiffViewer from "react-diff-viewer-continued";
import { useSteps } from "../contexts/steps.context";

function LowercasingNode() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { fileData, setIsEditingMode } = useSteps();

  useEffect(() => {
    console.log(fileData![0]);
  }, [fileData]);

  const handleModalOpen = () => {
    modalRef.current?.showModal();
    setIsEditingMode(true);
  };

  const handleModalClose = () => {
    modalRef.current?.close();
    setIsEditingMode(false);
  };

  const [oldText, setOldText] = useState<string>("This is the old text.");
  const [newText, setNewText] = useState<string>(
    "This is the new text with some changes."
  );

  return (
    <>
      <ToolboxItem
        id={Math.random().toString()}
        name={typeOfNode.LowercasingNode.name}
        category={typeOfNode.LowercasingNode.category}
        icon={typeOfNode.LowercasingNode.icon}
        borderColor={typeOfNode.LowercasingNode.borderColor}
        onClick={handleModalOpen}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-accent"
          id={typeOfNode.LowercasingNode.nodeHandlerId}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-red-300"
          id={typeOfNode.LowercasingNode.nodeHandlerId}
        />
      </ToolboxItem>
      <Modal
        title="Parameterize lowercasing"
        onClose={handleModalClose}
        id="lowercasing_modal"
        ref={modalRef}
      >
        <div className="flex flex-col gap-2 mt-5">
          <h1 className="text-gray-300">Example:</h1>

          <ReactDiffViewer
            oldValue={oldText}
            newValue={newText}
            splitView={true}
          />
        </div>
      </Modal>
    </>
  );
}

export default memo(LowercasingNode);
