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
import { getInitials } from "src/utils/get-initials";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
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

export const BranchesTable = (props) => {
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
  } = props;

  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState();

  const qrCodeRef = useRef(null);

  const { t } = useTranslation();

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
                <TableCell>{t("branches.qr")}</TableCell>
                <TableCell>{t("branches.name")}</TableCell>
                <TableCell>{t("branches.address")}</TableCell>
                <TableCell>{t("branches.phone")}</TableCell>
                <TableCell>{t("branches.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer._id);

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell>
                      <Box ref={qrCodeRef} id={"qrCode"}>
                        <QRCode
                          onClick={() => navigateToLink(customer._id)}
                          style={{ height: "auto", width: "35%", cursor: "pointer" }}
                          value={getLinkOfMenu(customer._id)}
                          size={5}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {customer?.name.length > 100
                            ? customer?.name.slice(0, 100) + "..."
                            : customer?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
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
                            setConfirmModalOpen(true);
                            setSelectedForDelete(customer);
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
                            downloadQRCode(customer._id, customer.name);
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
                            navigateToLink(customer._id);
                          }}
                        >
                          <EyeIcon />
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
        labelRowsPerPage={t("branches.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) =>
          t("branches.displayedRows", { from: from, to: to, count, count })
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
        title={t("branches.deleteConfirmModalTitle")}
        description={t("branches.deleteConfirmModalDescription", {
          name: selectedForDelete?.name || "",
        })}
        leftAction={() => {
          setConfirmModalOpen(false);
        }}
        rightAction={() => {
          restaurant.deleteBranch(selectedForDelete?._id, state?.user?.user?._id).then((res) => {
            if (res.success === true) {
              setSnackbarOpen(true);
              setSnackbarSeverity("success");
              setSnackbarMessage("Branch deleted successfully!");
              setConfirmModalOpen(false);
              setPage(0);
              restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
              state.getUser(state?.user?.user?._id);
            } else {
              setSnackbarOpen(true);
              setSnackbarSeverity("error");
              setSnackbarMessage("Branch could not deleted successfully!");
            }
          });
        }}
      />
    </Card>
  );
};

BranchesTable.propTypes = {
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
