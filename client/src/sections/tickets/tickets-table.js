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
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import { Link } from 'react-router-dom';
import { getLinkOfMenu, navigateToLink } from 'src/utils/navigate-to-link';
import Tag from 'src/utils/tag';
import { SeverityPill } from 'src/components/severity-pill';

export const TicketsTable = (props) => {
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
    setSnackbarOpen,
    setSnackbarSeverity,
    setSnackbarMessage
  } = props;

  const statusMap = {
    ACTIVE: 'warning',
    DONE: 'success',
    CANCELLED: 'error'
  };

  const state = useAuthContext()
  const restaurant = useRestaurantContext()

  const {t} = useTranslation()

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                  {t("tickets.category")}
                </TableCell>
                <TableCell>
                  {t("tickets.name")}
                </TableCell>
                <TableCell>
                  {t("tickets.description")}
                </TableCell>
                <TableCell>
                  {t("tickets.status")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((ticket) => {
                const isSelected = selected.includes(ticket._id);

                return (
                    <TableRow
                        hover
                        key={ticket.id}
                        selected={isSelected}
                    >
                    <TableCell>
                        {ticket.category}
                    </TableCell>
                    <TableCell>
                        {ticket.name}
                    </TableCell>
                    <TableCell>
                      {ticket.description}
                    </TableCell>
                    <TableCell>
                      {/* <Tag status={ticket.status}/> */}
                      <SeverityPill color={statusMap[ticket.status]}>
                        {t("statuses." + ticket.status.toLowerCase())}
                      </SeverityPill>
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
        labelRowsPerPage={t("tickets.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) => t('tickets.displayedRows', { from: from, to: to, count, count })}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TicketsTable.propTypes = {
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
