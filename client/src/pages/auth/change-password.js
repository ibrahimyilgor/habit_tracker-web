import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useTranslation } from "react-i18next";
import jwt from "jsonwebtoken";

const Page = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();

  const [token, setToken] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenTemp = urlParams.get("token");

    // Now you have the token, you can perform any necessary actions
    const decodedToken = jwt.decode(tokenTemp);
    setToken(decodedToken);
    // You can pass the token to an API endpoint or use it as needed for password reset functionality
    // For example: send an API request to verify the token and display the appropriate UI
    // resetPassword(token);
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
      submit: null,
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: Yup.object({
      password: Yup.string()
        .max(255)
        .min(8, t("register.minEightChars"))
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, t("register.passwordContentCriteria"))
        .required(t("register.passwordIsRequired")),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t("rePassword.passwordsMustMatch"))
        .required(t("rePassword.rePasswordIsRequired")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.changePassword(values, token);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const isDisabled = () => {
    try {
      if (!token || !token.exp) {
        return true; // Invalid token or missing expiration time
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > token.exp;
    } catch (err) {
      return true; // Invalid token or error occurred
    }
  };

  return (
    <>
      <Head>
        <title>{t("titles.changePassword")}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">{t("rePassword.title")}</Typography>
              <Typography color="text.secondary" variant="body2">
                {t("rePassword.rememberedPw")}
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  {t("register.login")}
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={t("rePassword.email")}
                  name="email"
                  type="email"
                  value={token?.name || ""}
                  disabled={true}
                />
                <TextField
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label={t("rePassword.password")}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  fullWidth
                  helperText={formik.touched.rePassword && formik.errors.rePassword}
                  label={t("rePassword.RePassword")}
                  name="rePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.rePassword}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={formik.errors.password || formik.errors.rePassword || isDisabled()}
              >
                {t("rePassword.continue")}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
