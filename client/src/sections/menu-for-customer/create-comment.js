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
import { StarBorder } from "@mui/icons-material";

export const CreateCommentModal = ({
  open,
  onClose,
  colors,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
}) => {
  const { t } = useTranslation();

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
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_SERVER + `/comment/${id}/addComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rate: rate, comment: comment }),
        },
      );

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
          <Card sx={{ backgroundColor: colors?.itemColor || "" }}>
            <CardHeader
              subheader={t("comments.makeCommentDetail")}
              title={t("comments.makeComment")}
              sx={{ color: colors?.textColor || "" }}
              subheaderTypographyProps={{ color: colors?.textColor || "" }}
            />
            <Divider sx={{ borderColor: colors?.textColor }} />
            <CardContent>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <Rating
                  name="customized-10"
                  value={rate}
                  max={10}
                  onChange={(event, newValue) => setRate(newValue)}
                  sx={{ color: colors?.textColor || "" }}
                  emptyIcon={<StarBorder fontSize="inherit" sx={{ color: colors.textColor }} />}
                />

                <TextField
                  fullWidth
                  label={t("comments.makeComment")}
                  name="confirm"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  sx={{
                    input: {
                      color: colors?.textColor,
                    },
                    "& .MuiInputBase-root": {
                      borderColor: colors?.textColor,
                      boxShadow: colors && `${colors.textColor} 0 0 0 2px`,
                    },
                    "& .MuiFormLabel-root": {
                      color: colors?.textColor,
                    },
                  }}
                />
              </Stack>
            </CardContent>
            <Divider sx={{ borderColor: colors?.textColor }} />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  onClose();
                }}
                sx={{
                  backgroundColor: colors?.textColor,
                  "&:hover": {
                    backgroundColor: colors?.textColor ? colors?.textColor + "CC" : "",
                  },
                  color: colors?.itemColor,
                }}
                variant="contained"
              >
                {t("common.back")}
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: colors?.textColor,
                  "&:hover": {
                    backgroundColor: colors?.textColor ? colors?.textColor + "CC" : "",
                  },
                  color: colors?.itemColor,
                }}
              >
                {t("common.save")}
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};
