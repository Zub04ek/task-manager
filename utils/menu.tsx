import {
  DashboardIcon,
  ListBulletIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

const dashboard = <DashboardIcon />;
const list = <ListBulletIcon />;
const trash = <TrashIcon />;

const menu = [
  {
    id: 1,
    title: 'Active',
    icon: dashboard,
    link: '/',
  },
  {
    id: 2,
    title: 'To do',
    icon: list,
    link: '/planned',
  },
  {
    id: 3,
    title: 'Completed',
    icon: trash,
    link: '/completed',
  },
];

export default menu;
