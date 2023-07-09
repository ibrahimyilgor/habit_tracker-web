import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import CustomizedSnackbars from 'src/sections/snackbar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const {t} = useTranslation()

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      surname: '',
      submit: null
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(t("register.mustBeAValidEmail"))
        .max(255)
        .required(t("register.emailIsRequired")),
      name: Yup
        .string()
        .max(255)
        .required(t("register.nameIsRequired")),
      password: Yup
        .string()
        .max(255)
        .min(8, t("register.minEightChars"))
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, t("register.passwordContentCriteria"))
        .required(t("register.passwordIsRequired"))
    }),
    onSubmit: async (values, helpers) => {
      try {


        const formData = new FormData()
        for (let value in values){
          formData.append(value, values[value])
        }

        await auth.signUp(formData).then(res => {
          if(res.error){
            if(res.error.includes("duplicate key error")){
              setSnackbarOpen(true);
              setSnackbarSeverity('error');
              setSnackbarMessage('Email is already used');
            }
            else{
              setSnackbarOpen(true);
              setSnackbarSeverity('error');
              setSnackbarMessage('Failed to register');
            }

          }
          else{
            // setSnackbarOpen(true);
            // setSnackbarSeverity('success');
            // setSnackbarMessage('Registered successfully!');
            router.push('/');
          }
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        console.log("saveduser2",err)
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                {t("register.title")}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {t("register.alreadyHaveAnAccount")}
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  {t("register.login")}
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label={t("register.name")}
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label={t("register.email")}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label={t("register.password")}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={formik.errors.name || formik.errors.email || formik.errors.password}
              >
                {t("register.continue")}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage} 
      />
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
