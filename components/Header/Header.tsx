'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ExitIcon } from '@radix-ui/react-icons';

import { MobileNav } from '../MobileNav';
import { ModeToggle } from '../ModeToggle';
import {
  Button,
  buttonVariants,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b px-6 md:px-10">
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
      <div className="flex items-center gap-6">
        <Link href="/sign-in" className={buttonVariants({ variant: 'ghost' })}>
          Sign in
        </Link>
        <div className="flex gap-3 lg:gap-4">
          <ModeToggle />
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <ExitIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
