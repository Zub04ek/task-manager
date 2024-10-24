'use client';

import { cn } from '@/lib/utils';
import menu from '@/utils/menu';

import { NavLink } from '../NavLink';

interface NavProps {
  className?: string;
}

export function Sidebar({ className, ...props }: NavProps) {
  return (
    <nav className={cn('flex min-w-full flex-col gap-4', className)}>
      {menu.map(({ id, link, icon, title }) => {
        return (
          <NavLink key={id} href={link} {...props}>
            {icon}
            {title}
          </NavLink>
        );
      })}
    </nav>
  );
}
