import {
  DashboardIcon,
  ListBulletIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

const menu = [
  {
    id: 1,
    title: 'Active',
    icon: <DashboardIcon />,
    link: '/',
  },
  {
    id: 2,
    title: 'To do',
    icon: <ListBulletIcon />,
    link: '/planned',
  },
  {
    id: 3,
    title: 'Completed',
    icon: <TrashIcon />,
    link: '/completed',
  },
];

export default menu;
