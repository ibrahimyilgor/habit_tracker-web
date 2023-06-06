import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack } from '@mui/system';
import Head from 'next/head';
import { useAuthContext } from 'src/contexts/auth-context';
import i18n from 'src/i18n';


const Comments = () => {
  const {t} = useTranslation()
  const state = useAuthContext()

  const lang = i18n.language

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
