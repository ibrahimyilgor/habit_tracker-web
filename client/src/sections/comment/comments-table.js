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
import { ParseToDateAndHour } from 'src/utils/date';
import { Search } from 'src/components/search';

export const CommentsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    setPage,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    getComments = () => {},
    setSnackbarOpen,
    setSnackbarSeverity,
    setSnackbarMessage,
    searchQuery,
    setSearchQuery
  } = props;

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState();

  const state = useAuthContext()

useEffect(() => {
  console.log("countt",count)
},[count])

  const {t} = useTranslation()

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Search 
            placeholder={t("common.search")}
            value={searchQuery}
            setValue={setSearchQuery}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {t("comments.branch")}
                </TableCell>
                <TableCell>
                  {t("comments.rate")}
                </TableCell>
                <TableCell>
                  {t("comments.comment")}
                </TableCell>
                <TableCell>
                  {t("comments.date")}
                </TableCell>
                <TableCell>
                  {t("comments.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.map((comment) => {
                const isSelected = selected.includes(comment.id);

                return (
                    <TableRow
                        hover
                        key={comment.id}
                        selected={isSelected}
                    >
                        <TableCell>
                          {comment?.restaurant?.name ?? "-"}
                        </TableCell>
                        <TableCell>
                          <Rating readOnly name="customized-10" value={comment.rate} max={10} />
                        </TableCell>
                        <TableCell>
                          {comment?.comment ?? "-"}
                        </TableCell>
                        <TableCell>
                          {comment?.createdAt ? ParseToDateAndHour(comment?.createdAt) : "-"}
                        </TableCell>
                        <TableCell>

                            <Tooltip title={t("common.delete")}>
                              <SvgIcon //Delete branch
                                htmlColor='#f44336' 
                                style={{marginRight: 5, cursor:"pointer"}}
                                onClick={() => {setConfirmModalOpen(true); setSelectedForDelete(comment)} }>
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
        labelRowsPerPage={t("comments.rowsPerPageLabel")}
        labelDisplayedRows={({ from, to, count }) => t('comments.displayedRows', { from: from, to: to, count, count })}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ConfirmModal
        open={confirmModalOpen} 
        onClose={() => {setConfirmModalOpen(false)}}
        leftButtonMessage={t("common.back")} 
        rightButtonMessage={t("common.delete")} 
        title={t("comments.deleteConfirmModalTitle")} 
        description={t("comments.deleteConfirmModalDescription", {name: selectedForDelete?.name || ""})} 
        leftAction={() => {setConfirmModalOpen(false)}} 
        rightAction={ async () => {
            try {
              const response = await fetch(`https://qr-meny.onrender.com/comment/${selectedForDelete?._id}/deleteComment`, {
                method: 'DELETE',
                headers: {
                  "Authorization": "Bearer " + state?.user?.token
                },
              });
              const data = await response.json();
              setSnackbarOpen(true);
              setSnackbarSeverity('success');
              setSnackbarMessage('Comment deleted successfully!');
              setConfirmModalOpen(false)
              getComments(state?.user?.user?._id, state?.user?.token, null)
              setPage(0)
            } catch (error) {
              setSnackbarOpen(true);
              setSnackbarSeverity('error');
              setSnackbarMessage('Comment could not deleted successfully!');
            }
        }} 
      />
    </Card>
  );
};

CommentsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  getComments: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
