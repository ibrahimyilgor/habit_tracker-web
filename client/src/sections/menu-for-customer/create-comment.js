import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Modal,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { useAuthContext } from "src/contexts/auth-context";
import CustomizedSnackbars from "../snackbar";

export const CreateCommentModal = ({
  open,
  onClose,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
}) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log("idid", id);

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("ratete", rate);
  }, [rate]);

  useEffect(() => {
    if (open) {
      setRate(0);
      setComment("");
    }
  }, [open]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.BACKEND_SERVER + `/comment/${id}/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rate: rate, comment: comment }),
      });

      if (response.ok) {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(t("comments.successMessage"));
        onClose();
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("comments.errorMessage"));
      }
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(t("comments.errorMessage"));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          height: "100%", // Make the container take full height of the viewport
        }}
      >
        <form onSubmit={addComment}>
          <Card>
            <CardHeader
              subheader={t("comments.makeCommentDetail")}
              title={t("comments.makeComment")}
            />
            <Divider />
            <CardContent>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <Rating
                  name="customized-10"
                  value={rate}
                  max={10}
                  onChange={(event, newValue) => setRate(newValue)}
                />

                <TextField
                  fullWidth
                  label={t("comments.makeComment")}
                  name="confirm"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  onClose();
                }}
                variant="contained"
              >
                {t("common.back")}
              </Button>
              <Button variant="contained" type="submit">
                {t("common.save")}
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};
