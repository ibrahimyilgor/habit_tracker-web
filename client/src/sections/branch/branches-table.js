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
import QRCode from 'react-qr-code';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';

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

  const qrCodeRef = useRef(null);

  const {t} = useTranslation()

  const getLinkOfMenu = (id) => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}/branchMenu?id=${id}`;
  };

  const downloadQRCode = (id, name) => {
    const svg = qrCodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);

    const link = document.createElement('a');
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "QR_" + name + ".svg'";
    link.click();

    URL.revokeObjectURL(url);
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      downloadQRCode();
    }
  });

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
              <TableCell>
                  {t("branches.qr")}
                </TableCell>
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
                  <TableCell>
                    <div ref={qrCodeRef}>
                      <QRCode 
                        style={{ height: "auto", width: "35%" }}
                        value={getLinkOfMenu(customer._id)}
                        size={5}
                      />
                    </div>
                  </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
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
                      <SvgIcon //Edit branch
                        htmlColor='gray' 
                        style={{marginRight: 5, cursor:"pointer"}}
                        onClick={() => {
                          setSelectedForEdit(customer)
                          setOpenEdit(true)
                        }}>
                          <PencilIcon />
                        </SvgIcon>

                        <SvgIcon //Delete branch
                          htmlColor='red' 
                          style={{marginRight: 5, cursor:"pointer"}}
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

                        <SvgIcon //Download QR
                          htmlColor='blue' 
                          style={{cursor:"pointer"}}
                          onClick={() => {
                            downloadQRCode(customer._id, customer.name)
                          } }>
                            <ArrowDownOnSquareIcon />
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
