import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from 'src/i18n';
import { useAuthContext } from 'src/contexts/auth-context';
import { PlanComponent } from 'src/sections/plan/plan-component';

const Plan = () => {
  const {t} = useTranslation()
  const state = useAuthContext()

  const lang = i18n.language

  const [plan, setPlan] = useState([])

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://qr-meny.onrender.com/plan/list`,
          {
            method: 'GET',
            headers: {"Authorization": "Bearer " + state?.user?.token },
          }
        );

        const tempPlanData = await response.json()

        console.log("tempPlanData", tempPlanData)
  
        setPlan(tempPlanData)
  
        return tempPlanData
      } catch (error) {
        console.error('Error fetching plans', error);
        return null
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return(
    <>
      <Head>
        <title>Theme | Devias Kit</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8, pr: 6 }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">{t("plan.title")}</Typography>
            </div>
            {plan.map((p, index) => (
              <Grid item xs={12} md={4} lg={4}>
                <PlanComponent plan={p} />
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )};

Plan.getLayout = (plan) => (
  <DashboardLayout>
    {plan}
  </DashboardLayout>
);

export default Plan;
