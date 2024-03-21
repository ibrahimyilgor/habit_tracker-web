import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { CreateCommentModal } from "./create-comment";
import { useState } from "react";
import { LanguagePopover } from "src/layouts/dashboard/language-popover";
import { usePopover } from "src/hooks/use-popover";
import { Divider } from "@mui/material";

const ITEM_HEIGHT = 48;

export default function RightTopMenu({
  settings,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
  colors,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const languagePopover = usePopover();

  const [openCreateCommentModal, setOpenCreateCommentModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    settings.showComment && {
      name: t("rightTopMenu.comment"),
      action: () => {
        setOpenCreateCommentModal(true);
        handleClose();
      },
    },
    {
      name: t("topNav.language"),
      action: () => {
        languagePopover.handleOpen();
        handleClose();
      },
    },
  ].filter(Boolean);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: colors?.itemColor ?? "primary" }}
        ref={languagePopover.anchorRef}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: colors?.itemColor,
          },
        }}
      >
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <MenuItem
              sx={{
                backgroundColor: colors?.itemColor || "",
                color: colors?.textColor,
              }}
              key={option.name}
              onClick={option.action}
            >
              {option.name}
            </MenuItem>
            {index !== options.length - 1 && <Divider sx={{ borderColor: colors?.textColor }} />}
          </React.Fragment>
        ))}
      </Menu>
      <CreateCommentModal
        open={openCreateCommentModal}
        onClose={() => setOpenCreateCommentModal(false)}
        colors={colors}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarSeverity={setSnackbarSeverity}
        setSnackbarMessage={setSnackbarMessage}
      />
      <LanguagePopover
        anchorEl={languagePopover.anchorRef.current}
        open={languagePopover.open}
        onClose={languagePopover.handleClose}
        colors={colors}
      />
    </div>
  );
}
