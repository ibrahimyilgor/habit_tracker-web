import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Rating,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ConfirmModal } from 'src/components/confirmModal';

export const CommentsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

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
                  {t("comments.id")}
                </TableCell>
                <TableCell>
                  {t("comments.branch")}
                </TableCell>
                <TableCell>
                  {t("comments.rate")}
                </TableCell>
                <TableCell>
                  {t("comments.comment")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((comment) => {
                const isSelected = selected.includes(comment.id);

                return (
                    <TableRow
                        hover
                        key={comment.id}
                        selected={isSelected}
                    >
                        <TableCell>
                            {comment.id}
                        </TableCell>
                        <TableCell>
                            {comment.branch}
                        </TableCell>
                        <TableCell>
                            <Rating disabled={true} name="customized-10" defaultValue={comment.rate} max={10} />
                        </TableCell>
                        <TableCell>
                            {comment.comment}
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
        labelRowsPerPage={t("comments.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) => t('comments.displayedRows', { from: from, to: to, count, count })}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CommentsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
