import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Collapse,
  IconButton,
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
import { getInitials } from "src/utils/get-initials";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useAuthContext } from "src/contexts/auth-context";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import { Link } from "react-router-dom";
import { getLinkOfMenu, navigateToLink } from "src/utils/navigate-to-link";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ConfirmModal } from "src/components/confirmModal";
import { Search } from "src/components/search";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";
import { ParseToDateAndHour } from "src/utils/date";
import { BranchEdit } from "../branch/branch-edit";

export const UsersTable = (props) => {
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

  const [confirmDeleteBranchModalOpen, setConfirmDeleteBranchModalOpen] = useState(false);
  const [confirmDeleteUserModalOpen, setConfirmDeleteUserModalOpen] = useState(false);

  const [selectedForBranchDelete, setSelectedForBranchDelete] = useState();
  const [selectedForUserDelete, setSelectedForUserDelete] = useState();

  const qrCodeRef = useRef(null);
  const { t } = useTranslation();

  const [openRows, setOpenRows] = useState({});

  // Function to toggle row open state
  const toggleRow = (userId) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  useEffect(() => {
    const newQRCodeElement = document.getElementById("qrCode");

    // Update the qrcodeRef variable to point to the new QR code element.
    if (newQRCodeElement) {
      qrCodeRef.current = newQRCodeElement;
    }
  }, [page]);

  const downloadQRCode = (id, name) => {
    const svg = qrCodeRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);

    const link = document.createElement("a");
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "QR_" + name + ".svg'";
    link.click();

    URL.revokeObjectURL(url);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      downloadQRCode();
    }
  });

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Search placeholder={t("common.search")} value={searchQuery} setValue={setSearchQuery} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{t("users.id")}</TableCell>
                <TableCell>{t("users.name")}</TableCell>
                <TableCell>{t("users.email")}</TableCell>
                <TableCell>{t("users.role")}</TableCell>
                <TableCell>{t("users.restaurants")}</TableCell>
                <TableCell>{t("users.planId")}</TableCell>
                <TableCell>{t("users.planExpirationDate")}</TableCell>
                <TableCell>{t("users.createdAt")}</TableCell>
                <TableCell>{t("users.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user._id);

                return (
                  <>
                    <TableRow hover key={user.id} selected={isSelected}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => toggleRow(user._id)}
                        >
                          {user?.restaurants?.length === 0 ? (
                            <></>
                          ) : openRows[user.id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}{" "}
                        </IconButton>
                      </TableCell>
                      <TableCell>{user?._id ?? "-"}</TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {user?.name.length > 100
                              ? user?.name.slice(0, 100) + "..."
                              : user?.name
                              ? user?.name
                              : "-"}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{user?.email ?? "-"}</TableCell>
                      <TableCell>{user?.role ?? "-"}</TableCell>
                      <TableCell>{user?.restaurants?.length ?? "0"}</TableCell>
                      <TableCell>
                        {user?.plan_id
                          ? t("plan.planNames." + PLAN_NAMES[PLAN_IDS.indexOf(user?.plan_id)])
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {user?.plan_expiration_date
                          ? ParseToDateAndHour(user?.plan_expiration_date)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {user?.createdAt ? ParseToDateAndHour(user?.createdAt) : "-"}
                      </TableCell>

                      <TableCell>
                        {user?.role !== "admin" && (
                          <Tooltip title={t("common.delete")}>
                            <SvgIcon //Delete user
                              htmlColor="#f44336"
                              style={{ marginRight: 5, cursor: "pointer" }}
                              onClick={() => {
                                setConfirmDeleteUserModalOpen(true);
                                setSelectedForUserDelete(user);
                              }}
                            >
                              <DeleteIcon />
                            </SvgIcon>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse
                          in={openRows[user._id] && user?.restaurants?.length > 0}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 4 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              {t("users.restaurants")}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>{t("branches.qr")}</TableCell>
                                  <TableCell>{t("branches.name")}</TableCell>
                                  <TableCell>{t("branches.address")}</TableCell>
                                  <TableCell>{t("branches.phone")}</TableCell>
                                  <TableCell>{t("branches.actions")}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {user.restaurants.map((customer) => (
                                  <TableRow key={customer?._id}>
                                    <TableCell>
                                      <Box ref={qrCodeRef} id={"qrCode"}>
                                        <QRCode
                                          onClick={() => navigateToLink(customer?._id)}
                                          style={{
                                            height: "auto",
                                            width: "35%",
                                            cursor: "pointer",
                                          }}
                                          value={getLinkOfMenu(customer?._id)}
                                          size={5}
                                        />
                                      </Box>
                                    </TableCell>
                                    <TableCell>
                                      <Stack alignItems="center" direction="row" spacing={2}>
                                        <Typography variant="subtitle2">
                                          {customer?.name?.length > 100
                                            ? customer?.name.slice(0, 100) + "..."
                                            : customer?.name}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell>{customer?.address}</TableCell>
                                    <TableCell>{customer?.phone}</TableCell>
                                    <TableCell>
                                      <Tooltip title={t("common.edit")}>
                                        <SvgIcon //Edit branch
                                          htmlColor="#1976d2"
                                          style={{ marginRight: 5, cursor: "pointer" }}
                                          onClick={() => {
                                            setSelectedForEdit(customer);
                                            setOpenEdit(true);
                                          }}
                                        >
                                          <EditIcon />
                                        </SvgIcon>
                                      </Tooltip>

                                      <Tooltip title={t("common.delete")}>
                                        <SvgIcon //Delete branch
                                          htmlColor="#f44336"
                                          style={{ marginRight: 5, cursor: "pointer" }}
                                          onClick={() => {
                                            setConfirmDeleteBranchModalOpen(true);
                                            setSelectedForBranchDelete({
                                              customer: customer,
                                              userId: user?._id,
                                            });
                                          }}
                                        >
                                          <DeleteIcon />
                                        </SvgIcon>
                                      </Tooltip>

                                      <Tooltip title={t("common.downloadQR")}>
                                        <SvgIcon //Download QR
                                          htmlColor="#4caf50"
                                          style={{ marginRight: 5, cursor: "pointer" }}
                                          onClick={() => {
                                            downloadQRCode(customer?._id, customer?.name);
                                          }}
                                        >
                                          <DownloadIcon />
                                        </SvgIcon>
                                      </Tooltip>

                                      <Tooltip title={t("common.viewMenu")}>
                                        <SvgIcon //Navigate to menu for customers
                                          htmlColor="#9e9e9e"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            navigateToLink(customer?._id);
                                          }}
                                        >
                                          <EyeIcon />
                                        </SvgIcon>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
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
        labelRowsPerPage={t("users.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) =>
          t("users.displayedRows", { from: from, to: to, count, count })
        }
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ConfirmModal
        open={confirmDeleteBranchModalOpen}
        onClose={() => {
          setConfirmDeleteBranchModalOpen(false);
        }}
        leftButtonMessage={t("common.back")}
        rightButtonMessage={t("common.delete")}
        title={t("branches.deleteConfirmModalTitle")}
        description={t("branches.deleteConfirmModalDescription", {
          name: selectedForBranchDelete?.customer?.name || "",
        })}
        leftAction={() => {
          setConfirmDeleteBranchModalOpen(false);
        }}
        rightAction={() => {
          restaurant
            .deleteBranch(selectedForBranchDelete?.customer?._id, selectedForBranchDelete?.userId)
            .then((res) => {
              if (res.success === true) {
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMessage("User deleted successfully!");
                setConfirmDeleteBranchModalOpen(false);
                setPage(0);
                restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
                state.getUser(state?.user?.user?._id);
                setRefetch((r) => !r);
              } else {
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMessage("User could not deleted successfully!");
              }
            });
        }}
      />
      <ConfirmModal
        open={confirmDeleteUserModalOpen}
        onClose={() => {
          setConfirmDeleteUserModalOpen(false);
        }}
        leftButtonMessage={t("common.back")}
        rightButtonMessage={t("common.delete")}
        title={t("account.accountDelete")}
        description={t("account.accountDeleteMessage")}
        leftAction={() => {
          setConfirmDeleteUserModalOpen(false);
        }}
        rightAction={() => {
          state.deleteUser(selectedForUserDelete?._id, true).then((res) => {
            if (res.success === true) {
              setSnackbarOpen(true);
              setSnackbarSeverity("success");
              setSnackbarMessage(t("account.deleteSuccessMessage"));
            } else {
              setSnackbarOpen(true);
              setSnackbarSeverity("error");
              setSnackbarMessage(t("account.deleteErrorMessage"));
            }
            setConfirmDeleteUserModalOpen(false);
            setRefetch((r) => !r);
          });
        }}
      />
    </Card>
  );
};

UsersTable.propTypes = {
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
