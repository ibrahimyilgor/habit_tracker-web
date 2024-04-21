import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBranches, OverviewBudget } from "src/sections/overview/overview-branches";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewPlan } from "src/sections/overview/overview-plan";
import {
  OverviewAverageRates,
  OverviewTotalCustomers,
} from "src/sections/overview/overview-average-rates";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useAuthContext } from "src/contexts/auth-context";
import { useEffect, useState } from "react";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import i18n from "src/i18n";
import { useTranslation } from "react-i18next";

const now = new Date();

const Page = () => {
  const restaurant = useRestaurantContext();
  const state = useAuthContext();
  const { t } = useTranslation();

  const [averageRate, setAverageRate] = useState({ average30: 0, average60: 0 });

  const getAverageRateOfCommentsInLast30Days = async (id, token, name = null) => {
    const commentsResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/comment/average/${id}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempComments = await commentsResponse.json();

    console.log("tempComments", tempComments);

    setAverageRate(tempComments);

    return tempComments;
  };

  useEffect(() => {
    if (state) {
      getAverageRateOfCommentsInLast30Days(state?.user?.user?._id, state?.user?.token, null);
    }
  }, []);

  const [branchFilter, setBranchFilter] = useState({ value: null });
  const [yearSelector, setYearSelector] = useState(new Date().getFullYear());
  const [visit, setVisit] = useState([{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]);
  const [device, setDevice] = useState([0, 0, 0]);

  useEffect(() => {
    console.log("ibrahimvisit", branchFilter, visit, yearSelector);
  }, [branchFilter, visit, yearSelector]);

  useEffect(() => {
    if (state?.user?.token && yearSelector) {
      getVisit(state?.user?.token, branchFilter?.value, yearSelector);
    }
  }, [state?.user?.token, branchFilter, yearSelector]);

  const getVisit = async (token, branchIds, yearSelector) => {
    if (branchIds === null) {
      const visitResponse = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_SERVER +
          `/restaurantVisit/getAllRestaurantVisitForAUser/` +
          state?.user?.user?._id,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        },
      );
      const tempVisit = await visitResponse.json();
      setVisit(
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.months
          ? [
              {
                name: yearSelector,
                data: tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.months,
              },
            ]
          : [{ name: yearSelector, data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
      );
      setDevice([
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.desktop || 0,
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.tablet || 0,
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.phone || 0,
      ]);

      return tempVisit;
    } else {
      const visitResponse = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_SERVER + `/restaurantVisit/getRestaurantVisit/` + branchIds,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        },
      );
      const tempVisit = await visitResponse.json();

      console.log("tempVisit", tempVisit);

      setVisit(
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.months
          ? [
              {
                name: yearSelector,
                data: tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.months,
              },
            ]
          : [{ name: yearSelector, data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
      );
      setDevice([
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.desktop || 0,
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.tablet || 0,
        tempVisit?.[0]?.data?.filter?.((tv) => tv?.year == yearSelector)?.[0]?.phone || 0,
      ]);

      return tempVisit;
    }
  };

  return (
    <>
      <Head>
        <title>{t("titles.overview")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBranches
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={restaurant.restaurants.length || 0}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewAverageRates
                difference={averageRate?.average60?.toFixed?.(2)}
                positive={averageRate?.average60 <= averageRate?.average30}
                // sx={{ height: '100%' }}
                value={averageRate?.average30?.toFixed?.(2) + " / 10"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewPlan
                sx={{ height: "100%" }}
                planName={
                  state?.user?.user?.plan_id?.name?.filter(
                    (x) => x.language === i18n.languages[0],
                  )?.[0]?.text || ""
                }
                date={state?.user?.user?.plan_expiration_date}
              />
            </Grid>
            {/* <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid> */}
            <Grid xs={12} lg={7}>
              <OverviewSales
                sx={{ height: "100%" }}
                branchFilter={branchFilter}
                setBranchFilter={setBranchFilter}
                yearSelector={yearSelector}
                setYearSelector={setYearSelector}
                visit={visit}
                setVisit={setVisit}
              />
            </Grid>
            <Grid xs={12} md={6} lg={5}>
              <OverviewTraffic
                chartSeries={device}
                labels={[t("overview.desktop"), t("overview.tablet"), t("overview.phone")]}
                sx={{ height: "100%" }}
                branchFilter={branchFilter}
                setBranchFilter={setBranchFilter}
                yearSelector={yearSelector}
                setYearSelector={setYearSelector}
              />
            </Grid>
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "DEV1049",
                    amount: 30.5,
                    customer: {
                      name: "Ekaterina Tankova",
                    },
                    createdAt: 1555016400000,
                    status: "pending",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "DEV1048",
                    amount: 25.1,
                    customer: {
                      name: "Cao Yu",
                    },
                    createdAt: 1555016400000,
                    status: "delivered",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "DEV1047",
                    amount: 10.99,
                    customer: {
                      name: "Alexa Richardson",
                    },
                    createdAt: 1554930000000,
                    status: "refunded",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "DEV1046",
                    amount: 96.43,
                    customer: {
                      name: "Anje Keizer",
                    },
                    createdAt: 1554757200000,
                    status: "pending",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "DEV1045",
                    amount: 32.54,
                    customer: {
                      name: "Clarke Gillebert",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "DEV1044",
                    amount: 16.76,
                    customer: {
                      name: "Adam Denisov",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
