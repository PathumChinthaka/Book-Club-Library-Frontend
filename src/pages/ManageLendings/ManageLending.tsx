import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { TableColumn } from "react-data-table-component";
import { LendingResponse } from "../../types/LendingType";
import DataTableComponent from "../../components/DataTable";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateLendingMutation,
  useGetAllLendingsQuery,
} from "../../features/lending/manageLendingSlice";
import AddLendingModal from "../../components/Modals/AddLendingModal";
import { getFormattedDate } from "../../utils/utilMethods";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ManageLending = () => {
  const [lendings, setLendings] = useState<LendingResponse[]>([]);
  const [totalDataRows, setTotalDataRows] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddLendingModal, setShowAddLendingModal] =
    useState<boolean>(false);
  const debouncedLendingSearch = useDebounce<string>(searchQuery);

  const {
    data: allLendingsData,
    isLoading: allLendingsDataIsLoading,
    isFetching: allLendingsDataIsFetching,
    isError: allLendingsDataIsError,
    error: allLendingsDataError,
  } = useGetAllLendingsQuery({
    page: page,
    pageSize: pageSize,
    search: debouncedLendingSearch,
  });

  const [createLending, { isLoading: createLendingIsLoading }] =
    useCreateLendingMutation();

  useEffect(() => {
    if (allLendingsData) {
      setLendings(allLendingsData?.data);
      setTotalDataRows(allLendingsData?.total);
    }
    if (allLendingsDataError) {
      toast.error("Failed to fetch lendings", { autoClose: 2300 });
    }
  }, [allLendingsData, allLendingsDataIsError]);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleAddLending = async (data: any) => {
    try {
      await createLending(data).unwrap();
      toast.success(`Lending added successfully`, {
        delay: 500,
      });
      setShowAddLendingModal(false);
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
        toast.error("Failed to add lending", { delay: 700 });
      }
    }
  };

  const lendingColumnHeaders: TableColumn<LendingResponse>[] = [
    {
      name: "Book Name",
      selector: (row) => row?.book?.title,
    },
    {
      name: "Isbn",
      selector: (row) => row.book?.isbn,
    },
    {
      name: "Reader Name",
      selector: (row) => `${row?.reader?.firstName} ${row?.reader?.lastName}`,
    },
    {
      name: "Email",
      selector: (row) => row.reader?.email,
    },
    {
      name: "Due Date",
      selector: (row) => getFormattedDate(row.dueDate.toString()),
    },
    {
      name: "Remind",
      cell: (row) => {
        const isReminded = !!row?.reminderSent;
        return (
          <button
            // onClick={() => handleSendReminder(row)}
            disabled={isReminded}
            className={`px-3 py-1 rounded text-sm font-medium ${
              isReminded
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isReminded ? "Reminder Sent" : "Send Reminder"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {allLendingsDataIsFetching || allLendingsDataIsLoading ? (
        <LoadingSpinner />
      ) : (
        ""
      )}
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
          onClick={() => setShowAddLendingModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm shadow"
        >
          Issue Book
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
        tableHeading={lendingColumnHeaders}
        tableData={lendings}
        page={page}
        totalRows={totalDataRows}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
        initialPageSize={10}
      />

      <AddLendingModal
        isOpen={showAddLendingModal}
        onClose={() => {
          if (isUpdateMode) {
            setIsUpdateMode(false);
          } else {
            setShowAddLendingModal(false);
          }
        }}
        onHandleClick={handleAddLending}
        isLoading={createLendingIsLoading}
        isUpdateMode={isUpdateMode}
        selectedRowData={selectedRowData}
      />
    </div>
  );
};

export default ManageLending;
