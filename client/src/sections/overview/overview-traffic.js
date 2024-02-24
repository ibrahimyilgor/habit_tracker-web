import PropTypes from "prop-types";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { Chart } from "src/components/chart";
import { BranchSelector } from "../branch/branch-selector";
import { useRef, useState } from "react";
import { OverviewBranchSelector } from "./overview-branch-selector";
import { useTranslation } from "react-i18next";
import { OverviewYearSelector } from "./overview-year-selector";
import { sum } from "lodash";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};

export const OverviewTraffic = (props) => {
  const { chartSeries, labels, sx, branchFilter, setBranchFilter, setYearSelector, yearSelector } =
    props;
  const { t } = useTranslation();
  const chartOptions = useChartOptions(labels);
  const cardRef = useRef();

  return (
    <Card sx={sx} ref={cardRef}>
      <CardHeader
        title={
          <Box sx={{ display: "inline-flex", flexDirection: "row", width: "100%" }}>
            <Box sx={{ paddingRight: "5px", width: "60%" }}>
              <OverviewBranchSelector
                width={"100%"}
                value={branchFilter}
                handleChange={(e) => {
                  setBranchFilter(e.target);
                }}
              />
            </Box>
            <Box sx={{ paddingLeft: "5px", width: "40%" }}>
              <OverviewYearSelector
                width={"100%"}
                value={yearSelector}
                handleChange={(e) => {
                  setYearSelector(e.target.value);
                }}
              />
            </Box>
          </Box>
        }
      />
      <CardHeader title={t("overview.trafficSource")} />
      <CardContent>
        <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {iconMap[label]}
                <Typography sx={{ my: 1 }} variant="h6">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {`${((item / sum(chartSeries)) * 100).toFixed(2)} %`}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
