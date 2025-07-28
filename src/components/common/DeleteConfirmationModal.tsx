import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  text = "Are you sure you want to delete this item?",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>
        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
