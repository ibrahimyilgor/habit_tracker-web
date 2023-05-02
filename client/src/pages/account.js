import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { AccountDelete } from 'src/sections/account/account-delete';
import CustomizedSnackbars from 'src/sections/snackbar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Page = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const {t} = useTranslation()
  
  return(
    <>
      <Head>
        <title>
          Account | Devias Kit
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
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                {t("account.title")}
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails 
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarSeverity={setSnackbarSeverity}
                    setSnackbarMessage={setSnackbarMessage}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <SettingsPassword 
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarSeverity={setSnackbarSeverity}
                    setSnackbarMessage={setSnackbarMessage}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountDelete 
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarSeverity={setSnackbarSeverity}
                    setSnackbarMessage={setSnackbarMessage}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
      <CustomizedSnackbars
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          severity={snackbarSeverity}
          message={snackbarMessage} />
    </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
