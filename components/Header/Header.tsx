'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '../ModeToggle';
import { buttonVariants } from '../ui/button';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b px-8 sm:px-16">
      <Link href="/" className="p-5 pl-0">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={118}
          height={18}
          priority
          style={{ height: 'auto' }}
        />
      </Link>
      <div className="flex items-center gap-8">
        {/* <div className="flex gap-6"> */}
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in
        </Link>
        {/* </div> */}
        <ModeToggle />
      </div>
    </header>
  );
}
