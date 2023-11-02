import React from "react";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

const Tag = ({ status }) => {
  const { t } = useTranslation();

  const statusColors = {
    ACTIVE: "#4caf50", // Green color for ACTIVE status
    DONE: "#2196f3", // Blue color for DONE status
    CANCELLED: "#f44336", // Red color for CANCELLED status
  };

  const chipStyle = {
    backgroundColor: statusColors[status] || "black",
    color: "white",
  };

  return <Chip label={t("statuses." + status.toLowerCase())} style={chipStyle} />;
};

export default Tag;
