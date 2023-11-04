import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import CreditCardIcon from "@heroicons/react/24/solid/CreditCardIcon";
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import PaintBrushIcon from "@heroicons/react/24/solid/PaintBrushIcon";
import BuildingStorefrontIcon from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import ChatBubbleBottomCenterTextIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon";
import { SvgIcon } from "@mui/material";
import { QuestionMark } from "@mui/icons-material";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import { PLAN_IDS } from "src/utils/constants";

export const items = [
  {
    title: "Overview",
    path: "/",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Branches",
    path: "/branches",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <BuildingStorefrontIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Menu",
    path: "/menu",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <DocumentTextIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: 'Theme',
  //   path: '/theme',
  //   permission: ["admin", "user"],
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <PaintBrushIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: "Plan",
    path: "/plan",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <CreditCardIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Comments",
    path: "/comments",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [PLAN_IDS[0]],
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterTextIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: 'Tickets',
  //   permission: ["admin", "user"],
  //   path: '/tickets',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <BellIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: "Faq",
    path: "/faq",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMark />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    permission: ["admin", "user"],
    not_permitted_plan_ids: [],
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: 'Settings',
  //   permission: ["admin", "user"],
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Login',
  //   permission: ["admin", "user", "customer"],
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   permission: ["admin", "user", "customer"],
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: "Forgot Password",
    permission: ["admin", "user", "customer"],
    not_permitted_plan_ids: [],
    path: "/auth/forgot-password",
    visibleOnSideNav: false,
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Change Password",
    permission: ["admin", "user", "customer"],
    not_permitted_plan_ids: [],
    path: "/auth/change-password",
    visibleOnSideNav: false,
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Error",
    permission: ["admin", "user", "customer"],
    not_permitted_plan_ids: [],
    visibleOnSideNav: false,
    path: "/404",
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: 'Customers',
  //   permission: ["admin", "user"],
  //   path: '/customers',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Companies',
  //   permission: ["admin", "user"],
  //   path: '/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // },
];
