'use client';

import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddTask, useEditTask } from '@/app/api/hooks';
import { Modal } from '@/components/Modal';
import { TiptapEditor } from '@/components/TiptapEditor';
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
  // Textarea,
} from '@/components/ui';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useModalStore, useSelectedTask } from '@/stores';
import { Task } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Status } from '@prisma/client';

const extractTextFromHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || '';
};

// const TAGS = [
//   'health',
//   'sport',
//   'travel',
//   'home',
//   'finance',
//   'entertainment',
// ] as const;

const OPTIONS: Option[] = [
  { label: 'health', value: 'health', color: '#ef4444' },
  { label: 'sport', value: 'sport', color: '#eab308' },
  { label: 'travel', value: 'travel', color: '#22c55e' },
  { label: 'home', value: 'home', color: '#06b6d4' },
  { label: 'finance', value: 'finance', color: '#3b82f6' },
  { label: 'entertainment', value: 'entertainment', color: '#8b5cf6' },
];

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  color: z.string(),
});

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(100),
  description: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: 'The text must be at least 5 characters long after trimming',
    }
  ),
  // description: z.string().min(1, 'Description is required!'),
  // tags: z.string().min(1, 'Tag is required!'),
  // tags: z.array(z.enum(TAGS)).min(1, 'Please, select at least 1 tag'),
  tags: z.array(optionSchema).min(1, 'Please, select at least 1 tag'),
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
  const { mutate: addTaskMutate } = useAddTask();
  const { mutate: editTaskMutate } = useEditTask();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      // test: '',
      description: initialData?.description || '',
      tags: initialData?.tags || [],
      priority: initialData?.priority || 'low',
      status: initialData?.status || Status.TO_DO,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const title = initialData ? 'Update the task' : 'Create a task';
  const action = initialData ? 'Update' : 'Create';

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      const task = { id: initialData.id, ...values };
      editTaskMutate(task);
      setSelectedTask(null);
    } else {
      addTaskMutate(values);
    }
    form.reset();
    taskModal.onClose();
  };

  useEffect(() => {
    if (selectedTask === null) {
      form.setValue('title', '');
      form.setValue('description', '');
      form.setValue('tags', []);
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
          className="w-full max-w-[528px] space-y-5"
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
                  <TiptapEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give a little bit more details"
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. development, design, home"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={OPTIONS}
                    placeholder="Select tags you like or type something new..."
                    hidePlaceholderWhenSelected={true}
                    creatable
                    emptyIndicator={
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={(value) => field.onChange(value)}
                  />
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
              onClick={() => {
                setSelectedTask(null);
                taskModal.onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">{action} a task</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};
