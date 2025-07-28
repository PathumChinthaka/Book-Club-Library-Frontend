import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { TableColumn } from "react-data-table-component";
import { ReaderType } from "../../types/ReaderType";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "../../components/DataTable";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import {
  useCreateReaderMutation,
  useDeleteReaderMutation,
  useUpdateReaderDetailsMutation,
  useGetAllReadersQuery,
} from "../../features/reader/manageReadersSlice";
import { ToastContainer, toast } from "react-toastify";
import AddReaderModal from "../../components/Modals/AddReaderModal";
import CommonModal from "../../components/common/CommonModal";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

const ManageReaders = () => {
  const [readers, setReaders] = useState<ReaderType[]>([]);
  const [totalDataRows, setTotalDataRows] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddReaderModal, setShowAddReaderModal] = useState<boolean>(false);
  const debouncedProductSearch = useDebounce<string>(searchQuery);

  const {
    data: allReadersData,
    isLoading: allReadersDataIsLoading,
    isFetching: allReadersDataIsFetching,
    isError: allReadersDataIsError,
    error: allReadersDataError,
  } = useGetAllReadersQuery({
    page: page,
    pageSize: pageSize,
  });

  const [createReader, { isLoading: createReaderIsLoading }] =
    useCreateReaderMutation();

  const [deleteReader, { isLoading: deleteReaderIsLoading }] =
    useDeleteReaderMutation();

  const [updateReader, { isLoading: updateReaderIsLoading }] =
    useUpdateReaderDetailsMutation();

  useEffect(() => {
    if (allReadersData) {
      setReaders(allReadersData?.data);
      setTotalDataRows(allReadersData?.total);
    }
    if (allReadersDataIsError) {
      toast.error("Failed to fetch readers", { autoClose: 2300 });
    }
  }, [allReadersData, allReadersDataIsError]);

  const readerColumnHeaders: TableColumn<ReaderType>[] = [
    {
      name: "Name",
      selector: (row) => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Address",
      cell: (row) => (
        <div className="whitespace-normal break-words max-w-xs">
          {row?.address || "-"}
        </div>
      ),
      grow: 2,
      wrap: true,
    },
    {
      name: "Status",
      cell: (row) => {
        let statusClass = "";
        let label = "";

        switch (row?.activeStatus) {
          case 1:
            statusClass = "text-green-600";
            label = "Active";
            break;
          case 2:
            statusClass = "text-yellow-600";
            label = "Inactive";
            break;
          case 3:
            statusClass = "text-red-600";
            label = "Deleted";
            break;
          default:
            statusClass = "text-gray-400";
            label = "Unknown";
        }

        return <span className={`font-semibold ${statusClass}`}>{label}</span>;
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            title="Edit"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setIsUpdateMode(true);
              setSelectedRowData(row);
            }}
          >
            <MdOutlineModeEdit size={18} />
          </button>
          {/* <button
            title="View"
            className="text-green-600 hover:text-green-800 "
            // onClick={() => navigate(`/books/${row._id}`)}
          >
            <MdOutlineRemoveRedEye size={18} />
          </button> */}
          <button
            title="Delete"
            className="text-red-600 hover:text-red-800"
            onClick={() => {
              setSelectedRowData(row);
              setShowDeleteModal(true);
            }}
          >
            <FaRegTrashCan size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleAddReader = async (data: any) => {
    try {
      await createReader(data).unwrap();
      toast.success(`Reader added successfully`, {
        delay: 500,
      });
      setShowAddReaderModal(false);
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
        toast.error("Failed to add reader", { delay: 700 });
      }
    }
  };

  const handleDeleteReader = async () => {
    try {
      await deleteReader(selectedRowData?._id || "").unwrap();
      toast.success(`Reader deleted successfully`, {
        delay: 500,
      });
      setShowDeleteModal(false);
      setSelectedRowData("");
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
        toast.error("Failed to delete reader", { delay:700 });
      }
    }
  };

  const handleUpdateReader = async (data: any) => {
    try {
      await updateReader({
        id: selectedRowData?._id,
        ...data,
      }).unwrap();
      toast.success(`Reader updated successfully`, {
        delay: 500,
      });
      setIsUpdateMode(false);
      setSelectedRowData("");
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
        toast.error("Failed to update reader", { delay: 700 });
      }
    }
  };

  return (
    <div className="space-y-4">
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={() => setShowAddReaderModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm shadow"
        >
          Add Reader
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search readers..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <button className="p-2 rounded-sm border border-gray-300 hover:bg-gray-100 shadow-sm">
            <FiFilter size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <DataTableComponent
        tableHeading={readerColumnHeaders}
        tableData={readers}
        page={page}
        totalRows={totalDataRows}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
        initialPageSize={10}
      />

      <AddReaderModal
        isOpen={showAddReaderModal || isUpdateMode}
        onClose={() => {
          if (isUpdateMode) {
            setIsUpdateMode(false);
          } else {
            setShowAddReaderModal(false);
          }
        }}
        onHandleClick={isUpdateMode ? handleUpdateReader : handleAddReader}
        isLoading={createReaderIsLoading || updateReaderIsLoading}
        isUpdateMode={isUpdateMode}
        selectedRowData={selectedRowData}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        isLoading={deleteReaderIsLoading}
        onConfirm={handleDeleteReader}
      />
    </div>
  );
};

export default ManageReaders;
