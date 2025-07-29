import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";
import { useGetAllReadersQuery } from "../../features/reader/manageReadersSlice";
import { useGetBooksQuery } from "../../features/book/manageBooksSlice";
import { useDebounce } from "../../hooks/useDebounce";
import Select from "react-select";
import LoadingSpinner from "../common/LoadingSpinner";

type LendingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
};

type ReaderOption = { value: string; label: string };
type BookOption = { value: string; label: string };

const LendingModal: React.FC<LendingModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    readerId: "",
    bookId: "",
    dueDate: "",
  });
  const [readerSearch, setReaderSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const debouncedReaderSearch = useDebounce<string>(readerSearch);
  const debouncedBookSearch = useDebounce<string>(bookSearch);

  const {
    data: allBooksData,
    isLoading: allBooksDataIsLoading,
    isFetching: allBooksDataIsFetching,
    isError: allBooksDataIsError,
    error: allBooksDataError,
  } = useGetBooksQuery({
    page: 1,
    pageSize: 5,
    search: debouncedBookSearch,
  });

  const {
    data: allReadersData,
    isLoading: allReadersDataIsLoading,
    isFetching: allReadersDataIsFetching,
    isError: allReadersDataIsError,
    error: allReadersDataError,
  } = useGetAllReadersQuery({
    page: 1,
    pageSize: 10,
    search: debouncedReaderSearch,
  });

  const readerOptions: ReaderOption[] =
    allReadersData?.data?.map((reader) => ({
      value: reader._id,
      label: `${reader.firstName} ${reader.lastName}`,
    })) ?? [];

  const bookOptions: BookOption[] =
    allBooksData?.data?.map((book) => ({
      value: book._id,
      label: book.title,
    })) ?? [];

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.readerId || !formData.bookId || !formData.dueDate) return;
    onSave(formData);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>Issue Book</ModalHeader>
      <ModalBody>
        {allBooksDataIsLoading || allReadersDataIsLoading ? (
          <LoadingSpinner />
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reader
            </label>
            <Select
              options={readerOptions}
              value={readerOptions.find((r) => r.value === formData.readerId)}
              name="readerId"
              onChange={(option) =>
                handleChange("readerId", option?.value || "")
              }
              onInputChange={(value) => setReaderSearch(value)} // capture input
              placeholder="Search or select reader..."
              isSearchable
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book
            </label>
            <Select
              options={bookOptions}
              value={bookOptions.find((b) => b.value === formData.bookId)}
              onChange={(option) => handleChange("bookId", option?.value || "")}
              onInputChange={(value) => setBookSearch(value)}
              placeholder="Search or select book..."
              isSearchable
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="flex justify-between">
        <Button onClick={handleSubmit}>Save</Button>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LendingModal;
