import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import CustomizedSnackbars from "src/sections/snackbar";
import { useTranslation } from "react-i18next";
import { PLAN_IDS } from "src/utils/constants";
import { useAuthContext } from "src/contexts/auth-context";
import { NotificationsTable } from "src/sections/notification/notification-table";
import { NotificationAdd } from "src/sections/notification/notification-add";
import { NotificationEdit } from "src/sections/notification/notification-edit";

const NotificationAdmin = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifData, setNotifData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const state = useAuthContext();

  const { t } = useTranslation();

  const getNotifications = async (token) => {
    const usersResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/notification/getAllNotifications`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempNotifications = await usersResponse.json();
    if (Array.isArray(tempNotifications)) {
      console.log("ibrahim2", tempNotifications);
      setNotifData(tempNotifications);
    }

    return tempNotifications;
  };

  useEffect(() => {
    getNotifications(state?.user?.token);
  }, []);

  useEffect(() => {
    if (refetch === true) {
      getNotifications(state?.user?.token);
    }
    setTimeout(() => {
      setRefetch(false);
    }, 1000);
  }, [refetch]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const useNotifications = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(
        notifData.filter((res) => res?.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
          [],
        page,
        rowsPerPage,
      );
    }, [page, rowsPerPage, notifData, searchQuery]);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const useNotificationIds = (notifications) => {
    return useMemo(() => {
      return notifications.map((notification) => notification._id);
    }, [notifications]);
  };

  const notifications = useNotifications(page, rowsPerPage);
  const notificationsIds = useNotificationIds(notifications);
  const notificationsSelection = useSelection(notificationsIds);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Notifications | Devias Kit</title>
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
                <Typography variant="h4">{t("notifications.title")}</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              {!openAdd && !openEdit && (
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    onClick={() => setOpenAdd(true)}
                    variant="contained"
                  >
                    {t("common.add")}
                  </Button>
                </div>
              )}
            </Stack>
            {!openAdd && !openEdit && (
              <>
                <NotificationsTable
                  count={notifData?.length || 0}
                  items={notifications}
                  onDeselectAll={notificationsSelection.handleDeselectAll}
                  onDeselectOne={notificationsSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={notificationsSelection.handleSelectAll}
                  onSelectOne={notificationsSelection.handleSelectOne}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setOpenEdit={setOpenEdit}
                  setSelectedForEdit={setSelectedForEdit}
                  selected={notificationsSelection.selected}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarMessage={setSnackbarMessage}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setRefetch={setRefetch}
                />
              </>
            )}
            {openAdd && (
              <NotificationAdd
                back={() => setOpenAdd(false)}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                setRefetch={setRefetch}
              />
            )}
            {openEdit && (
              <NotificationEdit
                selectedForEdit={selectedForEdit}
                setSelectedForEdit={setSelectedForEdit}
                back={() => setOpenEdit(false)}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                setRefetch={setRefetch}
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

NotificationAdmin.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NotificationAdmin;
