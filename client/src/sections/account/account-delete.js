import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useAuthContext } from "src/contexts/auth-context";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "src/components/confirmModal";

export const AccountDelete = ({ setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage }) => {
  const router = useRouter();
  const state = useAuthContext();

  const { t } = useTranslation();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setConfirmModalOpen(true);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader={t("account.accountDeleteMessage")}
          title={t("account.accountDelete")}
        />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400, height: "130px" }}></Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="error" type="submit">
            {t("common.delete")}
          </Button>
        </CardActions>
      </Card>
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        leftButtonMessage={t("common.back")}
        rightButtonMessage={t("common.delete")}
        title={t("account.accountDelete")}
        description={t("account.accountDeleteMessage")}
        leftAction={() => {
          setConfirmModalOpen(false);
        }}
        rightAction={() => {
          state.deleteUser(state?.user?.user?._id).then((res) => {
            if (res.success === true) {
              setSnackbarOpen(true);
              setSnackbarSeverity("success");
              setSnackbarMessage("User deleted successfully!");
              router.push("/auth/login");
            } else {
              setSnackbarOpen(true);
              setSnackbarSeverity("error");
              setSnackbarMessage("User could not deleted successfully!");
            }
          });
        }}
      />
    </form>
  );
};
