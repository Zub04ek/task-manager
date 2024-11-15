'use client';

import React from 'react';

import { Sidebar } from '@/components/Sidebar';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} side="left" className="pt-12">
        <SheetTitle />
        <SheetClose asChild>
          <Sidebar />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
