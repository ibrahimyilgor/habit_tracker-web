import { Fragment, useState } from "react";
import { Box, Divider, MenuItem, MenuList, Popover } from "@mui/material";
import { ParseToDate } from "src/utils/date";
import { NotificationModal } from "src/components/notificationModal";

export const NotificationPopover = (props) => {
  const { anchorEl, onClose, open, notifications, setNotifications } = props;
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [notificationDetail, setNotificationDetail] = useState({});

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 350 } }}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
          maxHeight: "80vh",
        }}
      >
        {notifications.map((notif, index) => (
          <Fragment key={index}>
            <MenuItem
              onClick={() => {
                setOpenNotificationModal(true);
                setNotificationDetail(notif);
              }}
              sx={{ flexDirection: "column" }}
            >
              <Box
                fontSize="h6.fontSize"
                component="div"
                overflow="hidden"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
                height={30} // Adjust this value according to your preference
                sx={{ overflowWrap: "break-word", wordWrap: "break-word" }} // added styles
              >
                {notif?.title.length > 30 ? notif?.title.slice(0, 30) + "..." : notif?.title}
              </Box>

              <Box
                fontSize="h7.fontSize"
                component="div"
                overflow="hidden"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
                height={70} // Adjust this value according to your preference
                sx={{ overflowWrap: "break-word", wordWrap: "break-word" }} // added styles
              >
                {notif?.content.length > 130
                  ? notif?.content.slice(0, 130) + "..."
                  : notif?.content}
              </Box>
              <Box
                fontSize="h8.fontSize"
                component="div"
                overflow="hidden"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }} // added styles
              >
                {ParseToDate(new Date())}
              </Box>
            </MenuItem>
            {index !== notifications?.length - 1 && <Divider />}
          </Fragment>
        ))}
      </MenuList>
      <NotificationModal
        notification={notificationDetail}
        open={openNotificationModal}
        onClose={() => {
          setOpenNotificationModal(false);
        }}
      />
    </Popover>
  );
};
