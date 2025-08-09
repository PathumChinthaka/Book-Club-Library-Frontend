import { useState } from "react";
import { Modal, Button, ModalBody, ModalHeader } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { useUploadUserProfileMutation } from "../../features/user/manageUserSlice";

type AddProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onHandleClick: (data: any) => void;
  isLoading?: boolean;
};

const AddProfilePictureModal: React.FC<AddProfilePictureModalProps> = ({
  isOpen,
  onClose,
  onHandleClick,
  isLoading = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const [
    uploadUserProfilePicture,
    { isLoading: uploadUserProfilePictureIsLoading },
  ] = useUploadUserProfileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Modal show={isOpen} size="md" onClose={onClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Upload Profile Picture</h3>

            {preview && (
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />

            <Button color="blue" onClick={onHandleClick}>
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddProfilePictureModal;
