'use client';

import axios from 'axios';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  // Calendar,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  // Popover,
  // PopoverContent,
  // PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
// import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(100),
  description: z.string().min(1, 'Description is required!'),
  tags: z.string().min(1, 'Tag is required!'),
  priority: z.string({
    required_error: 'Please select priority!',
  }),
  // dateRange: z.object(
  //   {
  //     from: z.date(),
  //     to: z.date(),
  //   },
  //   {
  //     required_error: 'Please select a date range',
  //   }
  // ),
});
// .refine((data) => data.dateRange.from < data.dateRange.to, {
//   path: ['dateRange'],
//   message: 'From date must be before to date',
// });

interface AddTaskFormProps {
  closeOnSubmit: () => void;
}

export function AddTaskForm({ closeOnSubmit }: AddTaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      priority: 'low',
      // dateRange: {
      //   from: new Date(),
      //   to: new Date(),
      // },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
    form.reset();
    closeOnSubmit();
  }

  return (
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

        {/* <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-start pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown"
                    defaultMonth={new Date()}
                    mode="range"
                    selected={{
                      from: field.value.from!,
                      to: field.value.to,
                    }}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <DialogFooter>
          <Button type="submit" variant="outline">
            Create a task
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
