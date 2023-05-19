import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BranchesTable } from 'src/sections/branch/branches-table';
import { BranchesSearch } from 'src/sections/branch/branches-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { BranchAdd } from 'src/sections/branch/branches-add';
import { useRestaurantContext } from 'src/contexts/restaurant-context';
import { BranchEdit } from 'src/sections/branch/branch-edit';
import CustomizedSnackbars from 'src/sections/snackbar';
import { useTranslation } from 'react-i18next';

const now = new Date();

const BranchMenu = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedForEdit, setSelectedForEdit] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const restaurant = useRestaurantContext()

  const {t} = useTranslation()

  console.log("restaurr",restaurant)

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const useBranches = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(restaurant?.restaurants || [], page, rowsPerPage);
      },
      [page, rowsPerPage, restaurant]
    );
  };

  useEffect(
      () => {
       setPage(0) 
      },
      [rowsPerPage]
    );
  
  const useBranchIds = (branches) => {
    return useMemo(
      () => {
        return branches.map((branch) => branch._id);
      },
      [branches]
    );
  };

  const branches = useBranches(page, rowsPerPage);
  const branchesIds = useBranchIds(branches);
  const branchesSelection = useSelection(branchesIds);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Branches | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t("branches.title")}
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  {/* <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              {!openAdd && !openEdit && (
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
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
                <BranchesTable
                  count={restaurant?.restaurants?.length || 0}
                  items={branches}
                  onDeselectAll={branchesSelection.handleDeselectAll}
                  onDeselectOne={branchesSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={branchesSelection.handleSelectAll}
                  onSelectOne={branchesSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setOpenEdit={setOpenEdit}
                  setSelectedForEdit={setSelectedForEdit}
                  selected={branchesSelection.selected}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarMessage={setSnackbarMessage} />
              </>
            )}
            {openAdd && (
              <BranchAdd 
                back={() => setOpenAdd(false)}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
              />
            )}
            {openEdit && (
              <BranchEdit 
                selectedForEdit={selectedForEdit} 
                setSelectedForEdit={setSelectedForEdit} 
                back={() => setOpenEdit(false)}
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
        message={snackbarMessage} />
    </>
  );
};

BranchMenu.getLayout = (branchMenu) => (
  <DashboardLayout>
    {branchMenu}
  </DashboardLayout>
);

export default BranchMenu;
