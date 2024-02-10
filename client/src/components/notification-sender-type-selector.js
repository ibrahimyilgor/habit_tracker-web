import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NotificationSenderTypeSelector = ({ senderType, setSenderType, fullWidth }) => {
  const { t } = useTranslation();
  const senderTypes = [
    { label: t("notifications.all"), value: "all" },
    { label: t("notifications.plan"), value: "plan" },
    { label: t("notifications.user"), value: "user" },
  ];

  const handleChange = (event) => {
    setSenderType(event.target.value);
  };

  const styles = {
    select: {
      //   height: "53.133px",
      width: fullWidth ? "100%" : "65px",
    },
  };

  return (
    <Select
      native={false}
      displayEmpty={true}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={senderType}
      onChange={handleChange}
      sx={styles.select}
    >
      {senderTypes.map((st, index) => {
        return (
          <MenuItem key={"senderType" + index} value={st.value}>
            {st.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};
