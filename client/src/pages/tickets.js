import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { BranchesTable } from "src/sections/branch/branches-table";
import { BranchesSearch } from "src/sections/branch/branches-search";
import { applyPagination } from "src/utils/apply-pagination";
import { BranchAdd } from "src/sections/branch/branches-add";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { BranchEdit } from "src/sections/branch/branch-edit";
import CustomizedSnackbars from "src/sections/snackbar";
import { TicketsTable } from "src/sections/tickets/tickets-table";
import { TicketsAdd } from "src/sections/tickets/tickets-add";
import { useAuthContext } from "src/contexts/auth-context";
import { PLAN_IDS, ROLES, USER_ROLES } from "src/utils/constants";

const Tickets = () => {
  const { t } = useTranslation();

  const state = useAuthContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const useBranches = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination([], page, rowsPerPage);
    }, [page, rowsPerPage]);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const useBranchIds = (branches) => {
    return useMemo(() => {
      return branches.map((branch) => branch._id);
    }, [branches]);
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const branches = useBranches(page, rowsPerPage);
  const branchesIds = useBranchIds(branches);
  const branchesSelection = useSelection(branchesIds);

  return (
    <>
      <Head>
        <title>Tickets | Devias Kit</title>
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
                <Typography variant="h4">{t("sideNav.tickets")}</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              {!openAdd && state?.user?.user?.plan_id?._id.includes[PLAN_IDS] && (
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
            {!openAdd && (
              <>
                <TicketsTable
                  count={0}
                  items={[
                    {
                      name: "ticket1",
                      category: "category1",
                      description: "description1",
                      status: "ACTIVE",
                    },
                    {
                      name: "ticket2",
                      category: "category2",
                      description: "description2",
                      status: "DONE",
                    },
                    {
                      name: "ticket3",
                      category: "category3",
                      description: "description3",
                      status: "CANCELLED",
                    },
                  ]}
                  onDeselectAll={branchesSelection.handleDeselectAll}
                  onDeselectOne={branchesSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={branchesSelection.handleSelectAll}
                  onSelectOne={branchesSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={branchesSelection.selected}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarMessage={setSnackbarMessage}
                />
              </>
            )}
            {openAdd && (
              <TicketsAdd
                back={() => setOpenAdd(false)}
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

Tickets.getLayout = (tickets) => <DashboardLayout>{tickets}</DashboardLayout>;

export default Tickets;
