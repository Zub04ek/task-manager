'use client';

import { FC, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Modal } from '@/components/modal';
import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useModalStore } from '@/stores';
import { useSelectedTask } from '@/stores/SelectedTaskStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Status, Task } from '@prisma/client';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(100),
  description: z.string().min(1, 'Description is required!'),
  tags: z.string().min(1, 'Tag is required!'),
  priority: z.string({
    required_error: 'Please select priority!',
  }),
  status: z.nativeEnum(Status),
});

interface AddTaskFormProps {
  initialData: Task | null;
}

export const TaskForm: FC<AddTaskFormProps> = ({ initialData }) => {
  const taskModal = useModalStore();
  const selectedTask = useSelectedTask((state) => state.task);
  const setSelectedTask = useSelectedTask((state) => state.setTask);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      tags: initialData?.tags || '',
      priority: initialData?.tags || 'low',
      status: initialData?.status || Status.TO_DO,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const title = initialData ? 'Update the task' : 'Create a ask';
  const action = initialData ? 'Update' : 'Create';
  //   const toastMessage = initialData ? 'Todo Updated' : 'Todo Created';

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      try {
        const task = { id: initialData.id, ...values };
        const res = await axios.put('/api/tasks', task);
        if (res.data.error) {
          console.log('err :>> ', res.data.error);
        } else {
          console.log('task updated');
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
      setSelectedTask(null);
    } else {
      try {
        const res = await axios.post('/api/tasks', values);
        if (res.data.error) {
          console.log('err :>> ', res.data.error);
        } else {
          console.log('task created');
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    form.reset();
    taskModal.onClose();
    // toast.success(toastMessage);
  };

  useEffect(() => {
    if (selectedTask === null) {
      form.setValue('title', '');
      form.setValue('description', '');
      form.setValue('tags', '');
      form.setValue('priority', 'low');
      form.setValue('status', Status.TO_DO);
    } else if (initialData !== null) {
      form.setValue('title', initialData?.title);
      form.setValue('description', initialData?.description);
      form.setValue('tags', initialData?.tags);
      form.setValue('priority', initialData?.priority);
      form.setValue('status', initialData?.status);
    }
  }, [selectedTask, form, initialData]);

  return (
    <Modal
      isOpen={taskModal.isOpen}
      title={title}
      onClose={() => {
        setSelectedTask(null);
        taskModal.onClose();
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5 justify-self-center"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {initialData !== null && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Status.TO_DO}>To do</SelectItem>
                      <SelectItem value={Status.IN_PROGRESS}>
                        In progress
                      </SelectItem>
                      <SelectItem value={Status.DONE}>Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={taskModal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {action} a task
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};
