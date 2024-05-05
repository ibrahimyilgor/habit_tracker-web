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
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";
import { PlanSelector } from "../plan/plan-selector";

export const CodesTable = (props) => {
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
    plan,
    setPlan,
  } = props;

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState();

  const state = useAuthContext();

  const { t } = useTranslation();

  const deleteCode = async (id) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER + `/planCode/${id}/deleteCode`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + state?.user?.token,
        },
      });
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage(t("codes.deleteSuccessMessage"));
      setConfirmModalOpen(false);
      setPage(0);
      setRefetch((r) => !r);
      return { success: true };
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(t("codes.deleteErrorMessage"));
      return { success: false };
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {/* <Search placeholder={t("common.search")} value={searchQuery} setValue={setSearchQuery} /> */}
          <Card sx={{ p: 2 }}>
            <PlanSelector
              name="plan"
              setValue={(e) => {
                console.log("eee", e?.target);
                if (e?.target?.value) {
                  setPlan(e.target.value);
                } else {
                  setPlan({ id: 0, name: "plans" });
                }
              }}
              withTitle={true}
              value={plan}
            />
          </Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("codes.id")}</TableCell>
                <TableCell>{t("codes.code")}</TableCell>
                <TableCell>{t("codes.plan")}</TableCell>
                <TableCell>{t("codes.duration")}</TableCell>
                <TableCell>{t("codes.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((code) => {
                const isSelected = selected.includes(code._id);

                return (
                  <TableRow hover key={code._id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Box>
                          <Typography variant="subtitle2">{code?._id ?? "-"}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{code?.code ?? "-"}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {code?.plan_id
                        ? t("plan.planNames." + PLAN_NAMES[PLAN_IDS.indexOf(code?.plan_id)])
                        : "-"}
                    </TableCell>
                    <TableCell>{code?.duration_in_days}</TableCell>
                    <TableCell>
                      <Tooltip title={t("common.edit")}>
                        <SvgIcon //Edit branch
                          htmlColor="#1976d2"
                          style={{ marginRight: 5, cursor: "pointer" }}
                          onClick={() => {
                            setSelectedForEdit(code);
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
                            setSelectedForDelete(code);
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
        labelRowsPerPage={t("codes.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) =>
          t("codes.displayedRows", { from: from, to: to, count, count })
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
        title={t("codes.deleteConfirmModalTitle")}
        description={t("codes.deleteConfirmModalDescription", {
          name: selectedForDelete?._id || "",
        })}
        leftAction={() => {
          setConfirmModalOpen(false);
        }}
        rightAction={() => {
          deleteCode(selectedForDelete?._id);
        }}
      />
    </Card>
  );
};

CodesTable.propTypes = {
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
