'use client';

import React, { ReactElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '../ui';

interface NavLinkProps extends LinkProps {
  href: string;
  children: ReactElement;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`w-full ${buttonVariants({ variant: 'ghost' })} ${isActive ? 'bg-accent' : 'bg-transparent'}`}
      style={{ justifyContent: 'flex-start' }}
    >
      {children}
    </Link>
  );
};

export function Sidebar() {
  return (
    <div className="flex h-full p-6">
      <nav className="min-w-full">
        <ul className="flex flex-col">
          <li>
            <NavLink href="/">
              <span>Active</span>
            </NavLink>
          </li>
          <li>
            <NavLink href="/planned">
              <span>To do</span>
            </NavLink>
          </li>
          <li>
            <NavLink href="/completed">
              <span>Completed</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
