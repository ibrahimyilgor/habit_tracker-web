import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import CreditCardIcon from '@heroicons/react/24/solid/CreditCardIcon';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon';
import PaintBrushIcon from '@heroicons/react/24/solid/PaintBrushIcon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
import { SvgIcon } from '@mui/material';
import { QuestionMark } from '@mui/icons-material';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

export const items = [
  {
    title: 'Overview',
    path: '/',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Branches',
    path: '/branches',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <BuildingStorefrontIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Menu',
    path: '/menu',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <DocumentTextIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Theme',
    path: '/theme',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <PaintBrushIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Plan',
    path: '/plan',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <CreditCardIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Comments',
    path: '/comments',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterTextIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tickets',
    permission: ["manager", "user"],
    path: '/tickets',
    icon: (
      <SvgIcon fontSize="small">
        <BellIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Faq',
    path: '/faq',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMark />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    permission: ["manager", "user"],
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    permission: ["manager", "user"],
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    permission: ["manager", "user", "customer"],
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    permission: ["manager", "user", "customer"],
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    permission: ["manager", "user", "customer"],
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Customers',
    permission: ["manager", "user"],
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Companies',
    permission: ["manager", "user"],
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
];
