import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { useRouter } from "next/router";

export const OverviewPlan = (props) => {
  const { planName, date, sx } = props;
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Card sx={sx}>
      <CardContent sx={{ minHeight: 180 }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              {t("overview.plan")}
            </Typography>
            <Typography variant="h4">{planName.split(" ")[0]}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={date} variant="determinate" />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={() => {
            router.push("/plan");
          }}
        >
          {t("overview.plan")}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewPlan.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
