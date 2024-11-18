'use client';

import { JSX } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui';

interface NavLinkProps extends LinkProps {
  href: string;
  children: (JSX.Element | string)[];
}

export function NavLink({ href, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`w-full gap-3 ${buttonVariants({ variant: 'ghost' })} ${isActive ? 'bg-accent' : 'bg-transparent'}`}
      style={{ justifyContent: 'flex-start' }}
      {...props}
    >
      {children}
    </Link>
  );
}
