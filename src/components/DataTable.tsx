import DataTable, { TableProps } from "react-data-table-component";

interface DataTableComponentProps<T> {
  tableHeading: TableProps<T>["columns"];
  tableData: T[];
  setPage?: (page: number) => void;
  setPageSize?: (size: number) => void;
  totalRows?: number;
  page: number;
  initialPageSize?: number;
}

const customStyles = {
  tableWrapper: {
    style: {
      maxHeight: "400px",
      overflowY: "auto" as "auto" | "scroll" | "hidden",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F9FAFB",
      borderTopLeftRadius: "0.375rem",
      borderTopRightRadius: "0.375rem",
      fontWeight: "bold",
    },
  },
  headCells: {
    style: {
      color: "#727D73",
      fontWeight: "bold",
      fontSize: "0.875rem",
      padding: "12px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      borderBottom: "0.5px solid #f3f4f6",
      fontSize: "0.875rem",
    },
  },
  cells: {
    style: {
      padding: "12px",
      color: "#374151",
      backgroundColor: "#ffffff",
    },
  },
};

const DataTableComponent = <T,>({
  tableHeading,
  tableData,
  setPage,
  setPageSize,
  totalRows,
  page,
  initialPageSize = 10,
}: DataTableComponentProps<T>) => {
  const handlePageChanges = (page: number) => {
    setPage?.(page);
  };

  const handleRowsPerPageChanges = (newPerPage: number) => {
    setPageSize?.(newPerPage);
  };

  const paginationOptions = [5, 10, 20, 30, 40, 50];

  const NoDataComponent = (
    <div className="text-center py-10">
      <h5 className="text-lg font-semibold text-gray-600 mb-2">
        No records found
      </h5>
      {/* <p className="text-sm text-gray-500">
        Try adding new items using the "Add" button
      </p> */}
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-sm shadow-sm">
      <DataTable
        columns={tableHeading}
        data={tableData}
        pagination
        paginationServer
        paginationDefaultPage={page}
        paginationTotalRows={totalRows ?? 0}
        paginationRowsPerPageOptions={paginationOptions}
        paginationPerPage={initialPageSize}
        onChangePage={handlePageChanges}
        onChangeRowsPerPage={handleRowsPerPageChanges}
        customStyles={customStyles}
        noDataComponent={NoDataComponent}
        highlightOnHover={true}
        fixedHeader={true}
        striped={true}
        responsive={true}
      />
    </div>
  );
};

export default DataTableComponent;
