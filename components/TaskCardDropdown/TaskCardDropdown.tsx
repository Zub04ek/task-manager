'use client';

import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { DeleteTaskDialog } from '../DeleteTaskDialog';
import { EditTaskForm } from '../EditTaskForm';

export function TaskCardDropdown() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  return (
    // <DropdownMenu modal={false}>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="icon" className="absolute right-2 top-2">
    //       <DotsHorizontalIcon />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <DropdownMenuItem
    //           className="gap-2"
    //           onSelect={(e) => e.preventDefault()}
    //         >
    //           <Pencil2Icon /> Edit
    //         </DropdownMenuItem>
    //       </DialogTrigger>
    //       <DialogContent aria-describedby={undefined}>
    //         <DialogHeader>
    //           <DialogTitle>Update task</DialogTitle>
    //         </DialogHeader>
    //         <div>Edit Form</div>
    //       </DialogContent>
    //     </Dialog>

    //     <DeleteTaskDialog />
    //   </DropdownMenuContent>
    // </DropdownMenu>

    // <Dialog
    //   open={isEditDialogOpen || isDeleteDialogOpen}
    //   onOpenChange={
    //     isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
    //   }
    // >
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button
    //         variant="ghost"
    //         size="icon"
    //         className="absolute right-2 top-2"
    //       >
    //         <DotsHorizontalIcon />
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent>
    //       <DropdownMenuItem
    //         onClick={() => setIsEditDialogOpen(true)}
    //         className="gap-2"
    //       >
    //         <Pencil2Icon /> Edit
    //       </DropdownMenuItem>
    //       <DropdownMenuItem
    //         onClick={() => setIsDeleteDialogOpen(true)}
    //         className="gap-2"
    //       >
    //         <TrashIcon className="text-destructive" />
    //         <span className="text-destructive">Delete</span>
    //       </DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    //   {isEditDialogOpen && (
    //     <DialogContent aria-describedby={undefined}>
    //       <DialogHeader>
    //         <DialogTitle>Update task</DialogTitle>
    //       </DialogHeader>
    //       <div>Edit Form</div>
    //     </DialogContent>
    //   )}
    //   {isDeleteDialogOpen && <DeleteTaskDialog />}
    // </Dialog>

    <>
      <DropdownMenu
        open={isDropdownMenuOpen}
        onOpenChange={setIsDropdownMenuOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
          >
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => {
              setIsEditDialogOpen(true);
              setIsDropdownMenuOpen(false);
            }}
          >
            <Pencil2Icon /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => {
              setIsDeleteDialogOpen(true);
              setIsDropdownMenuOpen(false);
            }}
          >
            <TrashIcon className="text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Update task</DialogTitle>
          </DialogHeader>
          <EditTaskForm closeOnSubmit={() => setIsEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <DeleteTaskDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        closeDialog={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
