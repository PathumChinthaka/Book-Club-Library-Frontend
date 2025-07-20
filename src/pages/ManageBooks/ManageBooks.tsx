import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { TableColumn } from "react-data-table-component";
import { BookType } from "../../types/BookType";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "../../components/DataTable";
import { useState } from "react";

const ManageBooks = () => {
  const [totalDataRows, setTotalDataRows] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const bookColumnHeaders: TableColumn<BookType>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "ISBN",
      selector: (row) => row.isbn,
    },
    {
      name: "Publisher",
      selector: (row) => row.publisher || "-",
    },
    {
      name: "Year",
      selector: (row) => row.publicationYear?.toString() || "-",
    },
    {
      name: "Total Copies",
      selector: (row) => row.copiesTotal.toString(),
    },
    {
      name: "Available",
      selector: (row) => row.copiesAvailable.toString(),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            title="Edit"
            className="text-blue-600 hover:text-blue-800"
            // onClick={() => onEdit(row)}
          >
            <MdOutlineModeEdit size={18} />
          </button>
          <button
            title="View"
            className="text-green-600 hover:text-green-800"
            // onClick={() => navigate(`/books/${row._id}`)}
          >
            <MdOutlineRemoveRedEye size={18} />
          </button>
          <button
            title="Delete"
            className="text-red-600 hover:text-red-800"
            // onClick={() => onDelete(row)}
          >
            <FaRegTrashCan size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm shadow">
          Add Book
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <button className="p-2 rounded-sm border border-gray-300 hover:bg-gray-100 shadow-sm">
            <FiFilter size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <DataTableComponent
        tableHeading={bookColumnHeaders}
        tableData={[]}
        page={1}
        totalRows={10}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
        initialPageSize={10}
      />
    </div>
  );
};

export default ManageBooks;
