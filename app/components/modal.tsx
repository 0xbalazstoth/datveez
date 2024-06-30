import React, { forwardRef, useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  id: string;
  className?: string;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  Modal.displayName = "Modal";
  const { children, onClose, title, id, className } = props;

  const handleModalClose = () => {
    onClose();
  };

  return (
    <dialog
      id={id}
      className={`modal modal-bottom modal-backdrop sm:modal-middle ${className}`}
      ref={ref}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-gray-300">{title}</h3>
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleModalClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default Modal;
