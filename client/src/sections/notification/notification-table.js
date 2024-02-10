import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useAuthContext } from "src/contexts/auth-context";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmModal } from "src/components/confirmModal";
import { Search } from "src/components/search";
import { ParseToDateAndHour } from "src/utils/date";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";

export const NotificationsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    setPage,
    rowsPerPage = 0,
    selected = [],
    setOpenEdit,
    setSelectedForEdit,
    setSnackbarOpen,
    setSnackbarSeverity,
    setSnackbarMessage,
    searchQuery,
    setSearchQuery,
    setRefetch,
  } = props;

  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState();

  const { t } = useTranslation();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Search placeholder={t("common.search")} value={searchQuery} setValue={setSearchQuery} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("notifications.id")}</TableCell>
                <TableCell>{t("notifications.titleName")}</TableCell>
                <TableCell>{t("notifications.content")}</TableCell>
                <TableCell>{t("notifications.sender")}</TableCell>
                <TableCell>{t("notifications.sendTo")}</TableCell>
                <TableCell>{t("notifications.duration")}</TableCell>
                <TableCell>{t("notifications.date")}</TableCell>
                <TableCell>{t("notifications.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((notif) => {
                const isSelected = selected.includes(notif._id);

                return (
                  <TableRow hover key={notif.id} selected={isSelected}>
                    <TableCell>{notif._id}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {notif?.title.length > 100
                            ? notif?.title.slice(0, 100) + "..."
                            : notif?.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {notif?.content.length > 100
                            ? notif?.content.slice(0, 100) + "..."
                            : notif?.content}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{notif.sender_id}</TableCell>
                    <TableCell>
                      {notif?.send_to?.type === "all"
                        ? t("notifications." + notif?.send_to?.type)
                        : notif?.send_to?.type === "plan"
                        ? t("notifications." + notif?.send_to?.type) +
                          " - " +
                          PLAN_NAMES[PLAN_IDS.indexOf(notif?.send_to?.value)]
                        : notif?.send_to?.type === "user"
                        ? t("notifications." + notif?.send_to?.type) + " - " + notif?.send_to?.value
                        : "-"}
                    </TableCell>
                    <TableCell>{notif?.duration || "-"}</TableCell>
                    <TableCell>
                      {notif?.createdAt ? ParseToDateAndHour(notif?.createdAt) : "-"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={t("common.edit")}>
                        <SvgIcon //Edit notification
                          htmlColor="#1976d2"
                          style={{ marginRight: 5, cursor: "pointer" }}
                          onClick={() => {
                            setSelectedForEdit(notif);
                            setOpenEdit(true);
                          }}
                        >
                          <EditIcon />
                        </SvgIcon>
                      </Tooltip>
                      <Tooltip title={t("common.delete")}>
                        <SvgIcon //Delete notification
                          htmlColor="#f44336"
                          style={{ marginRight: 5, cursor: "pointer" }}
                          onClick={() => {
                            setConfirmModalOpen(true);
                            setSelectedForDelete(notif);
                          }}
                        >
                          <DeleteIcon />
                        </SvgIcon>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        labelRowsPerPage={t("notifications.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) =>
          t("notifications.displayedRows", { from: from, to: to, count, count })
        }
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        leftButtonMessage={t("common.back")}
        rightButtonMessage={t("common.delete")}
        title={t("notifications.deleteConfirmModalTitle")}
        description={t("notifications.deleteConfirmModalDescription", {
          name: selectedForDelete?.name || "",
        })}
        leftAction={() => {
          setConfirmModalOpen(false);
        }}
        rightAction={async () => {
          try {
            const response = await fetch(
              process.env.NEXT_PUBLIC_BACKEND_SERVER +
                `/notification/${selectedForDelete?._id}/deleteNotification`,
              {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + state?.user?.token,
                },
              },
            );
            const data = await response.json();
            setSnackbarOpen(true);
            setSnackbarSeverity("success");
            setSnackbarMessage("Notification deleted successfully!");
            setConfirmModalOpen(false);
            setPage(0);
            setRefetch((r) => !r);
          } catch (error) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMessage("Notification could not deleted successfully!");
          }
        }}
      />
    </Card>
  );
};

NotificationsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
