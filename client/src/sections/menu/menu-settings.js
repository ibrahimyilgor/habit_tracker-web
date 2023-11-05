import { useCallback, useEffect, useState } from "react";
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
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ColorPicker } from "src/components/color-picker";
import { PLAN_IDS } from "src/utils/constants";
import { useAuthContext } from "src/contexts/auth-context";

export const MenuSettings = ({ settings, setSettings }) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    console.log("ibosettings", settings);
  }, [settings]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">{t("menu.settings.basicSettings")}</Typography>
                <Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          ![1, 2].includes(PLAN_IDS.indexOf(state?.user?.user?.plan_id?._id))
                        } // DISABLE IF BASIC PLAN
                        checked={settings?.showLogo}
                        onChange={(e) => {
                          setSettings({ ...settings, showLogo: e.target.checked });
                        }}
                      />
                    }
                    label={t("menu.settings.showLogo")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          ![1, 2].includes(PLAN_IDS.indexOf(state?.user?.user?.plan_id?._id))
                        } // DISABLE IF BASIC PLAN
                        checked={settings?.showComment}
                        onChange={(e) => {
                          setSettings({ ...settings, showComment: e.target.checked });
                        }}
                      />
                    }
                    label={t("menu.settings.showComment")}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={1}>
                <Typography variant="h6">{t("menu.settings.design")}</Typography>
                <Stack>
                  <FormControlLabel
                    style={{ marginLeft: 0 }}
                    control={
                      <ColorPicker
                        disabled={
                          ![1, 2].includes(PLAN_IDS.indexOf(state?.user?.user?.plan_id?._id))
                        } // DISABLE IF BASIC PLAN
                        style={{ paddingRight: 10 }}
                        color={settings?.colors?.backgroundColor}
                        onChange={(e) => {
                          console.log("eeee", e);
                          let backgroundCol = { ...settings?.colors, backgroundColor: e?.hex };
                          setSettings({ ...settings, colors: backgroundCol });
                        }}
                      />
                    }
                    label={t("menu.settings.backgroundColor")}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 0 }}
                    control={
                      <ColorPicker
                        disabled={
                          ![1, 2].includes(PLAN_IDS.indexOf(state?.user?.user?.plan_id?._id))
                        } // DISABLE IF BASIC PLAN
                        style={{ paddingRight: 10 }}
                        color={settings?.colors?.itemColor}
                        onChange={(e) => {
                          let itemCol = { ...settings?.colors, itemColor: e?.hex };
                          setSettings({ ...settings, colors: itemCol });
                        }}
                      />
                    }
                    label={t("menu.settings.itemColor")}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 0 }}
                    control={
                      <ColorPicker
                        disabled={
                          ![1, 2].includes(PLAN_IDS.indexOf(state?.user?.user?.plan_id?._id))
                        } // DISABLE IF BASIC PLAN
                        style={{ paddingRight: 10 }}
                        color={settings?.colors?.textColor}
                        onChange={(e) => {
                          let textCol = { ...settings?.colors, textColor: e?.hex };
                          setSettings({ ...settings, colors: textCol });
                        }}
                      />
                    }
                    label={t("menu.settings.textColor")}
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
