import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import React from "react";

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onHandleClick: () => void;
  modalContent?: React.ReactNode;
  isLoading?: boolean;
  isUpdateMode?: boolean;
  selectedRowData?: Record<string, any> | null;
};

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  onHandleClick,
  modalContent,
  isLoading = false,
  isUpdateMode = false,
  selectedRowData = null,
}) => {
  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => onClose()}>
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
        <ModalFooter>
          <Button onClick={() => onHandleClick()}>I accept</Button>
          <Button color="alternative" onClick={() => onClose()}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CommonModal;
