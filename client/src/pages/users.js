import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { BranchEdit } from "src/sections/branch/branch-edit";
import CustomizedSnackbars from "src/sections/snackbar";
import { useTranslation } from "react-i18next";
import { PLAN_IDS } from "src/utils/constants";
import { useAuthContext } from "src/contexts/auth-context";
import { UsersTable } from "src/sections/users/users-table";
import { isArray } from "util";

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const restaurant = useRestaurantContext();
  const state = useAuthContext();

  const { t } = useTranslation();

  const getUsers = async (token) => {
    const usersResponse = await fetch(`http://localhost:3001/user/getAllUsers`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const tempUsers = await usersResponse.json();
    console.log("ibrahim", tempUsers);
    if (isArray(tempUsers)) {
      setUsersData(tempUsers);
    }

    return tempUsers;
  };

  useEffect(() => {
    getUsers(state?.user?.token);
  }, []);

  useEffect(() => {
    if (refetch === true) {
      getUsers(state?.user?.token);
    }
    setTimeout(() => {
      setRefetch(false);
    }, 1000);
  }, [refetch]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const useUsers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(usersData || [], page, rowsPerPage);
    }, [page, rowsPerPage, usersData, searchQuery]);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const useUsersIds = (users) => {
    return useMemo(() => {
      return users.map((user) => user._id);
    }, [users]);
  };

  const users = useUsers(page, rowsPerPage);
  const usersIds = useUsersIds(users);
  const usersSelection = useSelection(usersIds);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Users | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("users.title")}</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
            </Stack>
            {!openEdit && (
              <>
                {/* <BranchesSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
                <UsersTable
                  count={usersData?.length || 0}
                  items={users}
                  onDeselectAll={usersSelection.handleDeselectAll}
                  onDeselectOne={usersSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={usersSelection.handleSelectAll}
                  onSelectOne={usersSelection.handleSelectOne}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setOpenEdit={setOpenEdit}
                  setSelectedForEdit={setSelectedForEdit}
                  selected={usersSelection.selected}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarMessage={setSnackbarMessage}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setRefetch={setRefetch}
                />
              </>
            )}
            {openEdit && (
              <BranchEdit
                selectedForEdit={selectedForEdit}
                setSelectedForEdit={setSelectedForEdit}
                back={() => {
                  setOpenEdit(false);
                  setRefetch((r) => !r);
                }}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
              />
            )}
          </Stack>
        </Container>
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
