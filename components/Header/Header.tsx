// 'use client';

import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';
import { ModeToggle } from '@/components/ModeToggle';
import {
  buttonVariants,
  SidebarTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

export const Header = async () => {
  const session = await auth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b px-6 md:justify-end md:px-10">
      <Link href="/" className="p-5 pl-0 md:hidden">
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
        {!session?.user ? (
          <Link
            href="/signin"
            // onClick={() => login('')}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Sign in
          </Link>
        ) : (
          <div className="flex items-center gap-x-2 text-sm">
            {session.user.name}
            {session.user.image && (
              <Image
                className="rounded-full"
                width={30}
                height={30}
                src={session.user.image}
                alt="avatar"
              />
            )}
          </div>
        )}
        <div className="flex gap-3 lg:gap-4">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
