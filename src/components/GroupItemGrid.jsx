// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";
import { setGroupItemInfo, setGroupItemsData } from "../slices/userReqSlice";

// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupItemGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  // access selected row info
  const { groupInfo } = useSelector((state) => state.userReq);
  const { token } = useSelector((state) => state.auth);

  // access the data from redux store
  const { groupItemsData } = useSelector((state) => state.userReq);

  // fetch data from the API
  const {
    data: groupItems,
    isSuccess,
    isLoading,
  } = useGetGroupItemsQuery({ token, groupId: groupInfo?._id });

  // trigger the fetch
  useEffect(() => {
    if (isSuccess) {
      const data = groupItems.itemList.map((item, i) => ({
        _id: item.id,
        number: i + 1,
        name: item.itemID,
      }));

      dispatch(setGroupItemsData(data));
    }
  }, [groupItems, isSuccess, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "number",
        header: "ردیف",
        size: 50,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "center",
        },
        Cell: ({ renderedCellValue }) => (
          <strong>{convertToPersianNumber(renderedCellValue)}</strong>
        ),
      },
      {
        accessorKey: "name",
        header: "نام",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupItemsData,
    muiPaginationProps: {
      color: "success",
      variant: "outlined",
      showRowsPerPage: false,
      dir: "rtl",
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroupItemInfo = findById(groupItemsData, id);

    if (id) {
      dispatch(setGroupItemInfo(selectedGroupItemInfo));
    } else {
      dispatch(setGroupItemInfo(null));
    }
  }, [dispatch, table, rowSelection, groupItemsData]);

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default GroupItemGrid;