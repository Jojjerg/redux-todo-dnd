import React from "react";

type Props = {
  modalOpen(): void;
  title: string;
};

const AddButtonShowModal: React.FC<Props> = ({ title, modalOpen }) => {
  const handleOpenModal = () => {
    modalOpen();
  };

  return (
    <button onClick={handleOpenModal}>
      <h1>{title}</h1>
      <span></span>
    </button>
  );
};

export default AddButtonShowModal;
