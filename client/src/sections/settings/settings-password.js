import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useAuthContext } from 'src/contexts/auth-context';
import { useTranslation } from 'react-i18next';

export const SettingsPassword = ({setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage}) => {
  const auth = useAuth();
  const state = useAuthContext()

  const {t} = useTranslation()

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  useEffect(() => {
    console.log("ibrahimvalues",values)
  }, [values])

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if(values.password === values.confirm)
        auth.updatePassword(state?.user?.user?._id, values.password).then(res => {
          console.log("ibrahimres",res)
          if(res.message){
            setSnackbarOpen(true);
            setSnackbarSeverity('success');
            setSnackbarMessage('Password updated successfully!');
          }
          else if(res.success === false){
            setSnackbarOpen(true);
            setSnackbarSeverity('error');
            setSnackbarMessage('Password change error');
          }
        }).catch(err => {
          setSnackbarOpen(true);
          setSnackbarSeverity('error');
          setSnackbarMessage('Password change error');
        })
    },
    [values]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader={t("account.updatePassword")}
          title={t("account.password")}
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label={t("account.password")}
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label={t("account.passwordConfirm")}
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={values.password !== values.confirm}>
            {t("common.save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
