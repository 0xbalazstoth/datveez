import React, { forwardRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  id: string;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  Modal.displayName = "Modal";
  const { children, onClose, title, id } = props;

  const handleModalClose = () => {
    onClose();
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle" ref={ref}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
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
