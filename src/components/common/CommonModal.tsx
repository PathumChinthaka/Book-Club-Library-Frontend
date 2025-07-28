import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import React from "react";
import { HiInformationCircle, HiExclamation, HiXCircle } from "react-icons/hi";

type ModalType = "info" | "warning" | "error" | "success";

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onHandleClick?: () => void;
  modalContent?: React.ReactNode;
  message?: string;
  isLoading?: boolean;
  isUpdateMode?: boolean;
  selectedRowData?: Record<string, any> | null;
  type?: ModalType;
  title?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  onHandleClick,
  modalContent,
  message,
  isLoading = false,
  isUpdateMode = false,
  selectedRowData = null,
  type = "info",
  title,
  showCancelButton = true,
  showConfirmButton = true,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}) => {
  // Define modal styles based on type
  const typeStyles = {
    info: {
      color: "blue",
      icon: <HiInformationCircle className="h-6 w-6 text-blue-500" />,
    },
    warning: {
      color: "yellow",
      icon: <HiExclamation className="h-6 w-6 text-yellow-500" />,
    },
    error: {
      color: "red",
      icon: <HiXCircle className="h-6 w-6 text-red-500" />,
    },
    success: {
      color: "green",
      icon: <HiInformationCircle className="h-6 w-6 text-green-500" />,
    },
  };

  const currentType = typeStyles[type] || typeStyles.info;

  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <ModalHeader className={`border-b border-${currentType.color}-100`}>
        <div className="flex items-center gap-2">
          {title || type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </ModalHeader>
      <ModalBody className="space-y-4">
        {modalContent || <p>{message}</p>}
      </ModalBody>
      <ModalFooter className="border-t border-gray-200 flex justify-between items-center">
        {showCancelButton && (
          <Button color="light" onClick={onClose} disabled={isLoading}>
            {cancelButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button color={type} onClick={onHandleClick} disabled={isLoading}>
            {confirmButtonText}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CommonModal;
