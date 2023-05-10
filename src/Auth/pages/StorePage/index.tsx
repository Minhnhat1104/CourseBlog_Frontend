import React, { useEffect, useMemo, useState } from "react";
import useUsers from "../../hooks/useUsers";
import _ from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { SET_TIMEOUT } from "../../../base/constants";
import useUserMutation from "../../hooks/useUserMutation";
import AddModal from "../../container/AddModal";

const StorePage = () => {
  const [items, setItems] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [updateItem, setUpdateItem] = useState<any>(undefined);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const theme = useTheme();

  const { data, refetch } = useUsers();
  const { mDelete } = useUserMutation();

  // ========== init data==============
  useEffect(() => {
    if (data?.data?.data) {
      const newItems = data?.data?.data;
      if (!_.isEqual(newItems, items)) {
        setItems(newItems);
      }
    } else {
      setItems([]);
    }
  }, [data]);

  const handleSelectionModelChange = (ids: any) => {
    setSelectedIds(ids);
  };

  // ========== handle Table ==========

  const handleClickUpdate = (item: any) => {
    setShowUpdate(true);
    setUpdateItem(item);
  };

  const handleDeleteCourse = (_id: number) => {
    if (_id) {
      mDelete.mutate([_id], {
        onSuccess: () => {
          setTimeout(() => {
            refetch && refetch();
          }, SET_TIMEOUT);
        },
      });
    }
  };

  const handleDeleteAll = () => {
    mDelete.mutate(selectedIds, {
      onSuccess: () => {
        setTimeout(() => {
          refetch && refetch();
        }, SET_TIMEOUT);
      },
    });
  };

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 400, flex: 1 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "phoneNumber", width: 100 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row?.isAdmin}
            onChange={() => {}}
            disabled
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 140,
      valueGetter: (params) => {
        const value =
          new Date(params.row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) +
          " " +
          new Date(params.row.createdAt).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        return value;
      },
    },
    // {
    //   field: "update",
    //   headerName: "",
    //   width: 50,
    //   renderCell: (params) => {
    //     return (
    //       <IconButton
    //         size="small"
    //         color="primary"
    //         onClick={(e: any) => {
    //           e.stopPropagation();
    //           handleClickUpdate(params.row);
    //         }}
    //       >
    //         <EditOutlinedIcon fontSize="small" />
    //       </IconButton>
    //     );
    //   },
    // },
    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <IconButton
            size="small"
            color="error"
            onClick={(e: any) => {
              e.stopPropagation();
              handleDeleteCourse(params.row?._id || "");
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // ============= handle create modal ================

  return (
    <Box sx={{ background: theme.palette.common.white }} p={2}>
      <Stack spacing={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              size="small"
              startIcon={<AddOutlinedIcon />}
              variant="contained"
              onClick={() => setShowAdd(true)}
            >
              Add
            </Button>
            <IconButton size="small" onClick={() => refetch()}>
              <RefreshOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography fontSize={"2.0rem"} textAlign={"center"}>
          User Studio
        </Typography>

        {selectedIds?.length > 0 && (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDeleteAll()}
            >
              Delete All
            </Button>
          </Stack>
        )}

        <DataGrid
          rows={items || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(data) => data?._id}
          rowSelection
          disableVirtualization
          sx={{
            headerCell: {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
          disableColumnMenu
          onRowSelectionModelChange={handleSelectionModelChange}
          rowSelectionModel={selectedIds}
        />
      </Stack>

      {showAdd && (
        <AddModal
          refetch={refetch}
          open={showAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </Box>
  );
};

export default StorePage;
