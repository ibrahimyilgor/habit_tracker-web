import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';

const Theme = () => (
  <>
    <Head>
      <title>
      Theme | Devias Kit
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
              Plan
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={4}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={4}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={4}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Theme.getLayout = (theme) => (
  <DashboardLayout>
    {theme}
  </DashboardLayout>
);

export default Theme;
