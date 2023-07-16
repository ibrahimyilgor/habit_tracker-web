import { useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const MenuSettings = ({settings, setSettings}) => {

    const {t} = useTranslation()

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              xs={12}
              sm={6}
              md={4}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                    {t("menu.settings.basicSettings")}
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={
                        <Checkbox 
                            checked={settings?.showLogo}
                            onChange={e => {
                                setSettings({ ...settings, showLogo: e.target.checked });
                            }}
                        />
                    }
                    label={t("menu.settings.showLogo")}
                  />
                  <FormControlLabel
                    control={
                        <Checkbox 
                            checked={settings?.showComment}
                            onChange={e => {
                                setSettings({ ...settings, showComment: e.target.checked });
                            }}
                        />
                    }
                    label={t("menu.settings.showComment")}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                    {t("menu.settings.design")}
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Phone calls"
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
