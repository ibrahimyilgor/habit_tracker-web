import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import CustomizedSnackbars from "src/sections/snackbar";
import { useTranslation } from "react-i18next";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";
import { CodesTable } from "src/sections/codes/codes-table";
import { CodesAdd } from "src/sections/codes/codes-add";
import { CodesEdit } from "src/sections/codes/codes-edit";
import { useAuthContext } from "src/contexts/auth-context";

const Codes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [plan, setPlan] = useState({ id: 0, name: "plans" });
  const [commentData, setCommentData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const state = useAuthContext();

  const { t } = useTranslation();

  const getCodes = async (token) => {
    const codeResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/planCode/getCodes`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempCodes = await codeResponse.json();

    setCommentData(tempCodes);

    return tempCodes;
  };

  useEffect(() => {
    getCodes(state?.user?.token);
  }, []);

  useEffect(() => {
    if (refetch === true) {
      getCodes(state?.user?.token);
    }
    setTimeout(() => {
      setRefetch(false);
    }, 1000);
  }, [refetch]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const useCodes = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(
        plan?.id
          ? commentData?.filter((res) => {
              return res?.plan_id === plan?.id;
            })
          : commentData || [],
        // commentData,
        page,
        rowsPerPage,
      );
    }, [page, commentData, rowsPerPage, searchQuery, plan]);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const useCodeIds = (codes) => {
    return useMemo(() => {
      return codes.map((branch) => branch._id);
    }, [codes]);
  };

  const codes = useCodes(page, rowsPerPage);
  const codesIds = useCodeIds(codes);
  const codesSelection = useSelection(codesIds);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>{t("titles.codes")}</title>
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
                <Typography variant="h4">{t("codes.title")}</Typography>
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
                {/* <BranchesSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
                <CodesTable
                  count={commentData?.length || 0} // ARRAYIN BOYU
                  items={codes}
                  onDeselectAll={codesSelection.handleDeselectAll}
                  onDeselectOne={codesSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={codesSelection.handleSelectAll}
                  onSelectOne={codesSelection.handleSelectOne}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setOpenEdit={setOpenEdit}
                  setSelectedForEdit={setSelectedForEdit}
                  selected={codesSelection.selected}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarMessage={setSnackbarMessage}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  plan={plan}
                  setPlan={setPlan}
                  setRefetch={setRefetch}
                />
              </>
            )}
            {openAdd && !openEdit && (
              <CodesAdd
                back={() => setOpenAdd(false)}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                setRefetch={setRefetch}
              />
            )}

            {openEdit && !openAdd && (
              <CodesEdit
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

Codes.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Codes;
