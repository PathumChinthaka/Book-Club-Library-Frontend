import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

type AddBookFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onHandleClick: (data: any) => void;
  isLoading?: boolean;
  modalTitle: string;
  isUpdateMode?: boolean;
  selectedRowData?: Record<string, any> | null;
};

const AddBookForm: React.FC<AddBookFormProps> = ({
  isOpen,
  onClose,
  onHandleClick,
  isLoading = false,
  modalTitle,
  isUpdateMode = false,
  selectedRowData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    publisher: "",
    publicationYear: "",
    copiesTotal: "1",
    copiesAvailable: "1",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Technology",
  ];

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
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (parseInt(formData.copiesTotal) < 1)
      newErrors.copiesTotal = "Must have at least 1 copy";
    if (parseInt(formData.copiesAvailable) < 0)
      newErrors.copiesAvailable = "Cannot have negative copies";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isUpdateMode && selectedRowData) {
      setFormData({
        title: selectedRowData.title || "",
        author: selectedRowData.author || "",
        category: selectedRowData.category || "",
        isbn: selectedRowData.isbn || "",
        publisher: selectedRowData.publisher || "",
        publicationYear: selectedRowData.publicationYear || "",
        copiesTotal: selectedRowData.copiesTotal?.toString() || "1",
        copiesAvailable: selectedRowData.copiesAvailable?.toString() || "1",
        image: null, // We don't handle image here
      });
    }
  }, [isUpdateMode, selectedRowData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) {
          formPayload.append(key, value);
        } else {
          formPayload.append(key, value.toString());
        }
      }
    });

    try {
      setFormData({
        title: "",
        author: "",
        category: "",
        isbn: "",
        publisher: "",
        publicationYear: "",
        copiesTotal: "1",
        copiesAvailable: "1",
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add book");
    }
  };

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => onClose()}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author*
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.author ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-1 py-2 border rounded-md ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ISBN*
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.isbn ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.isbn && (
                  <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
                )}
              </div>

              {/* Publisher */}
              <div>
                <label
                  htmlFor="publisher"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Publication Year */}
              <div>
                <label
                  htmlFor="publicationYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Publication Year
                </label>
                <input
                  type="number"
                  id="publicationYear"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Total Copies */}
              <div>
                <label
                  htmlFor="copiesTotal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Total Copies*
                </label>
                <input
                  type="number"
                  id="copiesTotal"
                  name="copiesTotal"
                  value={formData.copiesTotal}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.copiesTotal ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.copiesTotal && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.copiesTotal}
                  </p>
                )}
              </div>

              {/* Available Copies */}
              <div>
                <label
                  htmlFor="copiesAvailable"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Available Copies*
                </label>
                <input
                  type="number"
                  id="copiesAvailable"
                  name="copiesAvailable"
                  value={formData.copiesAvailable}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.copiesAvailable
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.copiesAvailable && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.copiesAvailable}
                  </p>
                )}
              </div>
            </div>

            {/* Book Image Upload */}
            <div className="mt-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Book Cover Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
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
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="flex justify-between items-center p-3">
          <Button
            className="rounded-sm"
            onClick={() => onHandleClick(formData)}
          >
            {isUpdateMode ? "Update Book" : "Add Book"}
          </Button>
          <Button
            className="rounded-sm px-8"
            color="alternative"
            onClick={() => {
              setFormData({
                title: "",
                author: "",
                category: "",
                isbn: "",
                publisher: "",
                publicationYear: "",
                copiesTotal: "1",
                copiesAvailable: "1",
                image: null,
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

export default AddBookForm;
