import { Fragment, useCallback } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { useAuthContext } from "src/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "src/i18n";

export const languages = [
  { code: "tr", name: "turkish", flag: "https://flagcdn.com/tr.svg", ratio: 1.5 },
  { code: "en", name: "english", flag: "https://flagcdn.com/gb.svg", ratio: 1.66 },
  // Add more languages here
];

export const LanguagePopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const { t } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    onClose?.();
  };

  const handleLanguageSelect = useCallback(
    (lang) => {
      onClose?.();
      // handle language selection here
    },
    [onClose],
  );

  useEffect(() => {
    console.log("safdfda", i18n);
  }, [i18n]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 225 } }}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        {languages.map((lang, index) => (
          <Fragment key={lang.code}>
            <MenuItem onClick={() => changeLang(lang.code)}>
              <Box sx={{ mr: 1, display: "flex" }}>
                <img src={lang.flag} alt={lang.name} width={36} height={36 / lang.ratio} />
              </Box>
              <Typography variant="body1">{t("languages." + lang.name)}</Typography>
            </MenuItem>
            {index !== languages.length - 1 && <Divider />}
          </Fragment>
        ))}
      </MenuList>
    </Popover>
  );
};
