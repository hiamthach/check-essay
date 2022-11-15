import React from "react";

import { Modal } from "antd";

const CustomModal = ({ isModalOpen, setIsModalOpen, children, title }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      title={title}
      footer={false}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
