import { useState } from "react";
import { Modal, Button, ModalBody, ModalHeader } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { useUploadUserProfileMutation } from "../../features/user/manageUserSlice";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";

type AddProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  isLoading?: boolean;
};

const AddProfilePictureModal: React.FC<AddProfilePictureModalProps> = ({
  isOpen,
  onClose,
  userId,
  isLoading = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);

  const [
    uploadUserProfilePicture,
    { isLoading: uploadUserProfilePictureIsLoading },
  ] = useUploadUserProfileMutation();

  const handleUploadProfile = async () => {
    try {
      await uploadUserProfilePicture({
        id: userId,
        file,
      }).unwrap();
      toast.success(`Profile Updated successfully`, {
        delay: 500,
      });
      onClose();
      setFile(null);
      setPreview(null);
    } catch (error: any) {
      if (error?.data) {
        toast.error(
          error.data.Message ||
            error.data.title ||
            error.data.message ||
            "Something went wrong",
          { delay: 700 }
        );
      } else {
        toast.error("Failed to update profile", { delay: 700 });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Modal show={isOpen} size="md" onClose={onClose} popup>
        {uploadUserProfilePictureIsLoading && <LoadingSpinner />}
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

            <Button color="blue" onClick={handleUploadProfile}>
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddProfilePictureModal;
