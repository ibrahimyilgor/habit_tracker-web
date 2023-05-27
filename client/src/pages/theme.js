import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useTranslation } from 'react-i18next';

const Theme = () =>  {
  const {t} = useTranslation()

  return(
    <>
      <Head>
        <title>Theme | Devias Kit</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8, pr: 6 }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">{t("theme.title")}</Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <AccountProfile />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  )};

Theme.getLayout = (theme) => <DashboardLayout>{theme}</DashboardLayout>;

export default Theme;
