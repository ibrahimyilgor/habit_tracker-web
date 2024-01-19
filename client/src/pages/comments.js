import React, { useCallback, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { useAuthContext } from "src/contexts/auth-context";
import i18n from "src/i18n";
import { CommentsTable } from "src/sections/comment/comments-table";
import { useEffect } from "react";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import CustomizedSnackbars from "src/sections/snackbar";

const Comments = () => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const [comments, setComments] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");

  const getComments = async (id, token, name = null) => {
    const commentsResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/comment/${id}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempComments = await commentsResponse.json();

    console.log("tempComments", tempComments);

    setComments(tempComments);

    return tempComments;
  };

  useEffect(() => {
    if (state) {
      getComments(state?.user?.user?._id, state?.user?.token, null);
    }
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    console.log("comments", comments, page, rowsPerPage);
  }, [comments, page, rowsPerPage]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const useComments = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(
        comments.filter((c) => c?.comment?.toLowerCase().includes(searchQuery.toLowerCase())) || [],
        page,
        rowsPerPage,
      );
    }, [page, rowsPerPage, comments, searchQuery]);
  };

  const useCommentIds = (comments) => {
    return useMemo(() => {
      return comments.map((comment) => comment._id);
    }, [comments]);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const commentsData = useComments(page, rowsPerPage);
  const commentIds = useCommentIds(comments);
  const commentsSelection = useSelection(commentIds);

  return (
    <>
      <Head>
        <title>Comments | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={0}>
            <div style={{ flex: 2, display: "flex", alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h4">{t("sideNav.comments")}</Typography>
            </div>
          </Stack>
          <Stack spacing={0}>
            <CommentsTable
              count={comments?.length || 0}
              items={commentsData}
              onSelectAll={commentsSelection.handleSelectAll}
              onSelectOne={commentsSelection.handleSelectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              selected={commentsSelection.selected}
              getComments={getComments}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarSeverity={setSnackbarSeverity}
              setSnackbarMessage={setSnackbarMessage}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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

Comments.getLayout = (comments) => <DashboardLayout>{comments}</DashboardLayout>;

export default Comments;
