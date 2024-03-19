import PropTypes from "prop-types";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import { BranchSelector } from "../branch/branch-selector";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OverviewBranchSelector } from "./overview-branch-selector";
import OverviewDateRangePicker from "./overview-date-range-picker";
import { useAuthContext } from "src/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { OverviewYearSelector } from "./overview-year-selector";

const useChartOptions = (t) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: [
        t("months.Jan"),
        t("months.Feb"),
        t("months.Mar"),
        t("months.Apr"),
        t("months.May"),
        t("months.Jun"),
        t("months.Jul"),
        t("months.Aug"),
        t("months.Sep"),
        t("months.Oct"),
        t("months.Nov"),
        t("months.Dec"),
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value,
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const OverviewSales = (props) => {
  const { sx, branchFilter, setBranchFilter, setYearSelector, yearSelector, visit } = props;
  const { t } = useTranslation();
  const chartOptions = useChartOptions(t);
  const cardRef = useRef();
  const state = useAuthContext();

  return (
    <>
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
        <CardHeader title={t("overview.sales")} />
        <CardContent>
          <Chart height={350} options={chartOptions} series={visit} type="bar" width="100%" />
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
