import { useCallback, useMemo, useState } from 'react';
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

const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false)

  const restaurant = useRestaurantContext()

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
      [page, rowsPerPage]
    );
  };
  
  const useBranchIds = (branches) => {
    return useMemo(
      () => {
        return branches.map((branch) => branch.id);
      },
      [branches]
    );
  };

  const branches = useBranches(page, rowsPerPage);
  const branchesIds = useBranchIds(branches);
  const branchesSelection = useSelection(branchesIds);

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
                  Branches
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
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
                  </Button>
                </Stack>
              </Stack>
              {!openAdd && (
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
                  Add
                </Button>
              </div>
              )}
            </Stack>
            {!openAdd && (
              <>
                <BranchesSearch />
                <BranchesTable
                  count={restaurant?.restaurants?.length || 0}
                  items={restaurant?.restaurants}
                  onDeselectAll={branchesSelection.handleDeselectAll}
                  onDeselectOne={branchesSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={branchesSelection.handleSelectAll}
                  onSelectOne={branchesSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={branchesSelection.selected} />
              </>
            )}
            {openAdd && (
              <BranchAdd back={() => setOpenAdd(false)}/>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
