import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import LoadingSpinner from "../common/LoadingSpinner";

type AddReaderFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onHandleClick: (data: any) => void;
  isLoading?: boolean;
  modalTitle?: string;
  isUpdateMode?: boolean;
  selectedRowData?: Record<string, any> | null;
};

const AddReaderModal: React.FC<AddReaderFormProps> = ({
  isOpen,
  onClose,
  onHandleClick,
  isLoading = false,
  modalTitle,
  isUpdateMode = false,
  selectedRowData = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Contact Number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isUpdateMode && selectedRowData) {
      setFormData({
        firstName: selectedRowData.firstName || "",
        lastName: selectedRowData.lastName || "",
        email: selectedRowData.email || "",
        phone: selectedRowData.phone || "",
        address: selectedRowData.address || "",
      });
    }
  }, [isUpdateMode, selectedRowData]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [isOpen]);

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => onClose()}>
        {isLoading && <LoadingSpinner />}
        <ModalHeader>
          {isUpdateMode ? "Update Reader" : "Add Reader"}
        </ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone*
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            {/* <div className="mt-4">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture*
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
              />
              {errors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profilePicture}
                </p>
              )}
            </div> */}
          </form>
        </ModalBody>

        <ModalFooter className="flex justify-between items-center p-3">
          <Button
            className="rounded-sm"
            onClick={() => {
              if (!validate()) return;
              onHandleClick(formData);
            }}
            disabled={isLoading}
          >
            {isUpdateMode ? "Update Reader" : "Add Reader"}
          </Button>
          <Button
            className="rounded-sm px-8"
            color="alternative"
            onClick={() => {
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
              });
              if (fileInputRef.current) fileInputRef.current.value = "";
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddReaderModal;
