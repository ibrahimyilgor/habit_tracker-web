import React, { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack } from '@mui/system';
import Head from 'next/head';
import { useAuthContext } from 'src/contexts/auth-context';
import i18n from 'src/i18n';
import { BranchesTable } from 'src/sections/branch/branches-table';
import { CommentsTable } from 'src/sections/comment/comments-table';


const Comments = () => {
  const {t} = useTranslation()
  const state = useAuthContext()

  const lang = i18n.language

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  return (
    <>
        <Head>
            <title>
                Comments | Devias Kit
            </title>
        </Head>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
        >
            <Container maxWidth="lg">
                <Stack spacing={0}>
                    <div style={{flex: 2, display: "flex", alignItems: "center", marginBottom: 20}}>
                        <Typography variant="h4">
                            {t("sideNav.comments")}
                        </Typography>
                    </div>
                </Stack>
                <Stack spacing={0}>
                        <CommentsTable
                            count={6}
                            items={[
                                {
                                    id: 1,
                                    branch: "xasd",
                                    rate: 5,
                                    comment: "czfdadsfadafssfd"
                                },
                                {
                                    id: 2,
                                    branch: "asdfx",
                                    rate: 3,
                                    comment: "afdsafdsfds"
                                },
                                {
                                    id: 3,
                                    branch: "xqweq",
                                    rate: 8,
                                    comment: "qewrqwerqwf"
                                },
                                {
                                    id: 4,
                                    branch: "fasdfax",
                                    rate: 1,
                                    comment: "fhgjftnbdrt"
                                },
                                {
                                    id: 5,
                                    branch: "xwerqweqw",
                                    rate: 9,
                                    comment: "rttertwer"
                                },
                                {
                                    id: 6,
                                    branch: "asdasd",
                                    rate: 10,
                                    comment: "qwedasd"
                                }
                            ]}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            // selected={branchesSelection.selected}
                        />
                </Stack>
            </Container>
        </Box>
    </>
  )};

  Comments.getLayout = (comments) => (
  <DashboardLayout>
    {comments}
  </DashboardLayout>
);

export default Comments;
