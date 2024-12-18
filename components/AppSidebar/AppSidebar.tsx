'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  buttonVariants,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useSidebar,
} from '@/components/ui';
import { menu, NEXTJSLogo } from '@/utils';
import { ExitIcon } from '@radix-ui/react-icons';

export const AppSidebar = () => {
  const pathname = usePathname();
  const { isMobile, state, setOpenMobile } = useSidebar();
  const { status } = useSession();

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 py-[14px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-9 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:!h-9"
            >
              <Link href="/" className="flex items-center gap-3 px-4">
                <NEXTJSLogo />
                <span>
                  <Image
                    className="h-[revert-layer] dark:invert"
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={118}
                    height={20}
                    priority
                  />
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="py-10">
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {menu.map(({ id, title, icon, link }) => {
                const isActive = link === pathname;

                return (
                  <SidebarMenuItem key={id}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            style={{ justifyContent: 'flex-start' }}
                            className={`h-9 w-full gap-3 ${buttonVariants({ variant: 'ghost' })} ${isActive ? 'bg-accent text-accent-foreground' : 'bg-transparent'} group-data-[collapsible=icon]:!h-9`}
                          >
                            <Link
                              href={link}
                              onClick={() => {
                                if (isMobile) {
                                  setOpenMobile(false);
                                }
                              }}
                            >
                              {icon}
                              <span>{title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {state === 'collapsed' && (
                          <TooltipContent side="right">
                            <p>{title}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {status === 'authenticated' && (
            <SidebarMenuItem>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      style={{ justifyContent: 'flex-start' }}
                      className={`h-9 w-full gap-3 ${buttonVariants({ variant: 'ghost' })} group-data-[collapsible=icon]:!h-9`}
                    >
                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-3 px-4"
                      >
                        <ExitIcon />
                        <span>Logout</span>
                      </button>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {state === 'collapsed' && (
                    <TooltipContent side="right">
                      <p>Logout</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
