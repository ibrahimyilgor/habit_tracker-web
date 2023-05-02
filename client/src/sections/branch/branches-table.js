import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { useRestaurantContext } from 'src/contexts/restaurant-context';
import { useAuthContext } from 'src/contexts/auth-context';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    rowsPerPage = 0,
    selected = [],
    setOpenEdit,
    setSelectedForEdit,
    setSnackbarOpen,
    setSnackbarSeverity,
    setSnackbarMessage
  } = props;

  const state = useAuthContext()
  const restaurant = useRestaurantContext()

  const {t} = useTranslation()

  useEffect(() => {
    console.log("ibrahime", items)
  }, [items]);

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  console.log("itemsss",items)
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  {t("branches.name")}
                </TableCell>
                <TableCell>
                  {t("branches.address")}
                </TableCell>
                <TableCell>
                  {t("branches.phone")}
                </TableCell>
                <TableCell>
                  {t("branches.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer._id);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                        {customer?.name.length > 100 ? (customer?.name.slice(0,100) + "...") : customer?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                    <SvgIcon 
                      htmlColor='gray' 
                      style={{marginRight: 5, cursor:"pointer"}}
                      onClick={() => {
                        setSelectedForEdit(customer)
                        setOpenEdit(true)
                      }}>
                        <PencilIcon />
                      </SvgIcon>
                      <SvgIcon 
                        htmlColor='red' 
                        style={{cursor:"pointer"}}
                        onClick={() => {
                          restaurant.deleteBranch(customer?._id, state?.user?.user?._id).then(res => {
                            if(res.success === true){
                              setSnackbarOpen(true);
                              setSnackbarSeverity('success');
                              setSnackbarMessage('Branch deleted successfully!');
                              restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null)
                            }
                            else {
                              setSnackbarOpen(true);
                              setSnackbarSeverity('error');
                              setSnackbarMessage('Branch could not deleted successfully!');
                            }
                          }); 

                        } }>
                          <XCircleIcon />
                      </SvgIcon>
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
        labelDisplayedRows={({ from, to, count }) => t('branches.displayedRows', { from: from, to: to, count, count })}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
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
  selected: PropTypes.array
};
