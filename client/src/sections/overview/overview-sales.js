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
import { useEffect, useRef, useState } from "react";
import { OverviewBranchSelector } from "./overview-branch-selector";
import OverviewDateRangePicker from "./overview-date-range-picker";

const useChartOptions = () => {
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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();
  const cardRef = useRef();
  const [branchFilter, setBranchFilter] = useState({ value: null });

  return (
    <>
      <Card sx={sx} ref={cardRef}>
        <CardHeader
          action={
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <OverviewBranchSelector
                width={cardRef?.current?.clientWidth / 3}
                value={branchFilter}
                handleChange={(e) => {
                  setBranchFilter(e.target);
                }}
              />
              {/* <OverviewDateRangePicker /> */}
            </Box>
          }
          title="Sales"
        />
        <CardContent>
          <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
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
