import PropTypes from 'prop-types';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';

export const OverviewBudget = (props) => {
  const { sx, value } = props;
  const { t } = useTranslation();
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {t('overview.branches')}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'error.main', height: 56, width: 56 }}>
            <SvgIcon>
              <BuildingStorefrontIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button
        color="inherit"
        endIcon={<SvgIcon fontSize="small"><ArrowRightIcon /></SvgIcon>}
        size="small"
        onClick={() => {}}
      >
        {t('overview.branches')}
      </Button>
      </CardActions>
    </Card>
  );
};

OverviewBudget.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
