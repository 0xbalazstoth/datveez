import React, { memo, useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import ToolboxItem from "../../components/toolbox.item";
import { typeOfNode } from "../../types/node.type";
import Modal from "../../components/modal";
import ReactDiffViewer from "react-diff-viewer-continued";
import { useSteps } from "../../contexts/steps.context";
import { removeEmoji } from "@/app/utils/utils";

function EmojiNode() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { setIsEditingMode } = useSteps();

  const handleModalOpen = () => {
    modalRef.current?.showModal();
    setIsEditingMode(true);
  };

  const handleModalClose = () => {
    modalRef.current?.close();
    setIsEditingMode(false);
  };

  const defaultText = "ExAm😀😃😄😁PLE";
  const normalizedText = removeEmoji(defaultText);

  const [oldText, setOldText] = useState<string>(defaultText);
  const [newText, setNewText] = useState<string>(removeEmoji(oldText));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOldText(value);
    setNewText(removeEmoji(value));
  };

  return (
    <>
      <ToolboxItem
        id={Math.random().toString()}
        name={typeOfNode.EmojiNode.name}
        category={typeOfNode.EmojiNode.category}
        icon={typeOfNode.EmojiNode.icon}
        borderColor={typeOfNode.EmojiNode.borderColor}
        onClick={handleModalOpen}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-accent"
          id={typeOfNode.EmojiNode.nodeHandlerId}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-red-300"
          id={typeOfNode.EmojiNode.nodeHandlerId}
        />
      </ToolboxItem>
      <Modal
        title="Lowercasing"
        onClose={handleModalClose}
        id="lowercasing_modal"
        ref={modalRef}
      >
        <div className="flex flex-col gap-2 mt-5">
          <label className="input input-bordered flex items-center gap-2 text-gray-300">
            Input
            <input
              type="text"
              className="grow"
              placeholder={defaultText}
              value={oldText}
              onChange={handleInputChange}
              style={{ color: "white" }}
              maxLength={10}
            />
          </label>

          {oldText === "" ? (
            <ReactDiffViewer
              oldValue={defaultText}
              newValue={normalizedText}
              splitView={true}
              useDarkTheme={true}
            />
          ) : (
            <ReactDiffViewer
              oldValue={oldText}
              newValue={newText}
              splitView={true}
              useDarkTheme={true}
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default memo(EmojiNode);
