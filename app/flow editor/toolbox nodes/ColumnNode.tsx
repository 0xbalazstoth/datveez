import React, { memo, useState, useRef, useEffect } from "react";
import { Handle, Position, useNodeId } from "reactflow";
import ToolboxItem from "../../components/toolbox.item";
import { typeOfNode } from "../../types/node.type";
import Modal from "../../components/modal";
import { useSteps } from "../../contexts/steps.context";

function ColumnNode() {
  const nodeId = useNodeId();
  const {
    fileStats,
    columns: selectedColumns,
    setColumns: setSelectedColumns,
  } = useSteps();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { setIsEditingMode } = useSteps();
  const [selectedColumn, setSelectedColumnState] = useState<string | null>(
    null
  );

  const handleModalOpen = () => {
    modalRef.current?.showModal();
    setIsEditingMode(true);
  };

  const handleModalClose = () => {
    modalRef.current?.close();
    setIsEditingMode(false);
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value;
    if (column && !selectedColumns.includes(column)) {
      setSelectedColumnState(column);
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleClearSelection = () => {
    setSelectedColumnState(null);
    setSelectedColumns(selectedColumns.filter((col) => col !== selectedColumn));
  };

  useEffect(() => {
    return () => {
      // Cleanup column when node is deleted
      if (selectedColumn) {
        setSelectedColumns((cols) =>
          cols.filter((col) => col !== selectedColumn)
        );
      }
    };
  }, [selectedColumn, setSelectedColumns]);

  return (
    <>
      <ToolboxItem
        id={nodeId}
        name={typeOfNode.ColumnNode.name}
        category={typeOfNode.ColumnNode.category}
        icon={typeOfNode.ColumnNode.icon}
        borderColor={typeOfNode.ColumnNode.borderColor}
        onClick={handleModalOpen}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-accent"
          id={typeOfNode.ColumnNode.nodeHandlerId}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-red-300"
          id={typeOfNode.ColumnNode.nodeHandlerId}
        />
      </ToolboxItem>
      <Modal
        title="Select column"
        onClose={handleModalClose}
        id="column_modal"
        ref={modalRef}
      >
        <div className="flex flex-col gap-2 mt-5">
          <select
            className="select select-bordered w-full max-w-md"
            name="columns"
            id="columns"
            style={{ color: "white" }}
            onChange={handleColumnChange}
            value={selectedColumn ?? ""} // Set the value to the selected column
          >
            <option value="" disabled={true} style={{ color: "white" }}>
              {selectedColumn ? "Select another column" : "Select a column"}
            </option>
            {fileStats?.columns.map((column) => (
              <option
                style={{ color: "white" }}
                key={column}
                value={column}
                disabled={selectedColumns.includes(column)}
              >
                {column}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary mt-2"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        </div>
      </Modal>
    </>
  );
}

export default memo(ColumnNode);
