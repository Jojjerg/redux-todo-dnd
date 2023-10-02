import "@/styles/modal.scss";

import React, { MouseEvent, ReactNode, SetStateAction } from "react";

interface StateProps {
  children: ReactNode;
  close(show: SetStateAction<boolean>): void
}

type Props = StateProps

const Modal: React.FC<Props> = ({ children, close }) => {
  const handleModalClose = (e: MouseEvent<HTMLSpanElement>) => {
    close(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="modal-close" onClick={handleModalClose}></span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
