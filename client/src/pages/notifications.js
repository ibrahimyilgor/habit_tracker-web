import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack } from '@mui/system';
import Head from 'next/head';



const Notifications = () => {
  const {t} = useTranslation()

  return (
    <>
        <Head>
            <title>
                Menu | Devias Kit
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
                            {t("sideNav.notifications")}
                        </Typography>
                    </div>
                </Stack>
            </Container>
        </Box>
    </>
  )};

  Notifications.getLayout = (notifications) => (
  <DashboardLayout>
    {notifications}
  </DashboardLayout>
);

export default Notifications;
